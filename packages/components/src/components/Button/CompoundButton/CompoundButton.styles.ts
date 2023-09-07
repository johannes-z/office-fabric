import { HighContrastSelector, getHighContrastNoAdjustStyle } from '@fluentui-vue/style-utilities'
import { memoizeFunction } from '@fluentui-vue/utilities'
import { DefaultFontStyles, FontWeights, type ITheme, Palette } from '@fluentui-vue/theme'
import { concatStyleSets } from '@fluentui/merge-styles'
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles'
import { primaryStyles, standardStyles } from '../ButtonThemes'
import type { IButtonStyles } from '../Button.types'

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles, primary?: boolean): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme)
    // const splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme)
    const compoundButtonStyles: IButtonStyles = {
      root: {
        maxWidth: '280px',
        minHeight: '72px',
        height: 'auto',
        padding: '16px 12px',
      },

      flexContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        minWidth: '100%',
        margin: '',
      },

      textContainer: {
        textAlign: 'left',
      },

      icon: {
        fontSize: '2em',
        lineHeight: '1em',
        height: '1em',
        margin: '0px 8px 0px 0px',
        flexBasis: '1em',
        flexShrink: '0',
      },

      label: {
        margin: '0 0 5px',
        lineHeight: '100%',
        fontWeight: FontWeights.semibold,
      },
      description: [
        DefaultFontStyles.small,
        {
          lineHeight: '100%',
        },
      ],
    }

    const standardCompoundTheme: IButtonStyles = {
      description: {
        color: Palette.neutralSecondary,
      },

      descriptionHovered: {
        color: Palette.neutralDark,
      },

      descriptionPressed: {
        color: 'inherit',
      },

      descriptionChecked: {
        color: 'inherit',
      },

      descriptionDisabled: {
        color: 'inherit',
      },
    }

    const primaryCompoundTheme: IButtonStyles = {
      description: {
        color: Palette.white,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText',
            color: 'Window',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },

      descriptionHovered: {
        color: Palette.white,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Highlight',
            color: 'Window',
          },
        },
      },

      descriptionPressed: {
        color: 'inherit',

        selectors: {
          [HighContrastSelector]: {
            color: 'Window',
            backgroundColor: 'WindowText',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },

      descriptionChecked: {
        color: 'inherit',

        selectors: {
          [HighContrastSelector]: {
            color: 'Window',
            backgroundColor: 'WindowText',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },

      descriptionDisabled: {
        color: 'inherit',
        selectors: {
          [HighContrastSelector]: {
            color: 'inherit',
          },
        },
      },
    }

    return concatStyleSets(
      baseButtonStyles,
      compoundButtonStyles,
      primary ? primaryStyles() : standardStyles(),
      primary ? primaryCompoundTheme : standardCompoundTheme,
      // splitButtonStyles,
      customStyles,
    )!
  },
)
