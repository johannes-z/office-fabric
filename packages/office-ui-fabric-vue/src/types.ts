import 'vue-tsx-support/enable-check'

import Fabric from './plugin/office-fabric'

export * from '@uifabric-vue/utilities'
// @ts-ignore
export * from './utilities/positioning'

export * from './common/DirectionalHint'

export * from './components'
export {
  Fabric,
}
export { loadTheme } from './plugin/office-fabric'
export { initializeIcons } from '@uifabric/icons'
export * from './registerIcons'

export type { IPartialTheme, IOptions } from './plugin/office-fabric'

export default Fabric
