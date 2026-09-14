"use client"

import { AndroidOutlined, DownloadOutlined, GlobalOutlined } from "@ant-design/icons"
import { Alert, Button, Space, Typography } from "antd"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/sections/footer"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"

const RELEASE_VERSION = process.env.NEXT_PUBLIC_RELEASE_VERSION ?? "0.1.0"
const RELEASE_BASE =
  process.env.NEXT_PUBLIC_RELEASE_BASE ??
  "https://github.com/DoerFlow/downloads/releases/latest/download"

const WALLET_APK = `${RELEASE_BASE}/DoerFlow-Wallet-${RELEASE_VERSION}.apk`
const WORKER_APK = `${RELEASE_BASE}/DoerFlow-Worker-${RELEASE_VERSION}.apk`

export function DownloadPage() {
  const { t } = useT()
  return (
    <main>
      <Header />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 24px 80px", minHeight: "70vh" }}>
        <Typography.Title level={1} style={{ color: COLORS.text, marginBottom: 8 }}>
          {t("download.title")}
        </Typography.Title>
        <Typography.Paragraph style={{ color: COLORS.muted, fontSize: 16 }}>
          {t("download.lead", { version: RELEASE_VERSION })}
        </Typography.Paragraph>
        <Typography.Paragraph style={{ color: COLORS.muted, fontSize: 14 }}>
          {t("download.hosted")}{" "}
          <a href="https://github.com/DoerFlow/downloads/releases" style={{ color: COLORS.primary }}>
            DoerFlow/downloads
          </a>
        </Typography.Paragraph>
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 28 }}
          message={t("download.sideloadWarn")}
        />
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <section
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <Typography.Title level={3} style={{ color: COLORS.text, marginTop: 0 }}>
              <AndroidOutlined /> {t("download.walletTitle")}
            </Typography.Title>
            <Typography.Paragraph style={{ color: COLORS.muted }}>
              {t("download.walletBody")}
            </Typography.Paragraph>
            <Button type="primary" icon={<DownloadOutlined />} href={WALLET_APK} size="large">
              {t("download.walletCta")}
            </Button>
          </section>
          <section
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 12,
              padding: 24,
            }}
          >
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
          <section
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <Typography.Title level={3} style={{ color: COLORS.text, marginTop: 0 }}>
              <GlobalOutlined /> {t("download.creatorTitle")}
            </Typography.Title>
            <Typography.Paragraph style={{ color: COLORS.muted }}>
              {t("download.creatorBody")}
            </Typography.Paragraph>
            <Button href="https://app.doerflow.dev" size="large" target="_blank">
              {t("download.creatorCta")}
            </Button>
          </section>
        </Space>
      </div>
      <Footer />
    </main>
  )
}
