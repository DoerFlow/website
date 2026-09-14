import type { Metadata } from "next"
import { DownloadPage } from "@/components/site/download-page"
import { Providers } from "@/components/site/providers"
import { DEFAULT_LOCALE } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/i18n/metadata"

export function generateMetadata(): Metadata {
  return {
    ...buildPageMetadata(DEFAULT_LOCALE),
    title: "Download DoerFlow",
  }
}

export default function Page() {
  return (
    <Providers initialLocale={DEFAULT_LOCALE}>
      <DownloadPage />
    </Providers>
  )
}
