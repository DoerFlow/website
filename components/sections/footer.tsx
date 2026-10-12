"use client"

import { Logo } from "@/components/site/logo"
import { useT } from "@/lib/i18n/context"
import { localeDownloadPath, localePath } from "@/lib/i18n/paths"
import { APP_URL, COMMUNITY_URL, DOCS_URL, PRIVACY_URL, TERMS_URL } from "@/lib/urls"

export function Footer() {
  const { t, locale } = useT()
  const home = localePath(locale)
  const links = [
    { label: t("common.launchApp"), href: APP_URL },
    { label: t("siteV2.actions.docs"), href: DOCS_URL },
    { label: t("header.nav.download"), href: localeDownloadPath(locale) },
    { label: t("common.joinCommunity"), href: COMMUNITY_URL },
    { label: t("footer.columns.company.links.privacy"), href: PRIVACY_URL },
    { label: t("footer.columns.company.links.terms"), href: TERMS_URL },
  ]
  return (
    <footer className="df-footer">
      <div className="df-section df-footer-inner">
        <div>
          <a href={home} aria-label={t("header.homeAria")}>
            <Logo size={32} />
          </a>
          <p>{t("siteV2.footer.tagline")}</p>
        </div>
        <nav aria-label={t("siteV2.footer.navAria")}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <small>{t("footer.copyright")}</small>
      </div>
    </footer>
  )
}
