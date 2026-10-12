import { theme, type ThemeConfig } from "antd"

export const COLORS = {
  bg: "var(--df-bg)",
  surface: "var(--df-surface)",
  elevated: "var(--df-elevated)",
  primary: "var(--df-primary)",
  purple: "#7C3AED",
  text: "var(--df-text)",
  muted: "var(--df-muted)",
  border: "var(--df-border)",
}

export function antdTheme(isDark: boolean): ThemeConfig {
  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: isDark ? "#43E0C1" : "#087C6B",
      colorBgContainer: isDark ? "#141B2D" : "#FFFFFF",
      colorBgElevated: isDark ? "#1A2235" : "#FFFFFF",
      colorBgLayout: isDark ? "#0B1120" : "#F5F8F7",
      colorBorder: isDark ? "rgba(255,255,255,0.12)" : "rgba(15,43,38,0.16)",
      colorText: isDark ? "#F4F7FA" : "#102520",
      colorTextSecondary: isDark ? "#A9B4C7" : "#4D625D",
      borderRadius: 8,
      fontFamily:
        'var(--font-inter), Inter, "PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: 15,
    },
    components: {
      Layout: {
        headerBg: "transparent",
        bodyBg: "transparent",
        footerBg: "transparent",
      },
      Card: { colorBgContainer: "var(--df-surface)" },
      Steps: { colorPrimary: isDark ? "#43E0C1" : "#087C6B" },
      Tabs: {
        inkBarColor: isDark ? "#43E0C1" : "#087C6B",
        itemSelectedColor: isDark ? "#43E0C1" : "#087C6B",
      },
      Table: {
        headerBg: "var(--df-elevated)",
        colorBgContainer: "var(--df-surface)",
      },
    },
  }
}
