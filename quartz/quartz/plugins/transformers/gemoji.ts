import type { QuartzTransformerPlugin } from "@quartz-community/types"
import remarkGemoji from "remark-gemoji"

export const Gemoji: QuartzTransformerPlugin = () => {
  return {
    name: "Gemoji",
    markdownPlugins() {
      return [remarkGemoji]
    },
  }
}
