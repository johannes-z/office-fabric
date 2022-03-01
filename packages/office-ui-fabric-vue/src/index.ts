// import './version'

import Fabric from './plugin/office-fabric'
import * as Components from './components'

export * from './components'
export * from './components/ThemeProvider'

export * from '@uifabric-vue/utilities'

export * from './utilities'

export * from './common/DirectionalHint'

export { initializeIcons } from '@uifabric/icons'
// export type { IIconSubset } from './plugin/registerIcons'
// export { registerIcons } from './plugin/registerIcons'

// eslint-disable-next-line import/export
export * from '@uifabric/styling'
// eslint-disable-next-line import/export
export { loadTheme } from './plugin/loadTheme'
export type { IPartialTheme, IOptions } from './plugin/office-fabric'

export {
  Fabric,
  Components as FabricComponents,
}
export default Fabric
