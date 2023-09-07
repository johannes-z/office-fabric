import type { IFontStyles, IPartialTheme, ITheme } from '@fluentui-vue/theme'
import { createTheme } from '@fluentui-vue/theme'
import type { IRawStyle } from '@fluentui/merge-styles'
import { loadTheme as legacyLoadTheme } from '@microsoft/load-themed-styles'

export { createTheme } from '@fluentui-vue/theme'

let _theme: ITheme = createTheme({})
const _onThemeChangeCallbacks: Array<(theme: ITheme) => void> = []

/**
 * Gets the theme object
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function getTheme(depComments = false): ITheme {
  if (depComments === true)
    _theme = createTheme({}, depComments)

  return _theme
}

/**
 * Registers a callback that gets called whenever the theme changes.
 * This should only be used when the component cannot automatically get theme changes through its state.
 * This will not register duplicate callbacks.
 */
export function registerOnThemeChangeCallback(callback: (theme: ITheme) => void): void {
  if (!_onThemeChangeCallbacks.includes(callback))
    _onThemeChangeCallbacks.push(callback)
}

/**
 * See registerOnThemeChangeCallback().
 * Removes previously registered callbacks.
 */
export function removeOnThemeChangeCallback(callback: (theme: ITheme) => void): void {
  const i = _onThemeChangeCallbacks.indexOf(callback)
  if (i === -1)
    return

  _onThemeChangeCallbacks.splice(i, 1)
}

/**
 * Applies the theme, while filling in missing slots.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function loadTheme(theme: IPartialTheme, depComments = false): ITheme {
  _theme = createTheme(theme, depComments)

  // Invoke the legacy method of theming the page as well.
  legacyLoadTheme({ ..._theme.palette, ..._theme.semanticColors, ..._theme.effects, ..._loadFonts(_theme) })

  _onThemeChangeCallbacks.forEach((callback: (theme: ITheme) => void) => {
    try {
      callback(_theme)
    }
    catch (e) {
      // don't let a bad callback break everything else
    }
  })

  return _theme
}

/**
 * Loads font variables into a JSON object.
 * @param theme - The theme object
 */
function _loadFonts(theme: ITheme): { [name: string]: string } {
  const lines: { [key: string]: string } = {}

  for (const fontName of Object.keys(theme.fonts)) {
    const font: IRawStyle = theme.fonts[fontName as keyof IFontStyles]

    for (const propName of Object.keys(font)) {
      const name: string = fontName + propName.charAt(0).toUpperCase() + propName.slice(1)
      let value = font[propName as keyof IRawStyle] as string

      if (propName === 'fontSize' && typeof value === 'number') {
        // if it's a number, convert it to px by default like our theming system does
        value = `${value}px`
      }
      lines[name] = value
    }
  }
  return lines
}
