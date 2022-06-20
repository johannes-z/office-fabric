import { Palette, SemanticColors } from '@fluentui-vue/theme'
import { memoizeFunction } from '@fluentui-vue/utilities'
import { concatStyleSets } from '@fluentui/merge-styles'
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles'
import { HighContrastSelector } from '@fluentui-vue/style-utilities'

export const getStyles = memoizeFunction(
  (customStyles?: IButtonStyles): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles()
    // const splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme)
    const iconButtonStyles: IButtonStyles = {
      root: {
        padding: '0 4px',
        width: '32px',
        height: '32px',
        backgroundColor: 'transparent',
        border: 'none',
        color: SemanticColors.link,
      },

      rootHovered: {
        color: Palette.themeDarkAlt,
        backgroundColor: Palette.neutralLighter,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Highlight',
            color: 'Highlight',
          },
        },
      },

      rootHasMenu: {
        width: 'auto',
      },

      rootPressed: {
        color: Palette.themeDark,
        backgroundColor: Palette.neutralLight,
      },

      rootExpanded: {
        color: Palette.themeDark,
        backgroundColor: Palette.neutralLight,
      },

      rootChecked: {
        color: Palette.themeDark,
        backgroundColor: Palette.neutralLight,
      },

      rootCheckedHovered: {
        color: Palette.themeDark,
        backgroundColor: Palette.neutralQuaternaryAlt,
      },

      rootDisabled: {
        color: Palette.neutralTertiaryAlt,
      },
    }

    return concatStyleSets(baseButtonStyles, iconButtonStyles, /* splitButtonStyles, */ customStyles)!
  },
)
