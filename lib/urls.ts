export const SITE_URL = "https://doerflow.dev"
export const DOCS_URL = "https://docs.doerflow.dev"
export const QUICKSTART_URL = `${DOCS_URL}/developers/agent-trading-sdk`
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.doerflow.dev"
export const LOGIN_URL = `${APP_URL.replace(/\/$/, "")}/login`
export const DOWNLOAD_URL = "/download/"
export const BETA_URL =
  process.env.NEXT_PUBLIC_BETA_URL ??
  "mailto:hello@doerflow.dev?subject=DoerFlow%20closed%20beta"
export const COMMUNITY_URL = "https://github.com/doerflow"
export const PRIVACY_URL =
  process.env.NEXT_PUBLIC_PRIVACY_URL ?? "https://luminaryworks.dev/legal/privacy"
export const TERMS_URL =
  process.env.NEXT_PUBLIC_TERMS_URL ?? "https://docs.doerflow.dev/legal/terms"

export const THESIS_URL = `${DOCS_URL}/vision/ai-crypto`
