"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  tagline,
  align = "center",
}: {
  eyebrow?: string
  title: string
  highlight?: string
  subtitle?: ReactNode
  tagline?: string
  align?: "center" | "left"
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className={`df-section-heading df-section-heading-${align}`}
    >
      {eyebrow && <span className="df-eyebrow">{eyebrow}</span>}
      <h2>{title}{highlight && <span className="df-gradient-text"> {highlight}</span>}</h2>
      {tagline && <p className="df-section-tagline">{tagline}</p>}
      {subtitle && <p>{subtitle}</p>}
    </motion.div>
  )
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  )
}
