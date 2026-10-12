"use client"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App as AntdApp, ConfigProvider } from "antd"
import type { Locale as AntdLocale } from "antd/es/locale"
import { useEffect, useState, type ReactNode } from "react"
import { loadAntdLocale } from "@/lib/antd-locale"
import type { Locale } from "@/lib/i18n/config"
import { I18nProvider, useI18n } from "@/lib/i18n/context"
import { antdTheme } from "@/lib/theme"
import { ThemeProvider, useTheme } from "@/lib/theme-context"

function AntdBridge({ children }: { children: ReactNode }) {
  const { locale } = useI18n()
  const { resolved } = useTheme()
  const [antdLocale, setAntdLocale] = useState<AntdLocale | null>(null)

  useEffect(() => {
    let active = true
    loadAntdLocale(locale).then((value) => {
      if (active) setAntdLocale(value)
    })
    return () => {
      active = false
    }
  }, [locale])

  return (
    <ConfigProvider theme={antdTheme(resolved === "dark")} locale={antdLocale ?? undefined}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  )
}

export function Providers({
  children,
  initialLocale,
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <ThemeProvider>
        <AntdRegistry>
          <AntdBridge>{children}</AntdBridge>
        </AntdRegistry>
      </ThemeProvider>
    </I18nProvider>
  )
}
