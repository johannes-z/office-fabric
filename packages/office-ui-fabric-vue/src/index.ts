import Fabric from './plugin/office-fabric'
import * as Components from './components'

export * from '@uifabric-vue/utilities'
// @ts-ignore
export * from './utilities/positioning'

export * from './common/DirectionalHint'

export * from './components'
export {
  Fabric,
  Components as FabricComponents,
}
export { loadTheme } from './plugin/office-fabric'
export { initializeIcons } from '@uifabric/icons'

export type { IPartialTheme, IOptions } from './plugin/office-fabric'

export default Fabric
