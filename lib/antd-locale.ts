import type { Locale } from "@/lib/i18n/config"
import type { Locale as AntdLocale } from "antd/es/locale"

const loaders: Record<Locale, () => Promise<{ default: AntdLocale }>> = {
  en: () => import("antd/locale/en_US"),
  "zh-CN": () => import("antd/locale/zh_CN"),
  "zh-TW": () => import("antd/locale/zh_TW"),
  es: () => import("antd/locale/es_ES"),
  pt: () => import("antd/locale/pt_BR"),
  nl: () => import("antd/locale/nl_NL"),
  it: () => import("antd/locale/it_IT"),
  ja: () => import("antd/locale/ja_JP"),
  ko: () => import("antd/locale/ko_KR"),
  fr: () => import("antd/locale/fr_FR"),
}

const cache = new Map<Locale, AntdLocale>()

export async function loadAntdLocale(locale: Locale): Promise<AntdLocale> {
  const cached = cache.get(locale)
  if (cached) return cached
  const mod = await loaders[locale]()
  cache.set(locale, mod.default)
  return mod.default
}
