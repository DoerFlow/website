"use client"

import { useT } from "@/lib/i18n/context"
import { localeDownloadPath } from "@/lib/i18n/paths"
import { APP_URL, DOCS_URL } from "@/lib/urls"
import { ArrowRightOutlined, BookOutlined, DownloadOutlined } from "@ant-design/icons"
import { Button } from "antd"

export function Hero() {
  const { t, locale } = useT()

  return (
    <section id="top" className="df-anchor df-hero" aria-labelledby="hero-title">
      <div className="df-hero-bg" aria-hidden="true">
        <div className="df-grid-overlay" />
      </div>
      <div className="df-section df-hero-section">
        <div className="df-fade-in">
          <span className="df-eyebrow">{t("siteV2.hero.eyebrow")}</span>
        </div>
        <h1 id="hero-title" className="df-fade-in df-delay-1 df-hero-title">
          {t("siteV2.hero.title")}{" "}
          <span className="df-gradient-text">{t("siteV2.hero.highlight")}</span>
        </h1>
        <p className="df-fade-in df-delay-2 df-hero-body">{t("siteV2.hero.body")}</p>
        <p className="df-fade-in df-delay-3 df-hero-cadence">{t("siteV2.hero.cadence")}</p>
        <p className="df-fade-in df-delay-4 df-hero-scope">{t("siteV2.hero.scope")}</p>
        <div className="df-fade-in df-delay-5 df-hero-actions">
          <Button
            type="primary"
            size="large"
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
          >
            {t("siteV2.actions.platform")}
          </Button>
          <Button
            size="large"
            href={DOCS_URL}
            target="_blank"
            rel="noreferrer"
            icon={<BookOutlined />}
          >
            {t("siteV2.actions.docs")}
          </Button>
          <Button size="large" href={localeDownloadPath(locale)} icon={<DownloadOutlined />}>
            {t("siteV2.actions.download")}
          </Button>
        </div>
      </div>
    </section>
  )
}
