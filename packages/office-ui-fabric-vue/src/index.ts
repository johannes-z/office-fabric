import './version'

import Fabric from './plugin/office-fabric'
import * as Components from './components'

export * from './components'
export * from './components/ThemeProvider'

export * from './Styling'
export * from './FabricUtilities'

export * from './utilities/selectableOption'
export * from './utilities/positioning'

export * from './common/DirectionalHint'

export {
  Fabric,
  Components as FabricComponents,
}
export { initializeIcons } from '@uifabric/icons'
export type { IIconSubset } from './plugin/registerIcons'
export { registerIcons } from './plugin/registerIcons'

export type { IPartialTheme, IOptions } from './plugin/office-fabric'
export { loadTheme } from './plugin/loadTheme'

export default Fabric
