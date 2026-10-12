export const LOCALE_COOKIE = "df-locale"

export const LOCALES = [
  "en",
  "zh-CN",
  "zh-TW",
  "es",
  "pt",
  "nl",
  "it",
  "ja",
  "ko",
  "fr",
] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  es: "Español",
  pt: "Português",
  nl: "Nederlands",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
}

export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  "zh-CN": "简",
  "zh-TW": "繁",
  es: "ES",
  pt: "PT",
  nl: "NL",
  it: "IT",
  ja: "JA",
  ko: "KO",
  fr: "FR",
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
