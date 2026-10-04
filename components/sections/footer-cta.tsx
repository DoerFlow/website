"use client"

import { Button, Space, Input, Typography, App } from "antd"
import { ArrowRightOutlined, BookOutlined, TeamOutlined } from "@ant-design/icons"
import { useState } from "react"
import { motion } from "framer-motion"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"
import { DOCS_URL } from "@/lib/urls"

const { Title } = Typography

export function FooterCta() {
  const { t } = useT()
  const { message } = App.useApp()
  const [email, setEmail] = useState("")

  const onSubscribe = () => {
    if (!email || !email.includes("@")) {
      message.error(t("footerCta.errorInvalidEmail"))
      return
    }
    message.success(t("footerCta.successSubscribed"))
    setEmail("")
  }

  return (
    <section className="df-section" style={{ textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="df-glass df-footer-cta"
        style={{
          padding: "56px 28px",
          background:
            "radial-gradient(circle at 50% 0%, rgba(0,212,170,0.12), rgba(20,27,45,0.7) 60%)",
          border: "1px solid rgba(0,212,170,0.25)",
        }}
      >
        <Title
          level={2}
          style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.text }}
        >
          {t("footerCta.title")}{" "}
          <span className="df-gradient-text">{t("footerCta.titleHighlight")}</span>
        </Title>
        <p className="df-cn" style={{ marginTop: 12 }}>
          {t("footerCta.tagline")}
        </p>

        <Space size={12} wrap style={{ justifyContent: "center", marginTop: 28 }}>
          <Button type="primary" size="large" icon={<ArrowRightOutlined />} iconPlacement="end">
            {t("common.launchApp")}
          </Button>
          <Button size="large" type="text"  icon={<BookOutlined />} href={DOCS_URL} target="_blank" style={{ color: COLORS.muted }}>
            {t("common.readDocs")}
          </Button>
          <Button size="large" type="text" icon={<TeamOutlined />} href="https://github.com/doerflow/VibeAgent/issues" target="_blank" style={{ color: COLORS.muted }}>
            {t("common.joinCommunity")}
          </Button>
        </Space>

        <div className="df-footer-cta-form" style={{ maxWidth: 440, margin: "36px auto 0" }}>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              size="large"
              placeholder={t("footerCta.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onPressEnter={onSubscribe}
              aria-label={t("footerCta.emailAria")}
            />
            <Button size="large" type="primary" onClick={onSubscribe}>
              {t("common.subscribe")}
            </Button>
          </Space.Compact>
        </div>
      </motion.div>
    </section>
  )
}
