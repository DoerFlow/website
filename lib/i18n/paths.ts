import { DEFAULT_LOCALE, type Locale } from "./config"

export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`
}

export function localeDownloadPath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/download/" : `/${locale}/download/`
}

/** Map current path to the equivalent path for another locale (home or download). */
export function localizedHref(locale: Locale, pathname: string): string {
  const normalized = pathname.replace(/\/+$/, "") || "/"
  const isDownload = /(?:^|\/)download$/.test(normalized)
  return isDownload ? localeDownloadPath(locale) : localePath(locale)
}
