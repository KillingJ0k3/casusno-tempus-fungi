import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { Gemoji } from "./quartz/plugins/transformers/gemoji"
import { Mentions } from "./quartz/plugins/transformers/mentions"

const config = await loadQuartzConfig()

config.plugins.transformers.push(Gemoji())
config.plugins.transformers.push(Mentions())

export default config
export const layout = await loadQuartzLayout()
