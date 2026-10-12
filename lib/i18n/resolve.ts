import type { Locale } from "./config"

export function getMessage<T = string>(
  messages: Record<string, unknown>,
  key: string,
): T | undefined {
  const parts = key.split(".")
  let current: unknown = messages
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return current as T | undefined
}

export function formatMessage(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    template,
  )
}

export function getAntdLocaleKey(locale: Locale): string {
  const map: Record<Locale, string> = {
    en: "en_US",
    "zh-CN": "zh_CN",
    "zh-TW": "zh_TW",
    es: "es_ES",
    pt: "pt_BR",
    nl: "nl_NL",
    it: "it_IT",
    ja: "ja_JP",
    ko: "ko_KR",
    fr: "fr_FR",
  }
  return map[locale]
}
