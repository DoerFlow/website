import type { Locale } from "@/lib/i18n/config"
import { LOCALES } from "@/lib/i18n/config"
import { messagesByLocale } from "@/lib/i18n/messages"
import { localeDownloadPath, localePath } from "@/lib/i18n/paths"
import { DOCS_URL, SITE_URL } from "@/lib/urls"

export function buildJsonLd(locale: Locale, page: "home" | "download" = "home") {
  const messages = messagesByLocale[locale]
  const pagePath = page === "download" ? localeDownloadPath(locale) : localePath(locale)
  const pageUrl = `${SITE_URL}${pagePath}`

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "DoerFlow",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/app-icon-1024.png`,
    },
    sameAs: ["https://github.com/doerflow", DOCS_URL],
    description: messages.meta.description,
  }

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "DoerFlow",
    description: messages.meta.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: [...LOCALES],
  }

  const software = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#app`,
    name: "DoerFlow",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Android, Web",
    url: SITE_URL,
    downloadUrl: `${SITE_URL}${localeDownloadPath(locale)}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: messages.meta.description,
  }

  const webpage = {
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: page === "download" ? messages.meta.downloadTitle : messages.meta.title,
    description:
      page === "download" ? messages.meta.downloadDescription : messages.meta.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: locale,
  }

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, software, webpage],
  }
}

export function JsonLd({ locale, page = "home" }: { locale: Locale; page?: "home" | "download" }) {
  const data = buildJsonLd(locale, page)
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
