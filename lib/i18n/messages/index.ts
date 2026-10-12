import type { Locale } from "../config"
import en from "./en.json"
import es from "./es.json"
import it from "./it.json"
import ja from "./ja.json"
import ko from "./ko.json"
import nl from "./nl.json"
import pt from "./pt.json"
import zhCN from "./zh-CN.json"
import zhTW from "./zh-TW.json"
import fr from "./fr.json"

export type Messages = typeof en

export const messagesByLocale: Record<Locale, Messages> = {
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  es,
  pt,
  nl,
  it,
  ja,
  ko,
  fr,
}
