import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SITE_URL } from "@/lib/urls"
import "@/styles/globals.scss"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DoerFlow — The Liquidity Protocol for Autonomous Agents",
  },
  description:
    "Crypto settlement for autonomous agents, skills, humans, and devices — streaming micropayments and DePIN compute.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0B1120",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body style={{ backgroundColor: "#0B1120" }}>{children}</body>
    </html>
  )
}
