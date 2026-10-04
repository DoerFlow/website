"use client"

import { GlobalOutlined } from "@ant-design/icons"
import { Dropdown } from "antd"
import type { MenuProps } from "antd"
import { usePathname, useRouter } from "next/navigation"
import { LOCALE_LABELS, LOCALE_SHORT, LOCALES, type Locale } from "@/lib/i18n/config"
import { localizedHref } from "@/lib/i18n/paths"
import { useT } from "@/lib/i18n/context"
import { COLORS } from "@/lib/theme"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const { locale, t } = useT()

  const items: MenuProps["items"] = LOCALES.map((code) => ({
    key: code,
    label: LOCALE_LABELS[code],
  }))

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [locale],
        onClick: ({ key }) => router.push(localizedHref(key as Locale, pathname)),
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <button
        type="button"
        aria-label={t("lang.label")}
        className="df-lang-switch"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          border: "none",
          borderRadius: 8,
          background: "transparent",
          color: COLORS.muted,
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        <GlobalOutlined style={{ fontSize: 15 }} />
        <span>{LOCALE_SHORT[locale]}</span>
      </button>
    </Dropdown>
  )
}
