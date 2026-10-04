import type { Metadata } from "next"
import { DownloadPage } from "@/components/site/download-page"
import { JsonLd } from "@/components/site/json-ld"
import { Providers } from "@/components/site/providers"
import { DEFAULT_LOCALE } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/i18n/metadata"

export function generateMetadata(): Metadata {
  return buildPageMetadata(DEFAULT_LOCALE, "download")
}

export default function Page() {
  return (
    <>
      <JsonLd locale={DEFAULT_LOCALE} page="download" />
      <Providers initialLocale={DEFAULT_LOCALE}>
        <DownloadPage />
      </Providers>
    </>
  )
}
