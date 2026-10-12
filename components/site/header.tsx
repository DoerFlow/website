"use client"

import { useT } from "@/lib/i18n/context"
import { localePath } from "@/lib/i18n/paths"
import { LOGIN_URL } from "@/lib/urls"
import { LoginOutlined, MenuOutlined } from "@ant-design/icons"
import { Drawer, Grid, Space } from "antd"
import { useMemo, useState } from "react"
import { LanguageSwitcher } from "./language-switcher"
import { Logo } from "./logo"
import { ThemeSwitcher } from "./theme-switcher"

const { useBreakpoint } = Grid

const loginStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 10px",
  border: "none",
  borderRadius: 8,
  background: "transparent",
  color: "var(--df-muted)",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  lineHeight: 1,
  textDecoration: "none",
} as const


export function Header() {
  const { t, locale } = useT()
  const screens = useBreakpoint()
  const isDesktop = screens.xl
  const [open, setOpen] = useState(false)
  const home = localePath(locale)
  const nav = useMemo(
    () => [
      { label: t("siteV2.nav.scenes"), href: `${home}#scenes` },
      { label: t("siteV2.nav.products"), href: `${home}#products` },
      { label: t("siteV2.nav.workflow"), href: `${home}#workflow` },
      { label: t("header.nav.whyCrypto"), href: `${home}#why-crypto` },
      { label: t("header.nav.protocol"), href: `${home}#protocol` },
      { label: t("header.nav.economy"), href: `${home}#economy` },
      { label: t("header.nav.ecosystem"), href: `${home}#ecosystem` },
      { label: t("header.nav.developers"), href: `${home}#developers` },
    ],
    [home, t],
  )

  return (
    <header className="df-header">
      <div className="df-header-inner">
        <a href={home} aria-label={t("header.homeAria")} className="df-header-brand">
          <Logo />
        </a>

        {isDesktop ? (
          <>
            <nav className="df-header-nav" aria-label={t("siteV2.nav.aria")}>
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="df-link df-header-nav-link">
                  {item.label}
                </a>
              ))}
            </nav>
            <Space size={4} align="center" className="df-header-actions">
              <ThemeSwitcher />
              <LanguageSwitcher />
              <a href={LOGIN_URL} className="df-lang-switch" style={loginStyle}>
                <LoginOutlined style={{ fontSize: 15 }} />
                <span>{t("header.login")}</span>
              </a>
            </Space>
          </>
        ) : (
          <Space size={4} align="center" className="df-header-actions">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <a href={LOGIN_URL} className="df-lang-switch" style={loginStyle}>
              <LoginOutlined style={{ fontSize: 15 }} />
              <span>{t("header.login")}</span>
            </a>
            <button
              type="button"
              className="df-icon-control"
              aria-label={t("header.openMenu")}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <MenuOutlined />
            </button>
          </Space>
        )}
      </div>

      <Drawer
        title={<Logo />}
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        className="df-nav-drawer"
        size="min(340px, 90vw)"
      >
        <nav className="df-header-drawer-nav" aria-label={t("siteV2.nav.aria")}>
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
          <a href={LOGIN_URL} className="df-lang-switch" style={loginStyle}>
            <LoginOutlined style={{ fontSize: 15 }} />
            <span>{t("header.login")}</span>
          </a>
        </nav>
      </Drawer>
    </header>
  )
}
