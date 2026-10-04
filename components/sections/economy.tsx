"use client"

import { useMemo } from "react"
import { Row, Col, Table, Card, Typography, Tag } from "antd"
import { SectionHeading, Reveal } from "@/components/site/section-heading"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"

const { Title, Text, Paragraph } = Typography

const SPLIT_COLORS = [COLORS.primary, COLORS.purple, "#5b6b8c"]
const SPLIT_WIDTHS = [0.925, 0.05, 0.025]

export function Economy() {
  const { t, tm } = useT()
  const fees = tm<Array<{ fee: string; rate: string; recipient: string }>>("economy.fees")
  const split = tm<Array<{ label: string; value: string }>>("economy.split")

  const columns = useMemo(
    () => [
      {
        title: t("economy.table.feeType"),
        dataIndex: "fee",
        key: "fee",
        render: (v: string) => <span style={{ color: COLORS.text, fontWeight: 600 }}>{v}</span>,
      },
      {
        title: t("economy.table.rate"),
        dataIndex: "rate",
        key: "rate",
        render: (v: string) => <span style={{ color: COLORS.primary, fontWeight: 600 }}>{v}</span>,
      },
      {
        title: t("economy.table.recipient"),
        dataIndex: "recipient",
        key: "recipient",
        render: (v: string) => <span style={{ color: COLORS.muted }}>{v}</span>,
      },
    ],
    [t],
  )

  const dataSource = fees.map((row, i) => ({ ...row, key: String(i + 1) }))

  return (
    <section id="economy" className="df-anchor df-section">
      <SectionHeading
        eyebrow={t("economy.eyebrow")}
        title={t("economy.title")}
        highlight={t("economy.highlight")}
        tagline={t("economy.tagline")}
        subtitle={t("economy.subtitle")}
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Reveal>
            <Card className="df-glass" variant="borderless" styles={{ body: { padding: 8 } }}>
              <div className="df-table-scroll">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  size="middle"
                  scroll={{ x: "max-content" }}
                  style={{ background: "transparent" }}
                />
              </div>
            </Card>
          </Reveal>
        </Col>

        <Col xs={24} lg={10}>
          <Reveal delay={0.1}>
            <Card className="df-glass" variant="borderless" style={{ height: "100%" }} styles={{ body: { padding: 28 } }}>
              <Text style={{ color: COLORS.muted, fontSize: 13 }}>{t("economy.exampleSettlement")}</Text>
              <Title level={4} style={{ margin: "4px 0 18px", color: COLORS.text }}>
                {t("economy.consumerPays")}{" "}
                <span className="df-gradient-text">{t("economy.consumerPaysAmount")}</span>
              </Title>

              <div style={{ display: "flex", height: 12, borderRadius: 999, overflow: "hidden", marginBottom: 20 }}>
                {split.map((s, i) => (
                  <div key={s.label} style={{ width: `${SPLIT_WIDTHS[i] * 100}%`, background: SPLIT_COLORS[i] }} />
                ))}
              </div>

              {split.map((s, i) => (
                <div
                  key={s.label}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: SPLIT_COLORS[i] }} />
                    <Text style={{ color: COLORS.muted }}>{s.label}</Text>
                  </span>
                  <Text style={{ color: COLORS.text, fontWeight: 600 }}>{s.value}</Text>
                </div>
              ))}

              <div style={{ height: 1, background: COLORS.border, margin: "16px 0" }} />
              <Tag color="purple" style={{ background: "rgba(124,58,237,0.12)", borderColor: "rgba(124,58,237,0.35)", color: "#b794f6" }}>
                {t("economy.futureAgentFi")}
              </Tag>
              <Paragraph style={{ color: COLORS.muted, marginTop: 10, marginBottom: 0 }}>
                {t("economy.agentFiDesc")}
              </Paragraph>
            </Card>
          </Reveal>
        </Col>
      </Row>
    </section>
  )
}
