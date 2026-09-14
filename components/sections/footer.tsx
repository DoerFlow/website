"use client"

import { useMemo } from "react"
import { Row, Col, Typography } from "antd"
import { Logo } from "@/components/site/logo"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"
import { DOCS_URL } from "@/lib/urls"
import { localePath } from "@/lib/i18n/paths"

const { Text } = Typography

export function Footer() {
  const { t, locale } = useT()
  const home = localePath(locale)

  const columns = useMemo(
    () => [
      {
        title: t("footer.columns.product.title"),
        links: [
          { label: t("footer.columns.product.links.walletApp"), href: `${home}#products` },
          { label: t("footer.columns.product.links.workerApp"), href: `${home}#products` },
          { label: t("footer.columns.product.links.creatorDapp"), href: `${home}#products` },
          { label: t("footer.columns.product.links.adminConsole"), href: `${home}#products` },
        ],
      },
      {
        title: t("footer.columns.protocol.title"),
        links: [
          { label: t("footer.columns.protocol.links.whyCrypto"), href: `${home}#why-crypto` },
          { label: t("footer.columns.protocol.links.architecture"), href: `${home}#protocol` },
          { label: t("footer.columns.protocol.links.economyFees"), href: `${home}#economy` },
          { label: t("footer.columns.protocol.links.useCases"), href: `${home}#use-cases` },
          { label: t("footer.columns.protocol.links.roadmap"), href: home },
        ],
      },
      {
        title: t("footer.columns.developers.title"),
        links: [
          { label: t("footer.columns.developers.links.docs"), href: DOCS_URL },
          { label: t("footer.columns.developers.links.github"), href: "https://github.com/doerflow" },
          { label: t("footer.columns.developers.links.openApi"), href: `${home}#developers` },
          { label: t("footer.columns.developers.links.sdks"), href: `${home}#developers` },
        ],
      },
      {
        title: t("footer.columns.company.title"),
        links: [
          { label: t("footer.columns.company.links.luminaryWorks"), href: `${home}#ecosystem` },
          { label: t("footer.columns.company.links.privacy"), href: home },
          { label: t("footer.columns.company.links.terms"), href: `${DOCS_URL}/legal/terms` },
          { label: t("footer.columns.company.links.doerflowDev"), href: "https://doerflow.dev" },
        ],
      },
    ],
    [t, home],
  )

  return (
    <footer style={{ borderTop: `1px solid ${COLORS.border}`, background: "rgba(10,15,28,0.6)" }}>
      <div className="df-section" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <Row gutter={[32, 40]}>
          <Col xs={24} md={8}>
            <Logo size={32} />
            <p style={{ color: COLORS.muted, marginTop: 16, maxWidth: 280, lineHeight: 1.6 }}>
              {t("footer.tagline")}
            </p>
            <p className="df-cn" style={{ marginTop: 4 }}>{t("footer.subtitle")}</p>
          </Col>

          {columns.map((c) => (
            <Col xs={12} sm={6} md={4} key={c.title}>
              <Text style={{ color: COLORS.text, fontWeight: 600, display: "block", marginBottom: 14 }}>
                {c.title}
              </Text>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {c.links.map((l) => (
                  <li key={l.label} style={{ marginBottom: 10 }}>
                    <a
                      className="df-link"
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                      style={{ fontSize: 14 }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>

        <div className="df-section-divider" style={{ margin: "40px 0 24px" }} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.muted, fontSize: 13 }}>
            {t("footer.copyright")}
          </Text>
          <Text style={{ color: COLORS.muted, fontSize: 13 }}>
            {t("footer.ecosystemLine")}
          </Text>
        </div>
      </div>
    </footer>
  )
}
