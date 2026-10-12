"use client"

import { DesktopOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons"
import { Dropdown } from "antd"
import type { MenuProps } from "antd"
import { useT } from "@/lib/i18n/context"
import { useTheme, type ThemePreference } from "@/lib/theme-context"

const ICONS = {
  light: <SunOutlined />,
  dark: <MoonOutlined />,
  system: <DesktopOutlined />,
}

export function ThemeSwitcher() {
  const { t } = useT()
  const { preference, setPreference } = useTheme()
  const items: MenuProps["items"] = (["light", "dark", "system"] as const).map((value) => ({
    key: value,
    icon: ICONS[value],
    label: t(`siteV2.theme.${value}`),
  }))

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [preference],
        onClick: ({ key }) => setPreference(key as ThemePreference),
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <button
        type="button"
        className="df-icon-control"
        aria-label={`${t("siteV2.theme.label")}: ${t(`siteV2.theme.${preference}`)}`}
      >
        {ICONS[preference]}
      </button>
    </Dropdown>
  )
}
