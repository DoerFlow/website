"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type Locale,
  isLocale,
} from "./config"
import { detectPreferredLocale } from "./detect"
import { messagesByLocale, type Messages } from "./messages"
import { formatMessage, getMessage } from "./resolve"

type I18nContextValue = {
  locale: Locale
  messages: Messages
  setLocale: (locale: Locale) => void
  t: (key: string, vars?: Record<string, string | number>) => string
  tm: <T>(key: string) => T
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`))
  const value = match?.[1] ? decodeURIComponent(match[1]) : null
  return value && isLocale(value) ? value : null
}

function persistLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)};path=/;max-age=31536000;samesite=lax`
  document.documentElement.lang = locale
}

function resolveInitialLocale(): Locale {
  const saved = readCookieLocale()
  if (typeof navigator === "undefined") return saved ?? DEFAULT_LOCALE
  return detectPreferredLocale(saved)
}

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE)
  const [ready, setReady] = useState(Boolean(initialLocale))

  useEffect(() => {
    if (initialLocale) {
      document.documentElement.lang = initialLocale
      return
    }
    const initial = resolveInitialLocale()
    setLocaleState(initial)
    persistLocale(initial)
    setReady(true)
  }, [initialLocale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    persistLocale(next)
  }, [])

  const messages = messagesByLocale[locale]

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const raw = getMessage<string>(messages as Record<string, unknown>, key)
      if (typeof raw !== "string") return key
      return formatMessage(raw, vars)
    },
    [messages],
  )

  const tm = useCallback(
    <T,>(key: string) => getMessage<T>(messages as Record<string, unknown>, key) as T,
    [messages],
  )

  const value = useMemo(
    () => ({ locale, messages, setLocale, t, tm }),
    [locale, messages, setLocale, t, tm],
  )

  if (!ready) return null

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

export function useT() {
  const { t, tm, locale, setLocale } = useI18n()
  return { t, tm, locale, setLocale }
}
