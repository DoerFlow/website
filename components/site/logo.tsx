"use client"

import { useT } from "@/lib/i18n/context"

export const LOGO_MARK_SRC = "/brand/logo-mark.svg"

export function Logo({ size = 30, withText = true }: { size?: number; withText?: boolean }) {
  const { t } = useT()

  return (
    <div className="df-logo">
      <img
        src={LOGO_MARK_SRC}
        width={size}
        height={size}
        alt={t("logo.ariaLabel")}
        className="df-logo-mark"
      />
      {withText && (
        <span className="df-logo-text">
          <span className="df-logo-name">DoerFlow</span>
          <span className="df-logo-tagline">{t("logo.tagline")}</span>
        </span>
      )}
    </div>
  )
}
