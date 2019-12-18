import { ITheme, IPartialTheme, IFontStyles, IPalette, ISemanticColors } from '..'
import { DefaultPalette, DefaultEffects, DefaultFontStyles, DefaultSpacing } from '.'
import { merge } from '@uifabric-vue/utilities'

let _theme: ITheme = createTheme({
  palette: DefaultPalette,
  effects: DefaultEffects,
  fonts: DefaultFontStyles,
  semanticColors: _makeSemanticColorsFromPalette(DefaultPalette, false, false),
  isInverted: false,
  disableGlobalClassNames: false,
})

export {
  _theme as defaultTheme,
}

/**
 * Gets the theme object
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function getTheme (depComments: boolean = false): ITheme {
  if (depComments === true) {
    _theme = createTheme({}, depComments)
  }
  return _theme
}

export function loadTheme (theme: IPartialTheme, depComments: boolean = false): ITheme {
  _theme = createTheme(theme, depComments)

  return _theme
}

function _loadFonts (theme: ITheme): { [name: string]: string } {
  const lines = {}

  for (const fontName of Object.keys(theme.fonts)) {
    const font = theme.fonts[fontName]
    for (const propName of Object.keys(font)) {
      const name = fontName + propName.charAt(0).toUpperCase() + propName.slice(1)
      let value = font[propName]
      if (propName === 'fontSize' && typeof value === 'number') {
        // if it's a number, convert it to px by default like our theming system does
        value = value + 'px'
      }
      lines[name] = value
    }
  }
  return lines
}

export function createTheme (theme: IPartialTheme, depComments: boolean = false): ITheme {
  let newPalette = { ...DefaultPalette, ...theme.palette }

  if (!theme.palette || !theme.palette.accent) {
    newPalette.accent = newPalette.themePrimary
  }

  // mix in custom overrides with good slots first, since custom overrides might be used in fixing deprecated slots
  let newSemanticColors = {
    ..._makeSemanticColorsFromPalette(newPalette, !!theme.isInverted, depComments),
    ...theme.semanticColors,
  }

  let defaultFontStyles: IFontStyles = { ...DefaultFontStyles }

  if (theme.defaultFontStyle) {
    for (const fontStyle of Object.keys(defaultFontStyles)) {
      defaultFontStyles[fontStyle] = merge({}, defaultFontStyles[fontStyle], theme.defaultFontStyle)
    }
  }

  if (theme.fonts) {
    for (const fontStyle of Object.keys(theme.fonts)) {
      defaultFontStyles[fontStyle] = merge({}, defaultFontStyles[fontStyle], theme.fonts[fontStyle])
    }
  }

  return {
    palette: newPalette,
    fonts: {
      ...defaultFontStyles,
    },
    semanticColors: newSemanticColors,
    isInverted: !!theme.isInverted,
    disableGlobalClassNames: !!theme.disableGlobalClassNames,
    spacing: {
      ...DefaultSpacing,
      ...theme.spacing,
    },
    effects: {
      ...DefaultEffects,
      ...theme.effects,
    },
  }
}

// Generates all the semantic slot colors based on the Fabric palette.
// We'll use these as fallbacks for semantic slots that the passed in theme did not define.
function _makeSemanticColorsFromPalette (p: IPalette, isInverted: boolean, depComments: boolean): ISemanticColors {
  let toReturn: ISemanticColors = {
    // DEFAULTS
    bodyBackground: p.white,
    bodyBackgroundHovered: p.neutralLighter,
    bodyBackgroundChecked: p.neutralLight,
    bodyStandoutBackground: p.neutralLighterAlt,
    bodyFrameBackground: p.white,
    bodyFrameDivider: p.neutralLight,
    bodyText: p.neutralPrimary,
    bodyTextChecked: p.black,
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralLight,
    disabledBodyText: p.neutralTertiary,
    disabledBodySubtext: p.neutralTertiaryAlt,
    disabledBorder: p.neutralTertiaryAlt,
    focusBorder: p.neutralSecondary,
    variantBorder: p.neutralLight,
    variantBorderHovered: p.neutralTertiary,
    defaultStateBackground: p.neutralLighterAlt,

    // LINKS
    actionLink: p.neutralPrimary,
    actionLinkHovered: p.neutralDark,
    link: p.themePrimary,
    linkHovered: p.themeDarker,

    // BUTTONS
    buttonBackground: p.white,
    buttonBackgroundChecked: p.neutralTertiaryAlt,
    buttonBackgroundHovered: p.neutralLighter,
    buttonBackgroundCheckedHovered: p.neutralLight,
    buttonBackgroundPressed: p.neutralLight,
    buttonBackgroundDisabled: p.neutralLighter,
    buttonBorder: p.neutralSecondaryAlt,
    buttonText: p.neutralPrimary,
    buttonTextHovered: p.neutralDark,
    buttonTextChecked: p.neutralDark,
    buttonTextCheckedHovered: p.black,
    buttonTextPressed: p.neutralDark,
    buttonTextDisabled: p.neutralTertiary,
    buttonBorderDisabled: p.neutralLighter,

    primaryButtonBackground: p.themePrimary,
    primaryButtonBackgroundHovered: p.themeDarkAlt,
    primaryButtonBackgroundPressed: p.themeDark,
    primaryButtonBackgroundDisabled: p.neutralLighter,
    primaryButtonBorder: 'transparent',
    primaryButtonText: p.white,
    primaryButtonTextHovered: p.white,
    primaryButtonTextPressed: p.white,
    primaryButtonTextDisabled: p.neutralQuaternary,

    accentButtonBackground: p.accent,
    accentButtonText: p.white,

    // INPUTS
    inputBorder: p.neutralSecondaryAlt,
    inputBorderHovered: p.neutralPrimary,
    inputBackground: p.white,
    inputBackgroundChecked: p.themePrimary,
    inputBackgroundCheckedHovered: p.themeDark,
    inputPlaceholderBackgroundChecked: p.themeLighter,
    inputForegroundChecked: p.white,
    inputIcon: p.themePrimary,
    inputIconHovered: p.themeDark,
    inputIconDisabled: p.neutralTertiary,
    inputFocusBorderAlt: p.themePrimary,
    smallInputBorder: p.neutralSecondary,
    inputText: p.neutralPrimary,
    inputTextHovered: p.neutralDark,
    inputPlaceholderText: p.neutralSecondary,
    disabledBackground: p.neutralLighter,
    disabledText: p.neutralTertiary,
    disabledSubtext: p.neutralQuaternary,

    // LISTS
    listBackground: p.white,
    listText: p.neutralPrimary,
    listItemBackgroundHovered: p.neutralLighter,
    listItemBackgroundChecked: p.neutralLight,
    listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt,

    listHeaderBackgroundHovered: p.neutralLighter,
    listHeaderBackgroundPressed: p.neutralLight,

    // MENUS
    menuBackground: p.white,
    menuDivider: p.neutralTertiaryAlt,
    menuIcon: p.themePrimary,
    menuHeader: p.themePrimary,
    menuItemBackgroundHovered: p.neutralLighter,
    menuItemBackgroundPressed: p.neutralLight,
    menuItemText: p.neutralPrimary,
    menuItemTextHovered: p.neutralDark,

    errorText: !isInverted ? p.redDark : '#ff5f5f',
    warningText: !isInverted ? '#333333' : '#ffffff',
    successText: !isInverted ? '#107C10' : '#92c353',
    errorBackground: !isInverted ? 'rgba(245, 135, 145, .2)' : 'rgba(232, 17, 35, .5)',
    blockingBackground: !isInverted ? 'rgba(250, 65, 0, .2)' : 'rgba(234, 67, 0, .5)',
    warningBackground: !isInverted ? 'rgba(255, 200, 10, .2)' : 'rgba(255, 251, 0, .6)',
    warningHighlight: !isInverted ? '#ffb900' : '#fff100',
    successBackground: !isInverted ? 'rgba(95, 210, 85, .2)' : 'rgba(186, 216, 10, .4)',

    // Deprecated slots, second pass by _fixDeprecatedSlots() later for self-referential slots
    listTextColor: '',
    menuItemBackgroundChecked: p.neutralLight,
  }

  return _fixDeprecatedSlots(toReturn, depComments!)
}

function _fixDeprecatedSlots (s: ISemanticColors, depComments: boolean): ISemanticColors {
  // Add @deprecated tag as comment if enabled
  let dep = ''
  if (depComments === true) {
    dep = ' /* @deprecated */'
  }

  s.listTextColor = s.listText + dep
  s.menuItemBackgroundChecked += dep
  return s
}
