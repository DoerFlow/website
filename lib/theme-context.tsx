"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type ThemePreference = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

const STORAGE_KEY = "doerflow-theme"
const DARK_QUERY = "(prefers-color-scheme: dark)"

interface ThemeValue {
  preference: ThemePreference
  resolved: ResolvedTheme
  setPreference: (theme: ThemePreference) => void
}

const ThemeContext = createContext<ThemeValue | null>(null)

function isPreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system"
}

function resolve(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light"
}

function applyTheme(preference: ThemePreference, resolved: ResolvedTheme) {
  const root = document.documentElement
  root.dataset.themePreference = preference
  root.dataset.theme = resolved
  root.style.colorScheme = resolved
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    resolved === "dark" ? "#0B1120" : "#F5F8F7",
  )
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("light")
  const [resolved, setResolved] = useState<ResolvedTheme>("light")

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const nextPreference = isPreference(saved) ? saved : "light"
    const nextResolved = resolve(nextPreference)
    setPreferenceState(nextPreference)
    setResolved(nextResolved)
    applyTheme(nextPreference, nextResolved)
  }, [])

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const onChange = () => {
      if (preference !== "system") return
      const next = media.matches ? "dark" : "light"
      setResolved(next)
      applyTheme(preference, next)
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [preference])

  const setPreference = useCallback((next: ThemePreference) => {
    localStorage.setItem(STORAGE_KEY, next)
    const nextResolved = resolve(next)
    setPreferenceState(next)
    setResolved(nextResolved)
    applyTheme(next, nextResolved)
  }, [])

  const value = useMemo(
    () => ({ preference, resolved, setPreference }),
    [preference, resolved, setPreference],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error("useTheme must be used inside ThemeProvider")
  return value
}
