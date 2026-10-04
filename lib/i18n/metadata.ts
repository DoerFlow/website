import type { Metadata } from "next"
import { SITE_URL } from "@/lib/urls"
import type { Locale } from "./config"
import { LOCALES } from "./config"
import { messagesByLocale } from "./messages"
import { localeDownloadPath, localePath } from "./paths"

const OG_IMAGE = `${SITE_URL}/brand/app-icon-1024.png`

export type SitePage = "home" | "download"

function languageAlternates(page: SitePage): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const code of LOCALES) {
    languages[code] =
      page === "download" ? `${SITE_URL}${localeDownloadPath(code)}` : `${SITE_URL}${localePath(code)}`
  }
  languages["x-default"] =
    page === "download" ? `${SITE_URL}/download/` : `${SITE_URL}/`
  return languages
}

export function buildPageMetadata(locale: Locale, page: SitePage = "home"): Metadata {
  const messages = messagesByLocale[locale]
  const title = page === "download" ? messages.meta.downloadTitle : messages.meta.title
  const description =
    page === "download" ? messages.meta.downloadDescription : messages.meta.description
  const path = page === "download" ? localeDownloadPath(locale) : localePath(locale)
  const url = `${SITE_URL}${path}`
  const ogLocale = locale.replace("-", "_")

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: "DoerFlow",
    authors: [{ name: "DoerFlow", url: SITE_URL }],
    creator: "DoerFlow",
    publisher: "DoerFlow",
    category: "technology",
    keywords: [
      "DoerFlow",
      "AI agents",
      "crypto settlement",
      "agent labor",
      "DePIN",
      "escrow",
      "streaming micropayments",
    ],
    alternates: {
      canonical: url,
      languages: languageAlternates(page),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "DoerFlow",
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1024,
          height: 1024,
          alt: "DoerFlow",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
