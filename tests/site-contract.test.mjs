import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
const locales = ["en", "zh-CN", "zh-TW", "ja", "ko", "pt", "nl", "it", "es", "fr"]
const messages = Object.fromEntries(
  locales.map((locale) => [locale, JSON.parse(read(`lib/i18n/messages/${locale}.json`))]),
)

function keys(value, prefix = "") {
  if (Array.isArray(value)) return value.flatMap((item, index) => keys(item, `${prefix}[${index}]`))
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([key, item]) =>
      keys(item, prefix ? `${prefix}.${key}` : key),
    )
  return [prefix]
}

const banned = /封闭\s*Beta|实验室|测试网|Sepolia|12,480|\$8\.4|closed beta|joinBeta|\bBeta\b/i

test("all ten locales have identical redesign keys", () => {
  const expected = keys(messages.en.siteV2)
  for (const locale of locales) assert.deepEqual(keys(messages[locale].siteV2), expected, locale)
})

test("home CTAs use real configurable destinations", () => {
  const urls = read("lib/urls.ts")
  const hero = read("components/sections/hero.tsx")
  const home = read("components/sections/home-sections.tsx")
  const footer = read("components/sections/footer.tsx")
  assert.match(urls, /NEXT_PUBLIC_APP_URL/)
  assert.match(urls, /https:\/\/app\.doerflow\.dev/)
  assert.match(hero, /href=\{APP_URL\}/)
  assert.match(hero, /href=\{DOCS_URL\}/)
  assert.match(hero, /localeDownloadPath\(locale\)/)
  assert.match(home, /href=\{APP_URL\}/)
  assert.match(home, /href=\{DOCS_URL\}/)
  assert.match(footer, /APP_URL/)
  assert.doesNotMatch(
    `${hero}\n${home}\n${footer}`,
    /BETA_URL|joinBeta|siteV2\.lab|siteV2\.safety|siteV2\.status/,
  )
  assert.doesNotMatch(read("components/sections/footer-cta.tsx"), /message\.success|subscribe/i)
})

test("theme supports light, dark, and system without first-paint flash", () => {
  const context = read("lib/theme-context.tsx")
  const layout = read("app/layout.tsx")
  for (const mode of ["light", "dark", "system"]) assert.match(context, new RegExp(`"${mode}"`))
  assert.match(layout, /data-theme="light"/)
  assert.match(layout, /themeScript/)
  assert.match(layout, /colorScheme: "light dark"/)
  assert.match(layout, /<html[^>]*data-scroll-behavior="smooth"/)
})

test("hero wrapping preserves words", () => {
  const heroStyles = read("styles/_hero.scss")
  assert.doesNotMatch(heroStyles, /overflow-wrap:\s*anywhere/)
  assert.match(heroStyles, /word-break:\s*normal/)
  assert.match(heroStyles, /font-size:\s*clamp\(32px,\s*9vw,\s*44px\)/)
  assert.match(heroStyles, /line-height:\s*1\.12/)
  assert.match(heroStyles, /letter-spacing:\s*-0\.02em/)
  assert.match(heroStyles, /text-wrap:\s*balance/)
})

test("promotional homepage hides engineering status and fictional statistics", () => {
  assert.doesNotMatch(read("components/sections/hero.tsx"), /Statistic|hero\.stats|df-hero-status/)
  for (const locale of locales) {
    assert.equal(messages[locale].hero?.stats, undefined, locale)
    const promo = JSON.stringify({
      siteV2: messages[locale].siteV2,
      title: messages[locale].meta.title,
      description: messages[locale].meta.description,
    })
    assert.doesNotMatch(promo, banned, locale)
  }
  assert.equal(messages["zh-CN"].siteV2.hero.highlight, "区块链交易与结算平台")
  assert.equal(
    messages["zh-CN"].siteV2.hero.cadence,
    "铸造身份 · 注册技能 · 托管资金 · 交付工作 · 自动结算",
  )
  assert.match(
    messages.en.siteV2.hero.cadence,
    /Mint identity\. Register skills\. Escrow funds\. Deliver work\. Settle automatically/,
  )
  assert.match(read("components/site/home.tsx"), /WhyCrypto/)
  assert.match(read("components/site/home.tsx"), /HowItWorks/)
  assert.doesNotMatch(
    read("components/sections/home-sections.tsx"),
    /id="advantages"|id="settlement"/,
  )
})

test("TypeScript build errors are not ignored", () => {
  assert.doesNotMatch(read("next.config.mjs"), /ignoreBuildErrors/)
})

test("header login opens the app login page", () => {
  const urls = read("lib/urls.ts")
  const header = read("components/site/header.tsx")
  assert.match(urls, /export const LOGIN_URL/)
  assert.match(urls, /\/login/)
  assert.match(header, /LOGIN_URL/)
  assert.doesNotMatch(header, /APP_URL/)
  assert.equal((header.match(/href=\{LOGIN_URL\}/g) || []).length, 3)
})
