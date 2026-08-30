"use client"

import { LoginOutlined, MenuOutlined } from "@ant-design/icons"
import { Affix, Button, Drawer, Grid, Space } from "antd"
import { useMemo, useState } from "react"
import { LanguageSwitcher } from "./language-switcher"
import { Logo } from "./logo"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"
import { DOCS_URL } from "@/lib/urls"

const LOGIN_URL = "https://app.doerflow.dev"
const { useBreakpoint } = Grid

export function Header() {
  const { t } = useT()
  const screens = useBreakpoint()
  const isDesktop = screens.lg
  const [open, setOpen] = useState(false)

  const nav = useMemo(
    () => [
      { label: t("header.nav.whyCrypto"), href: "#why-crypto" },
      { label: t("header.nav.protocol"), href: "#protocol" },
      { label: t("header.nav.products"), href: "#products" },
      { label: t("header.nav.useCases"), href: "#use-cases" },
      { label: t("header.nav.economy"), href: "#economy" },
      { label: t("header.nav.ecosystem"), href: "#ecosystem" },
      { label: t("header.nav.developers"), href: "#developers" },
      { label: t("header.nav.docs"), href: DOCS_URL },
    ],
    [t],
  )

  return (
    <Affix offsetTop={0}>
      <header className="df-header">
        <div className="df-header-inner">
          <a href="#top" aria-label={t("header.homeAria")} className="df-header-brand">
            <Logo />
          </a>

          {isDesktop ? (
            <>
              <nav className="df-header-nav" aria-label="Primary">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className="df-link df-header-nav-link">
                    {item.label}
                  </a>
                ))}
              </nav>
              <Space size={4} align="center" className="df-header-actions">
                <LanguageSwitcher />
                <Button
                  type="text"
                  className="df-header-login-btn"
                  icon={<LoginOutlined />}
                  href={LOGIN_URL}
                  target="_blank"
                  style={{ color: COLORS.text, fontWeight: 500 }}
                >
                  {t("header.login")}
                </Button>
              </Space>
            </>
          ) : (
            <Space size={4} align="center" className="df-header-actions">
              <LanguageSwitcher />
              <Button
                type="text"
                className="df-header-menu-btn"
                aria-label={t("header.openMenu")}
                icon={<MenuOutlined style={{ color: COLORS.text, fontSize: 20 }} />}
                onClick={() => setOpen(true)}
              />
            </Space>
          )}
        </div>

        <Drawer
          title={<Logo />}
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          styles={{
            body: { background: COLORS.bg },
            header: { background: COLORS.bg },
            wrapper: { width: 300 },
          }}
        >
          <nav className="df-header-drawer-nav">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="df-header-drawer-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="df-header-drawer-divider" />
            <Button block type="primary" icon={<LoginOutlined />} href={LOGIN_URL} target="_blank">
              {t("header.login")}
            </Button>
          </nav>
        </Drawer>
      </header>
    </Affix>
  )
}
