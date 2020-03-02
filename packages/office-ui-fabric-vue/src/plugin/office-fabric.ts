import Vue, { VueConstructor } from 'vue'
import * as Components from '../components'
import { IPartialTheme, ITheme, createTheme, loadTheme as baseLoadTheme } from '@uifabric/styling'
import { registerCSSVars } from './registerCSSVars'
import { toKebabCase } from '../utilities'

export * from '../components'

export function loadTheme (theme: IPartialTheme, useCSSVars: boolean = false): ITheme {
  let _theme = createTheme(theme)

  if (useCSSVars) {
    let { palette, semanticColors } = _theme
    // generate new css vars
    palette = registerCSSVars('palette', palette)
    semanticColors = registerCSSVars('semanticColors', semanticColors)

    // update theme
    baseLoadTheme({
      palette,
      semanticColors,
    })
  }

  return _theme
}

export default function install (Vue: any, theme: IPartialTheme = {}, useCSSVars: boolean = false) {
  for (const _ in Components) {
    const Component: VueConstructor<Vue> = (Components as any)[_]
    // if (Component.toString().indexOf('VueComponent') === -1) continue
    const name: string = `f-${toKebabCase(_)}`
    try {
      Vue.component(name, Component)
    } catch (error) {
    }
  }

  loadTheme(theme, useCSSVars)
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
