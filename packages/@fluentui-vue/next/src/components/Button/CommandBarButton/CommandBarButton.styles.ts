import { getFocusStyle, getHighContrastNoAdjustStyle, HighContrastSelector } from '@/style-utilities/styles'
import { memoizeFunction } from '@fluentui-vue/utilities'
import { DefaultFontStyles, Palette, SemanticColors } from '@fluentui-vue/theme'
import { concatStyleSets } from '@fluentui/merge-styles'
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles'
import { ButtonGlobalClassNames } from '../Button.classNames'
import { primaryStyles, standardStyles } from '../ButtonThemes'

export const getStyles = memoizeFunction(
  (customStyles?: IButtonStyles, focusInset?: string, focusColor?: string): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles()
    // const baseSplitButtonStyles: IButtonStyles = getSplitButtonStyles()

    const commandButtonHighContrastFocus = {
      left: 4,
      top: 4,
      bottom: 4,
      right: 4,
      border: 'none',
    }

    const commandButtonStyles: IButtonStyles = {
      root: [
        // getFocusStyle(null, {
        //   inset: 2,
        //   highContrastStyle: commandButtonHighContrastFocus,
        //   borderColor: 'transparent',
        // }),
        DefaultFontStyles.medium,
        {
          minWidth: '40px',
          backgroundColor: Palette.white,
          color: Palette.neutralPrimary,
          padding: '0 4px',
          border: 'none',
          borderRadius: 0,
          selectors: {
            [HighContrastSelector]: {
              border: 'none',
            },
          },
        },
      ],

      rootHovered: {
        backgroundColor: Palette.neutralLighter,
        color: Palette.neutralDark,
        selectors: {
          [HighContrastSelector]: {
            color: 'Highlight',
          },
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: Palette.themeDarkAlt,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: Palette.neutralPrimary,
          },
        },
      },

      rootPressed: {
        backgroundColor: Palette.neutralLight,
        color: Palette.neutralDark,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: Palette.themeDark,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: Palette.neutralPrimary,
          },
        },
      },

      rootChecked: {
        backgroundColor: Palette.neutralLight,
        color: Palette.neutralDark,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: Palette.themeDark,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: Palette.neutralPrimary,
          },
        },
      },

      rootCheckedHovered: {
        backgroundColor: Palette.neutralQuaternaryAlt,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: Palette.themeDark,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: Palette.neutralPrimary,
          },
        },
      },

      rootExpanded: {
        backgroundColor: Palette.neutralLight,
        color: Palette.neutralDark,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: Palette.themeDark,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: Palette.neutralPrimary,
          },
        },
      },

      rootExpandedHovered: {
        backgroundColor: Palette.neutralQuaternaryAlt,
      },

      rootDisabled: {
        backgroundColor: Palette.white,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: SemanticColors.disabledBodySubtext,
            selectors: {
              [HighContrastSelector]: {
                color: 'GrayText',
                ...getHighContrastNoAdjustStyle(),
              },
            },
          },
          [HighContrastSelector]: {
            color: 'GrayText',
            backgroundColor: 'Window',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },

      // Split button styles
      splitButtonContainer: {
        height: '100%',
        selectors: {
          [HighContrastSelector]: {
            border: 'none',
          },
        },
      },

      splitButtonDividerDisabled: {
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Window',
          },
        },
      },

      splitButtonDivider: {
        backgroundColor: Palette.neutralTertiaryAlt,
      },

      splitButtonMenuButton: {
        backgroundColor: Palette.white,
        border: 'none',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        color: Palette.neutralSecondary,
        selectors: {
          ':hover': {
            backgroundColor: Palette.neutralLighter,
            color: Palette.neutralDark,
            selectors: {
              [HighContrastSelector]: {
                color: 'Highlight',
              },
              [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
                color: Palette.neutralPrimary,
              },
            },
          },
          ':active': {
            backgroundColor: Palette.neutralLight,
            selectors: {
              [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
                color: Palette.neutralPrimary,
              },
            },
          },
        },
      },

      splitButtonMenuButtonDisabled: {
        backgroundColor: Palette.white,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            border: 'none',
            backgroundColor: 'Window',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },

      splitButtonMenuButtonChecked: {
        backgroundColor: Palette.neutralLight,
        color: Palette.neutralDark,
        selectors: {
          ':hover': {
            backgroundColor: Palette.neutralQuaternaryAlt,
          },
        },
      },

      splitButtonMenuButtonExpanded: {
        backgroundColor: Palette.neutralLight,
        color: Palette.black,
        selectors: {
          ':hover': {
            backgroundColor: Palette.neutralQuaternaryAlt,
          },
        },
      },

      splitButtonMenuIcon: {
        color: Palette.neutralPrimary,
      },

      splitButtonMenuIconDisabled: {
        color: Palette.neutralTertiary,
      },

      label: {
        fontWeight: 'normal', // theme.fontWeights.semibold,
      },

      icon: {
        color: Palette.themePrimary,
      },

      menuIcon: {
        color: Palette.neutralSecondary,
        [HighContrastSelector]: {
          color: 'GrayText',
        },
      },
    }

    return concatStyleSets(baseButtonStyles, /* baseSplitButtonStyles, */ commandButtonStyles, customStyles)!
  },
)
