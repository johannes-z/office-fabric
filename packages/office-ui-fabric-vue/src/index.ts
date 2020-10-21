import './version'

import Fabric from './plugin/office-fabric'
import * as Components from './components'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { loadTheme } from './plugin/loadTheme'
import { getTheme } from '@uifabric/styling'

// enables CSS Vars
loadTheme(getTheme())

Vue.use(VueCompositionAPI)

export * from './components'
export * from './components/ThemeProvider'

export * from './Styling'
export * from './Utilities'

export * from './utilities/selectableOption'
export * from './utilities/positioning'

export * from './common/DirectionalHint'

export {
  Fabric,
  Components as FabricComponents,
  loadTheme,
}
export { initializeIcons } from '@uifabric/icons'
export type { IIconSubset } from './plugin/registerIcons'
export { registerIcons } from './plugin/registerIcons'

export type { IPartialTheme, IOptions } from './plugin/office-fabric'

export default Fabric
