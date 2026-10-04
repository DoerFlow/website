import type { MetadataRoute } from "next"
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config"
import { localeDownloadPath, localePath } from "@/lib/i18n/paths"
import { SITE_URL } from "@/lib/urls"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}${localePath(locale)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === DEFAULT_LOCALE ? 1 : 0.85,
    })
    entries.push({
      url: `${SITE_URL}${localeDownloadPath(locale)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === DEFAULT_LOCALE ? 0.8 : 0.7,
    })
  }

  return entries
}
