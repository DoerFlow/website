"use client"

import { Reveal, SectionHeading } from "@/components/site/section-heading"
import { useT } from "@/lib/i18n/context"
import { localeDownloadPath } from "@/lib/i18n/paths"
import { APP_URL, DOCS_URL } from "@/lib/urls"
import {
  ApiOutlined,
  ArrowRightOutlined,
  BookOutlined,
  CloudServerOutlined,
  CodeOutlined,
  DeploymentUnitOutlined,
  DownloadOutlined,
  MobileOutlined,
  RobotOutlined,
  TeamOutlined,
  ToolOutlined,
  WalletOutlined,
} from "@ant-design/icons"
import { Button, Card, Col, Row } from "antd"
import type { ReactNode } from "react"

interface CardItem {
  title: string
  body: string
}
interface StepItem {
  title: string
  body: string
}
interface ProductItem extends CardItem {
  key: "task" | "web" | "app" | "sdk" | "money" | "developer"
  action: string
}

const SCENE_ICONS: ReactNode[] = [
  <RobotOutlined key="agents" />,
  <TeamOutlined key="people" />,
  <CloudServerOutlined key="servers" />,
  <MobileOutlined key="mobile" />,
  <ToolOutlined key="tasks" />,
  <DeploymentUnitOutlined key="resources" />,
]
const PRODUCT_ICONS: Record<ProductItem["key"], ReactNode> = {
  task: <ToolOutlined />,
  web: <CloudServerOutlined />,
  app: <MobileOutlined />,
  sdk: <ApiOutlined />,
  money: <WalletOutlined />,
  developer: <CodeOutlined />,
}

function CardGrid({
  items,
  icons,
  columns = 3,
}: { items: CardItem[]; icons: ReactNode[]; columns?: 2 | 3 }) {
  const span = columns === 2 ? 12 : 8
  return (
    <Row gutter={[20, 20]}>
      {items.map((item, index) => (
        <Col xs={24} md={span} key={item.title}>
          <Reveal delay={(index % columns) * 0.06}>
            <Card className="df-content-card" variant="borderless">
              <div className="df-card-icon" aria-hidden="true">
                {icons[index]}
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Card>
          </Reveal>
        </Col>
      ))}
    </Row>
  )
}

export function HomeSections() {
  const { t, tm, locale } = useT()
  const scenes = tm<CardItem[]>("siteV2.scenes.items")
  const products = tm<ProductItem[]>("siteV2.products.items")
  const steps = tm<StepItem[]>("siteV2.workflow.steps")
  const downloadUrl = localeDownloadPath(locale)
  const productLinks: Record<ProductItem["key"], string> = {
    task: APP_URL,
    web: APP_URL,
    app: downloadUrl,
    sdk: DOCS_URL,
    money: APP_URL,
    developer: DOCS_URL,
  }

  return (
    <>
      <section id="scenes" className="df-anchor df-band">
        <div className="df-section">
          <SectionHeading
            eyebrow={t("siteV2.scenes.eyebrow")}
            title={t("siteV2.scenes.title")}
            subtitle={t("siteV2.scenes.subtitle")}
          />
          <CardGrid items={scenes} icons={SCENE_ICONS} />
        </div>
      </section>

      <section id="products" className="df-anchor df-section">
        <SectionHeading
          eyebrow={t("siteV2.products.eyebrow")}
          title={t("siteV2.products.title")}
          subtitle={t("siteV2.products.subtitle")}
        />
        <Row gutter={[20, 20]}>
          {products.map((product, index) => {
            const href = productLinks[product.key]
            return (
              <Col xs={24} md={12} lg={8} key={product.key}>
                <Reveal delay={(index % 3) * 0.06}>
                  <Card className="df-content-card df-product-card" variant="borderless">
                    <div className="df-card-icon" aria-hidden="true">
                      {PRODUCT_ICONS[product.key]}
                    </div>
                    <h3>{product.title}</h3>
                    <p>{product.body}</p>
                    <Button
                      type="link"
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      icon={<ArrowRightOutlined />}
                      iconPlacement="end"
                    >
                      {product.action}
                    </Button>
                  </Card>
                </Reveal>
              </Col>
            )
          })}
        </Row>
      </section>

      <section id="workflow" className="df-anchor df-section">
        <SectionHeading
          eyebrow={t("siteV2.workflow.eyebrow")}
          title={t("siteV2.workflow.title")}
          subtitle={t("siteV2.workflow.subtitle")}
        />
        <ol className="df-workflow">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

export function ClosingCta() {
  const { t, locale } = useT()
  const downloadUrl = localeDownloadPath(locale)
  return (
    <section className="df-section" aria-labelledby="final-cta-title">
      <div className="df-final-cta">
        <span className="df-eyebrow">{t("siteV2.finalCta.eyebrow")}</span>
        <h2 id="final-cta-title">{t("siteV2.finalCta.title")}</h2>
        <p>{t("siteV2.finalCta.body")}</p>
        <div className="df-cta-row">
          <Button type="primary" size="large" href={APP_URL} target="_blank" rel="noreferrer">
            {t("siteV2.actions.start")}
          </Button>
          <Button
            size="large"
            href={DOCS_URL}
            target="_blank"
            rel="noreferrer"
            icon={<BookOutlined />}
          >
            {t("siteV2.actions.readDocs")}
          </Button>
          <Button size="large" href={downloadUrl} icon={<DownloadOutlined />}>
            {t("siteV2.actions.download")}
          </Button>
        </div>
      </div>
    </section>
  )
}
