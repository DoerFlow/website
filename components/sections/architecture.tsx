"use client"

import { useT } from "@/lib/i18n/context"
import {
  BulbOutlined,
  CloudServerOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  ShopOutlined,
  SwapOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons"
import type { ReactNode } from "react"

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

export function Architecture() {
  const { t, tm } = useT()
  const layers =
    tm<Array<{ n: string; name: string; desc: string; tags: string[] }>>("architecture.layers")
  const cases =
    tm<Array<{ key: string; label: string; title: string; desc: string; tags: string[] }>>(
      "useCases.cases",
    )

  return (
    <section id="protocol" className="df-anchor df-band">
      <div className="df-section df-protocol">
        <div>
          <span className="df-eyebrow">{t("architecture.eyebrow")}</span>
          <h2>
            {t("architecture.title")}
            <span className="df-gradient-text df-keep"> {t("architecture.highlight")}</span>
          </h2>
          <p>{t("architecture.subtitle")}</p>
          <ol className="df-layer-list">
            {layers.map((layer) => (
              <li key={layer.n}>
                <span>{layer.n}</span>
                <div>
                  <strong>{layer.name}</strong>
                  <p>{layer.desc}</p>
                  <div>
                    {layer.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div id="markets">
          <span className="df-eyebrow">{t("useCases.eyebrow")}</span>
          <h2>
            {t("useCases.title")}
            <span className="df-gradient-text df-keep"> {t("useCases.highlight")}</span>
          </h2>
          <p>{t("useCases.subtitle")}</p>
          <ul className="df-market-grid">
            {cases.map((item) => (
              <li key={item.key}>
                <span aria-hidden="true">{CASE_ICONS[item.key]}</span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.title}</p>
                  <small>{item.desc}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
