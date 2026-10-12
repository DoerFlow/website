import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config"
import { detectClientPreferredLocale, matchSupportedLocale } from "./preferred-locale"

/** Map one browser language tag onto a supported locale. Unknown tags become English. */
export function detectLocaleFromNavigator(language?: string): Locale {
  const match = matchSupportedLocale(language)
  if (!match) return DEFAULT_LOCALE
  return match as Locale
}

/** Saved cookie, then browser languages, then time zone, then English. */
export function detectPreferredLocale(stored?: string | null): Locale {
  const next = detectClientPreferredLocale(stored)
  return (LOCALES as readonly string[]).includes(next) ? (next as Locale) : DEFAULT_LOCALE
}
