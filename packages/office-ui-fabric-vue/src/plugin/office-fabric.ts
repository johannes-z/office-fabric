import * as Components from '../components'
import { IPartialTheme } from '@uifabric/styling'
import { toKebabCase } from '../utilities'
import { loadTheme } from './loadTheme'

export type { IPartialTheme } from '@uifabric/styling'

export interface IOptions {
  useCSSVars: boolean
  prefix?: string
}

export default function install (Vue: any, options: Partial<IOptions> = {}, theme: IPartialTheme = {}) {
  for (const componentName in Components) {
    const Component: any = (Components as any)[componentName]
    if (Component && Component.prototype instanceof Vue) {
      const name: string = `${options.prefix || 'f'}-${toKebabCase(componentName)}`
      Vue.component(name, Component)
    }
  }

  loadTheme(theme, options.useCSSVars)
}

/*

============================
    CSS Vars
--neutralLight: #eaeaea;
--bodyFrameBackground: var(--neutralLight)

{
  neutralLight: 'var(--neutralLight)'
}
{
  bodyFrameBackground: 'var(--neutralLight)'
}

======================================
    No CSS Vars
{
  neutralLight: '#eaeaea'
}
{
  bodyFrameBackground: '#eaeaea'
}

 */
