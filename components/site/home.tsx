"use client"

import { AgentChain } from "@/components/sections/agent-chain"
import { Architecture } from "@/components/sections/architecture"
import { Developers } from "@/components/sections/developers"
import { Economy } from "@/components/sections/economy"
import { Ecosystem } from "@/components/sections/ecosystem"
import { Features } from "@/components/sections/features"
import { Footer } from "@/components/sections/footer"
import { Governance } from "@/components/sections/governance"
import { Hero } from "@/components/sections/hero"
import { ClosingCta, HomeSections } from "@/components/sections/home-sections"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Products } from "@/components/sections/products"
import { Roadmap } from "@/components/sections/roadmap"
import { Shift } from "@/components/sections/shift"
import { WhyCrypto } from "@/components/sections/why-crypto"
import { Header } from "@/components/site/header"
import { useT } from "@/lib/i18n/context"

export function Home() {
  const { t } = useT()
  return (
    <>
      <a className="df-skip-link" href="#main-content">
        {t("siteV2.a11y.skip")}
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Shift />
        <HomeSections />
        <WhyCrypto />
        <Architecture />
        <Features />
        <Products />
        <HowItWorks />
        <Economy />
        <Ecosystem />
        <Developers />
        <Governance />
        <AgentChain />
        <Roadmap />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
