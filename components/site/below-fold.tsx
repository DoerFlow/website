"use client"

import dynamic from "next/dynamic"

const loading = () => <div className="df-section-skeleton" aria-hidden />

const WhyCrypto = dynamic(() => import("@/components/sections/why-crypto").then((m) => ({ default: m.WhyCrypto })), { loading, ssr: false })
const Shift = dynamic(() => import("@/components/sections/shift").then((m) => ({ default: m.Shift })), { loading, ssr: false })
const Architecture = dynamic(() => import("@/components/sections/architecture").then((m) => ({ default: m.Architecture })), { loading, ssr: false })
const Features = dynamic(() => import("@/components/sections/features").then((m) => ({ default: m.Features })), { loading, ssr: false })
const Products = dynamic(() => import("@/components/sections/products").then((m) => ({ default: m.Products })), { loading, ssr: false })
const HowItWorks = dynamic(() => import("@/components/sections/how-it-works").then((m) => ({ default: m.HowItWorks })), { loading, ssr: false })
const UseCases = dynamic(() => import("@/components/sections/use-cases").then((m) => ({ default: m.UseCases })), { loading, ssr: false })
const Economy = dynamic(() => import("@/components/sections/economy").then((m) => ({ default: m.Economy })), { loading, ssr: false })
const AgentChain = dynamic(() => import("@/components/sections/agent-chain").then((m) => ({ default: m.AgentChain })), { loading, ssr: false })
const Ecosystem = dynamic(() => import("@/components/sections/ecosystem").then((m) => ({ default: m.Ecosystem })), { loading, ssr: false })
const Developers = dynamic(() => import("@/components/sections/developers").then((m) => ({ default: m.Developers })), { loading, ssr: false })
const Governance = dynamic(() => import("@/components/sections/governance").then((m) => ({ default: m.Governance })), { loading, ssr: false })
const Roadmap = dynamic(() => import("@/components/sections/roadmap").then((m) => ({ default: m.Roadmap })), { loading, ssr: false })
const FooterCta = dynamic(() => import("@/components/sections/footer-cta").then((m) => ({ default: m.FooterCta })), { loading, ssr: false })
const Footer = dynamic(() => import("@/components/sections/footer").then((m) => ({ default: m.Footer })), { loading, ssr: false })

function Divider() {
  return <div className="df-section-divider" />
}

export function BelowFold() {
  return (
    <>
      <WhyCrypto />
      <Divider />
      <Shift />
      <Divider />
      <Architecture />
      <Features />
      <Divider />
      <Products />
      <HowItWorks />
      <Divider />
      <UseCases />
      <Economy />
      <AgentChain />
      <Ecosystem />
      <Divider />
      <Developers />
      <Governance />
      <Roadmap />
      <FooterCta />
      <Footer />
    </>
  )
}
