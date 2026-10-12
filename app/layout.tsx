import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SITE_URL } from "@/lib/urls"
import "@/styles/globals.scss"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DoerFlow — Safe work and settlement for agents, APIs, and people",
  description:
    "A verifiable work and settlement layer for Agent-to-Agent, Agent-to-Human, and Agent-to-Device transactions.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F8F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

const themeScript = `(() => {
  try {
    const saved = localStorage.getItem("doerflow-theme");
    const preference = ["light", "dark", "system"].includes(saved) ? saved : "light";
    const resolved = preference === "system"
      ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : preference;
    const root = document.documentElement;
    root.dataset.themePreference = preference;
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
  } catch (_) {
    document.documentElement.dataset.theme = "light";
    document.documentElement.dataset.themePreference = "light";
  }
})();`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} data-theme="light" data-theme-preference="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap must run before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
