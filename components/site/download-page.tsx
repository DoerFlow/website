"use client"

import { useEffect, useState } from "react"
import { AndroidOutlined, DownloadOutlined, GlobalOutlined } from "@ant-design/icons"
import { Button, Space, Typography } from "antd"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/sections/footer"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"
import { APP_URL } from "@/lib/urls"

const RELEASE_BASE =
  process.env.NEXT_PUBLIC_RELEASE_BASE ??
  "https://github.com/DoerFlow/downloads/releases/latest/download"

const WALLET_APK = `${RELEASE_BASE}/DoerFlow-Wallet.apk`
const WORKER_APK = `${RELEASE_BASE}/DoerFlow-Worker.apk`

const DOWNLOADS_API =
  process.env.NEXT_PUBLIC_DOWNLOADS_API ??
  "https://api.github.com/repos/DoerFlow/downloads/releases/latest"

export function DownloadPage() {
  const { t } = useT()
  const [versionLabel, setVersionLabel] = useState("…")

  useEffect(() => {
    let cancelled = false
    fetch(DOWNLOADS_API)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { tag_name?: string } | null) => {
        if (cancelled || !data?.tag_name) return
        setVersionLabel(data.tag_name.replace(/^v/, ""))
      })
      .catch(() => {
        if (!cancelled) setVersionLabel("latest")
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <a className="df-skip-link" href="#main-content">{t("siteV2.a11y.skip")}</a>
      <Header />
      <main id="main-content">
      <div className="df-download">
        <Typography.Title level={1} className="df-download-title" style={{ color: COLORS.text }}>
          {t("download.title")}
        </Typography.Title>
        <Typography.Paragraph style={{ color: COLORS.muted, fontSize: 16 }}>
          {t("download.lead", { version: versionLabel })}
        </Typography.Paragraph>
        <Typography.Paragraph style={{ color: COLORS.muted, fontSize: 14 }}>
          {t("download.hosted")}{" "}
          <a href="https://github.com/DoerFlow/downloads/releases" style={{ color: COLORS.primary }}>
            DoerFlow/downloads
          </a>
        </Typography.Paragraph>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <section className="df-download-card">
            <Typography.Title level={3} style={{ color: COLORS.text, marginTop: 0 }}>
              <AndroidOutlined /> {t("download.walletTitle")}
            </Typography.Title>
            <Typography.Paragraph style={{ color: COLORS.muted }}>
              {t("download.walletBody")}
            </Typography.Paragraph>
            <Button type="primary" icon={<DownloadOutlined />} href={WALLET_APK} size="large" block={false}>
              {t("download.walletCta")}
            </Button>
          </section>
          <section className="df-download-card">
            <Typography.Title level={3} style={{ color: COLORS.text, marginTop: 0 }}>
              <AndroidOutlined /> {t("download.workerTitle")}
            </Typography.Title>
            <Typography.Paragraph style={{ color: COLORS.muted }}>
              {t("download.workerBody")}
            </Typography.Paragraph>
            <Button type="primary" icon={<DownloadOutlined />} href={WORKER_APK} size="large">
              {t("download.workerCta")}
            </Button>
          </section>
          <section className="df-download-card">
            <Typography.Title level={3} style={{ color: COLORS.text, marginTop: 0 }}>
              <GlobalOutlined /> {t("download.creatorTitle")}
            </Typography.Title>
            <Typography.Paragraph style={{ color: COLORS.muted }}>
              {t("download.creatorBody")}
            </Typography.Paragraph>
            <Button href={APP_URL} size="large" target="_blank" rel="noreferrer">
              {t("download.creatorCta")}
            </Button>
          </section>
        </Space>
      </div>
      </main>
      <Footer />
    </>
  )
}
