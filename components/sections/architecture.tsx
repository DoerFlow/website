"use client"

import { Card, Tag, Typography } from "antd"
import { SectionHeading, Reveal } from "@/components/site/section-heading"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"

const { Title, Text } = Typography

const LAYER_ACCENTS = [COLORS.primary, COLORS.primary, COLORS.purple, COLORS.purple, COLORS.purple]

export function Architecture() {
  const { t, tm } = useT()
  const layers = tm<Array<{ n: string; name: string; desc: string; tags: string[] }>>("architecture.layers")

  return (
    <section id="protocol" className="df-anchor df-section">
      <SectionHeading
        eyebrow={t("architecture.eyebrow")}
        title={t("architecture.title")}
        highlight={t("architecture.highlight")}
        tagline={t("architecture.tagline")}
        subtitle={t("architecture.subtitle")}
      />

      <div className="df-arch-stack">
        {layers.map((l, i) => (
          <Reveal key={l.n} delay={i * 0.06}>
            <Card
              className="df-glass df-glass-hover"
              variant="borderless"
              styles={{ body: { padding: 0 } }}
            >
              <div
                className="df-arch-row"
                style={{ borderLeft: `3px solid ${LAYER_ACCENTS[i]}` }}
              >
                <span className="df-arch-index" style={{ color: LAYER_ACCENTS[i] }}>
                  {l.n}
                </span>
                <div className="df-arch-body">
                  <Title level={5} style={{ margin: 0, color: COLORS.text }}>
                    {l.name}
                  </Title>
                  <Text style={{ color: COLORS.muted }}>{l.desc}</Text>
                  <div className="df-arch-tags">
                    {l.tags.map((tag) => (
                      <Tag
                        key={tag}
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          borderColor: COLORS.border,
                          color: COLORS.muted,
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
