"use client"

import {
  ArrowRightOutlined,
  BankOutlined,
  CloudServerOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  WalletOutlined,
} from "@ant-design/icons"
import { Button, Card, Col, Row, Tag, Typography } from "antd"
import { SectionHeading, Reveal } from "@/components/site/section-heading"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"
import { THESIS_URL } from "@/lib/urls"

const { Title, Text } = Typography

const PILLAR_ICONS = {
  settlement: <RobotOutlined />,
  streaming: <ThunderboltOutlined />,
  depin: <CloudServerOutlined />,
} as const

export function WhyCrypto() {
  const { t, tm } = useT()
  const pillars = tm<
    Array<{ key: keyof typeof PILLAR_ICONS; title: string; problem: string; solution: string; tag: string }>
  >("whyCrypto.pillars")
  const legacyItems = tm<string[]>("whyCrypto.legacyItems")
  const cryptoItems = tm<string[]>("whyCrypto.cryptoItems")

  return (
    <section id="why-crypto" className="df-anchor df-section">
      <SectionHeading
        eyebrow={t("whyCrypto.eyebrow")}
        title={t("whyCrypto.title")}
        highlight={t("whyCrypto.highlight")}
        tagline={t("whyCrypto.tagline")}
        subtitle={t("whyCrypto.subtitle")}
      />

      <Row gutter={[24, 24]} style={{ marginBottom: 56 }}>
        <Col xs={24} md={12}>
          <Reveal>
            <Card
              className="df-glass"
              variant="borderless"
              style={{ height: "100%" }}
              styles={{ body: { padding: 28 } }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                  color: COLORS.muted,
                }}
              >
                <BankOutlined style={{ fontSize: 22 }} />
                <Text style={{ color: COLORS.muted, fontSize: 13, letterSpacing: "0.04em" }}>
                  {t("whyCrypto.legacyLabel")}
                </Text>
              </div>
              <Title level={4} style={{ margin: "0 0 16px", color: COLORS.text }}>
                {t("whyCrypto.legacyTitle")}
              </Title>
              <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.muted, lineHeight: 1.8 }}>
                {legacyItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </Col>
        <Col xs={24} md={12}>
          <Reveal delay={0.08}>
            <Card
              className="df-glass df-glass-hover"
              variant="borderless"
              style={{ height: "100%", borderColor: "rgba(0,212,170,0.4)" }}
              styles={{ body: { padding: 28 } }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                  color: COLORS.primary,
                }}
              >
                <WalletOutlined style={{ fontSize: 22 }} />
                <Text style={{ color: COLORS.primary, fontSize: 13, letterSpacing: "0.04em" }}>
                  {t("whyCrypto.cryptoLabel")}
                </Text>
              </div>
              <Title level={4} style={{ margin: "0 0 16px", color: COLORS.text }}>
                {t("whyCrypto.cryptoTitle")}
              </Title>
              <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.text, lineHeight: 1.8 }}>
                {cryptoItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {pillars.map((p, i) => (
          <Col xs={24} lg={8} key={p.key}>
            <Reveal delay={i * 0.08}>
              <Card
                className="df-glass df-glass-hover"
                variant="borderless"
                style={{ height: "100%" }}
                styles={{ body: { padding: 26 } }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, rgba(0,212,170,0.18), rgba(124,58,237,0.18))",
                      color: COLORS.primary,
                      fontSize: 22,
                    }}
                  >
                    {PILLAR_ICONS[p.key]}
                  </div>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: COLORS.primary,
                      opacity: 0.55,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <Title level={4} style={{ margin: "0 0 10px", color: COLORS.text }}>
                  {p.title}
                </Title>
                <Tag
                  color="cyan"
                  style={{
                    marginBottom: 14,
                    background: "rgba(0,212,170,0.1)",
                    borderColor: "rgba(0,212,170,0.3)",
                    color: COLORS.primary,
                  }}
                >
                  {p.tag}
                </Tag>
                <Text style={{ display: "block", color: COLORS.muted, lineHeight: 1.65, marginBottom: 10 }}>
                  {p.problem}
                </Text>
                <Text style={{ display: "block", color: COLORS.text, lineHeight: 1.65 }}>{p.solution}</Text>
              </Card>
            </Reveal>
          </Col>
        ))}
      </Row>

      <Reveal delay={0.1}>
        <div
          className="df-glass"
          style={{
            marginTop: 56,
            padding: "32px 28px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 auto 20px",
              fontSize: 17,
              lineHeight: 1.7,
              color: COLORS.text,
              maxWidth: 720,
            }}
          >
            {t("whyCrypto.closer")}
          </p>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
            href={THESIS_URL}
            target="_blank"
            rel="noreferrer"
          >
            {t("whyCrypto.cta")}
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
