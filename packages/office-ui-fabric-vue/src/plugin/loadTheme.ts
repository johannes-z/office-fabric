import { IPartialTheme, ITheme, createTheme, loadTheme as baseLoadTheme } from '@uifabric/styling'
import { registerCSSVars } from './registerCSSVars'

export function loadTheme (theme?: IPartialTheme): ITheme {
  const _theme = createTheme(theme)

  let { palette, semanticColors } = _theme
  // generate new css vars
  palette = registerCSSVars('palette', palette)
  semanticColors = registerCSSVars('semanticColors', semanticColors)

  // update theme
  return baseLoadTheme({
    palette,
    semanticColors,
  })
}
