import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DownloadPage } from "@/components/site/download-page"
import { Providers } from "@/components/site/providers"
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config"
import { LOCALES } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/i18n/metadata"

export function generateStaticParams() {
  return LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return {
    ...buildPageMetadata(locale),
    title: "Download DoerFlow",
  }
}

export default async function LocaleDownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound()

  return (
    <Providers initialLocale={locale}>
      <DownloadPage />
    </Providers>
  )
}
