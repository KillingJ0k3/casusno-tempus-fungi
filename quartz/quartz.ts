import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { Gemoji } from "./quartz/plugins/transformers/gemoji"

const config = await loadQuartzConfig()

// On ajoute le plugin Gemoji à la liste des transformers déjà chargés depuis quartz.config.yaml
config.plugins.transformers.push(Gemoji())

export default config
export const layout = await loadQuartzLayout()

