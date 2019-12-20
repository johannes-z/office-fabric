import Vue, { VueConstructor } from 'vue'
import * as Components from '@/components/'
import { IPartialTheme, ITheme, createTheme, loadTheme as baseLoadTheme } from '@uifabric-vue/styling'
import { registerCSSVars } from './registerCSSVars'
import { toKebabCase } from '@/util'

export * from '@/components'

export function loadTheme (theme: IPartialTheme, useCSSVars: boolean = false): ITheme {
  // get latest theme
  let _theme = baseLoadTheme(theme)

  if (useCSSVars) {
    let { palette, semanticColors } = _theme
    // generate new css vars
    palette = registerCSSVars('palette', palette)
    semanticColors = registerCSSVars('semanticColors', semanticColors)
    // update theme
    _theme = baseLoadTheme({
      ...theme,
      palette,
      semanticColors,
    })
  }

  return _theme
}

export default function install (Vue: any, theme: IPartialTheme = {}, useCSSVars: boolean = false) {
  for (const _ in Components) {
    const Component: VueConstructor<Vue> = (Components as any)[_]
    if (Component.toString().indexOf('VueComponent') === -1) continue
    const name: string = `o-${toKebabCase(_)}`
    Vue.component(name, Component)
  }

  let _theme = createTheme(theme)
  _theme = loadTheme(theme, useCSSVars)
  Vue.prototype.$fabricTheme = _theme
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
