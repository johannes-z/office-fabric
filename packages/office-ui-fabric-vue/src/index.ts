import Fabric from './plugin/office-fabric'
import * as Components from './components'

console.log(Components)

export * from './utilities/positioning'
export * from './components'
export {
  Fabric,
  Components as FabricComponents,
}
export { loadTheme } from './plugin/office-fabric'
export { initializeIcons } from '@uifabric/icons'

export default Fabric
