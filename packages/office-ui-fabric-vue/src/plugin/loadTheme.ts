import { IPartialTheme, ITheme, createTheme, loadTheme as baseLoadTheme } from '@uifabric/styling'
import { registerCSSVars } from './registerCSSVars'

export function loadTheme (theme: IPartialTheme, useCSSVars: boolean = false): ITheme {
  const _theme = createTheme(theme)

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
