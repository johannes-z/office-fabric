import Vue, { VueConstructor } from 'vue'
import * as Components from '../components'
import { IPartialTheme, ITheme, createTheme, loadTheme as baseLoadTheme } from '@uifabric/styling'
import { registerCSSVars } from './registerCSSVars'
import { toKebabCase } from '../utilities'

export type { IPartialTheme } from '@uifabric/styling'
export interface IOptions {
  prefix?: string
}

export function loadTheme (theme: IPartialTheme): ITheme {
  // eslint-disable-next-line prefer-const
  let _theme = createTheme(theme)

  let { palette, semanticColors } = _theme
  // generate new css vars
  palette = registerCSSVars('palette', palette)
  semanticColors = registerCSSVars('semanticColors', semanticColors)

  // update theme
  baseLoadTheme({
    palette,
    semanticColors,
  })

  return _theme
}

export default function install (Vue: any, theme: IPartialTheme = {}, options: Partial<IOptions> = {}) {
  for (const componentName in Components) {
    const Component: any = (Components as any)[componentName]
    if (Component && Component.prototype instanceof Vue) {
      const name: string = `${options.prefix || 'f'}-${toKebabCase(componentName)}`
      Vue.component(name, Component)
    }
  }

  loadTheme(theme)
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
