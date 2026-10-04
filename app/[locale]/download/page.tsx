import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DownloadPage } from "@/components/site/download-page"
import { JsonLd } from "@/components/site/json-ld"
import { Providers } from "@/components/site/providers"
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n/config"
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
  return buildPageMetadata(locale, "download")
}

export default async function LocaleDownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound()

  return (
    <>
      <JsonLd locale={locale} page="download" />
      <Providers initialLocale={locale}>
        <DownloadPage />
      </Providers>
    </>
  )
}
