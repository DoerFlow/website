"use client"

import type { ReactNode } from "react"
import { Grid, Tabs, Typography, Tag } from "antd"
import {
  ShopOutlined,
  TeamOutlined,
  CloudServerOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  BulbOutlined,
  ContainerOutlined,
  SwapOutlined,
} from "@ant-design/icons"
import { SectionHeading, Reveal } from "@/components/site/section-heading"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"

const { Title, Paragraph } = Typography
const { useBreakpoint } = Grid

const CASE_ICONS: Record<string, ReactNode> = {
  marketplace: <ShopOutlined />,
  human: <TeamOutlined />,
  compute: <CloudServerOutlined />,
  iot: <ThunderboltOutlined />,
  data: <DatabaseOutlined />,
  energy: <BulbOutlined />,
  coldchain: <ContainerOutlined />,
  metadex: <SwapOutlined />,
}

export function UseCases() {
  const { t, tm } = useT()
  const screens = useBreakpoint()
  const cases = tm<Array<{ key: string; label: string; title: string; desc: string; tags: string[] }>>("useCases.cases")
  const tabPlacement = screens.lg ? "start" : "top"

  return (
    <section id="use-cases" className="df-anchor df-section">
      <SectionHeading
        eyebrow={t("useCases.eyebrow")}
        title={t("useCases.title")}
        highlight={t("useCases.highlight")}
        tagline={t("useCases.tagline")}
        subtitle={t("useCases.subtitle")}
      />

      <Reveal>
        <Tabs
          className="df-use-cases-tabs"
          tabPlacement={tabPlacement}
          style={{ minHeight: 280 }}
          items={cases.map((c) => ({
            key: c.key,
            label: (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "2px 0" }}>
                <span style={{ color: COLORS.primary }}>{CASE_ICONS[c.key]}</span>
                <span>{c.label}</span>
              </span>
            ),
            children: (
              <div
                className="df-glass df-use-cases-panel"
                style={{ padding: 32, marginLeft: screens.lg ? 8 : 0 }}
              >
                <Title level={3} style={{ marginTop: 0, color: COLORS.text }}>
                  {c.title}
                </Title>
                <Paragraph style={{ color: COLORS.muted, fontSize: 16, lineHeight: 1.7 }}>
                  {c.desc}
                </Paragraph>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {c.tags.map((tag) => (
                    <Tag
                      key={tag}
                      color="cyan"
                      style={{ background: "rgba(0,212,170,0.1)", borderColor: "rgba(0,212,170,0.3)", color: COLORS.primary }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            ),
          }))}
        />
      </Reveal>
    </section>
  )
}
