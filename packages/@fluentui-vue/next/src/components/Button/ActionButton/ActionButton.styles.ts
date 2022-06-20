import { Palette } from '@fluentui-vue/theme'
import { memoizeFunction } from '@fluentui-vue/utilities'
import { concatStyleSets } from '@fluentui/merge-styles'
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles'
import { HighContrastSelector } from '@fluentui-vue/style-utilities'

const DEFAULT_BUTTON_HEIGHT = '40px'
const DEFAULT_PADDING = '0 4px'

export const getStyles = memoizeFunction(
  (customStyles?: any): any => {
    const baseButtonStyles: any = getBaseButtonStyles()
    const actionButtonStyles: any = {
      root: {
        padding: DEFAULT_PADDING,
        height: DEFAULT_BUTTON_HEIGHT,
        color: Palette.neutralPrimary,
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window',
          },
        },
      },

      rootHovered: {
        color: Palette.themePrimary,
        selectors: {
          [HighContrastSelector]: {
            color: 'Highlight',
          },
        },
      },

      iconHovered: {
        color: Palette.themePrimary,
      },

      rootPressed: {
        color: Palette.black,
      },

      rootExpanded: {
        color: Palette.themePrimary,
      },

      iconPressed: {
        color: Palette.themeDarker,
      },

      rootDisabled: {
        color: Palette.neutralTertiary,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
          },
        },
      },

      rootChecked: {
        color: Palette.black,
      },

      iconChecked: {
        color: Palette.themeDarker,
      },

      flexContainer: {
        justifyContent: 'flex-start',
      },

      icon: {
        color: Palette.themeDarkAlt,
      },

      iconDisabled: {
        color: 'inherit',
      },

      menuIcon: {
        color: Palette.neutralSecondary,
      },

      textContainer: {
        flexGrow: 0,
      },
    }

    return concatStyleSets(baseButtonStyles, actionButtonStyles, customStyles)!
  },
)
