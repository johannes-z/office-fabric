import * as Components from '../components'
import { IPartialTheme } from '@uifabric/styling'
import { toKebabCase } from '../utils'

export type { IPartialTheme } from '@uifabric/styling'
export interface IOptions {
  prefix?: string
}

export default function install (Vue: any, theme: IPartialTheme = {}, options: Partial<IOptions> = {}) {
  for (const componentName in Components) {
    const Component: any = (Components as any)[componentName]
    if (Component && Component.prototype instanceof Vue) {
      const name: string = `${options.prefix || 'f'}-${toKebabCase(componentName)}`
      Vue.component(name, Component)
    }
  }
}
