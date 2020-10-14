import './version'
import 'vue-tsx-support/enable-check'

import Fabric from './plugin/office-fabric'
import * as Components from './components'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

export * from './Callout'
export * from './Checkbox'
export * from './ContextualMenu'
export * from './Icon'
export * from './Keytip'
export * from './Label'
export * from './Layer'
export * from './Panel'

export * from './Positioning'
export * from './SelectableOption'
export * from './Styling'
export * from './Utilities'

export * from '@uifabric-vue/utilities'
// @ts-ignore
export * from './utilities/positioning'

export * from './common/DirectionalHint'

export * from './components'
export {
  Fabric,
  Components as FabricComponents,
}
export { initializeIcons } from '@uifabric/icons'
export type { IIconSubset } from './registerIcons'
export { registerIcons } from './registerIcons'

export { loadTheme } from './plugin/loadTheme'
export type { IPartialTheme, IOptions } from './plugin/office-fabric'

export default Fabric
