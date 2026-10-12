"use client"

import { Reveal, SectionHeading } from "@/components/site/section-heading"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"
import {
  ArrowRightOutlined,
  CheckOutlined,
  ControlOutlined,
  DeploymentUnitOutlined,
  SolutionOutlined,
  WalletOutlined,
} from "@ant-design/icons"
import { Button, Card, Col, Row, Tag, Typography } from "antd"

const { Title, Text } = Typography

const PRODUCT_META = [
  { icon: <WalletOutlined />, accent: COLORS.primary },
  { icon: <SolutionOutlined />, accent: COLORS.primary },
  { icon: <DeploymentUnitOutlined />, accent: COLORS.purple },
  { icon: <ControlOutlined />, accent: COLORS.purple },
]

export function Products() {
  const { t, tm } = useT()
  const items =
    tm<Array<{ name: string; stack: string; persona: string; features: string[] }>>(
      "products.items",
    )

  return (
    <section id="apps" className="df-anchor df-section">
      <SectionHeading
        eyebrow={t("products.eyebrow")}
        title={t("products.title")}
        highlight={t("products.highlight")}
        tagline={t("products.tagline")}
        subtitle={t("products.subtitle")}
      />

      <Row gutter={[24, 24]}>
        {items.map((p, i) => {
          const meta = PRODUCT_META[i]
          return (
            <Col xs={24} md={12} key={p.name}>
              <Reveal delay={(i % 2) * 0.1}>
                <Card
                  className="df-glass df-glass-hover"
                  variant="borderless"
                  style={{ height: "100%" }}
                  styles={{ body: { padding: 28 } }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${meta.accent}22`,
                        color: meta.accent,
                        fontSize: 24,
                      }}
                    >
                      {meta.icon}
                    </div>
                    <div>
                      <Title level={4} style={{ margin: 0, color: COLORS.text }}>
                        {p.name}
                      </Title>
                      <Tag
                        style={{
                          marginTop: 4,
                          background: "rgba(255,255,255,0.04)",
                          borderColor: COLORS.border,
                          color: COLORS.muted,
                        }}
                      >
                        {p.stack}
                      </Tag>
                    </div>
                  </div>
                  <Text style={{ color: meta.accent, fontWeight: 600, fontSize: 13 }}>
                    {p.persona}
                  </Text>
                  <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
                    {p.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                          marginBottom: 10,
                        }}
                      >
                        <CheckOutlined style={{ color: meta.accent, fontSize: 13, marginTop: 4 }} />
                        <Text style={{ color: COLORS.muted }}>{f}</Text>
                      </li>
                    ))}
                  </ul>
                  <Button
                    type="link"
                    style={{ paddingLeft: 0, color: meta.accent }}
                    icon={<ArrowRightOutlined />}
                    iconPlacement="end"
                  >
                    {t("common.learnMore")}
                  </Button>
                </Card>
              </Reveal>
            </Col>
          )
        })}
      </Row>
    </section>
  )
}
