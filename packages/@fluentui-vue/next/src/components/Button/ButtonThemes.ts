import { HighContrastSelector, getHighContrastNoAdjustStyle } from '@fluentui-vue/style-utilities'
import { IsFocusVisibleClassName } from '@fluentui-vue/utilities'
import { Palette, SemanticColors } from '@fluentui-vue/theme'
import type { IRawStyle } from '@fluentui/merge-styles'

function splitButtonDividerBaseStyles(): IRawStyle {
  return {
    position: 'absolute',
    width: 1,
    right: 31,
    top: 8,
    bottom: 8,
  }
}

export function standardStyles(): IButtonStyles {
  const buttonBackground = SemanticColors.buttonBackground
  const buttonBackgroundPressed = SemanticColors.buttonBackgroundPressed
  const buttonBackgroundHovered = SemanticColors.buttonBackgroundHovered
  const buttonBackgroundDisabled = SemanticColors.buttonBackgroundDisabled

  const buttonText = SemanticColors.buttonText
  const buttonTextHovered = SemanticColors.buttonTextHovered
  const buttonTextDisabled = SemanticColors.buttonTextDisabled
  const buttonTextChecked = SemanticColors.buttonTextChecked
  const buttonTextCheckedHovered = SemanticColors.buttonTextCheckedHovered

  return {
    root: {
      backgroundColor: buttonBackground,
      color: buttonText,
    },

    rootHovered: {
      backgroundColor: buttonBackgroundHovered,
      color: buttonTextHovered,
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'Highlight',
          color: 'Highlight',
        },
      },
    },

    rootPressed: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked,
    },

    rootExpanded: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked,
    },

    rootChecked: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked,
    },

    rootCheckedHovered: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextCheckedHovered,
    },

    rootDisabled: {
      color: buttonTextDisabled,
      backgroundColor: buttonBackgroundDisabled,
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window',
        },
      },
    },

    // Split button styles
    splitButtonContainer: {
      selectors: {
        [HighContrastSelector]: {
          border: 'none',
        },
      },
    },

    splitButtonMenuButton: {
      color: Palette.white,
      backgroundColor: 'transparent',
      selectors: {
        ':hover': {
          backgroundColor: Palette.neutralLight,
          selectors: {
            [HighContrastSelector]: {
              color: 'Highlight',
            },
          },
        },
      },
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: SemanticColors.buttonBackgroundDisabled,
      selectors: {
        ':hover': {
          backgroundColor: SemanticColors.buttonBackgroundDisabled,
        },
      },
    },

    splitButtonDivider: {
      ...splitButtonDividerBaseStyles(),
      backgroundColor: Palette.neutralTertiaryAlt,
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'WindowText',
        },
      },
    },

    splitButtonDividerDisabled: {
      backgroundColor: Palette.neutralTertiaryAlt,
    },

    splitButtonMenuButtonChecked: {
      backgroundColor: Palette.neutralQuaternaryAlt,
      selectors: {
        ':hover': {
          backgroundColor: Palette.neutralQuaternaryAlt,
        },
      },
    },

    splitButtonMenuButtonExpanded: {
      backgroundColor: Palette.neutralQuaternaryAlt,
      selectors: {
        ':hover': {
          backgroundColor: Palette.neutralQuaternaryAlt,
        },
      },
    },

    splitButtonMenuIcon: {
      color: SemanticColors.buttonText,
    },

    splitButtonMenuIconDisabled: {
      color: SemanticColors.buttonTextDisabled,
    },
  }
}

export function primaryStyles(): IButtonStyles {
  return {
    root: {
      backgroundColor: SemanticColors.primaryButtonBackground,
      border: `1px solid ${SemanticColors.primaryButtonBackground}`,
      color: SemanticColors.primaryButtonText,
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'WindowText',
          borderColor: 'WindowText',
          ...getHighContrastNoAdjustStyle(),
        },
        [`.${IsFocusVisibleClassName} &:focus`]: {
          selectors: {
            ':after': {
              border: 'none',
              outlineColor: Palette.white,
            },
          },
        },
      },
    },

    rootHovered: {
      backgroundColor: SemanticColors.primaryButtonBackgroundHovered,
      border: `1px solid ${SemanticColors.primaryButtonBackgroundHovered}`,
      color: SemanticColors.primaryButtonTextHovered,
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'Highlight',
          borderColor: 'Highlight',
        },
      },
    },

    rootPressed: {
      backgroundColor: SemanticColors.primaryButtonBackgroundPressed,
      border: `1px solid ${SemanticColors.primaryButtonBackgroundPressed}`,
      color: SemanticColors.primaryButtonTextPressed,
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'WindowText',
          borderColor: 'WindowText',
          ...getHighContrastNoAdjustStyle(),
        },
      },
    },

    rootExpanded: {
      backgroundColor: SemanticColors.primaryButtonBackgroundPressed,
      color: SemanticColors.primaryButtonTextPressed,
    },

    rootChecked: {
      backgroundColor: SemanticColors.primaryButtonBackgroundPressed,
      color: SemanticColors.primaryButtonTextPressed,
    },

    rootCheckedHovered: {
      backgroundColor: SemanticColors.primaryButtonBackgroundPressed,
      color: SemanticColors.primaryButtonTextPressed,
    },

    rootDisabled: {
      color: SemanticColors.primaryButtonTextDisabled,
      backgroundColor: SemanticColors.primaryButtonBackgroundDisabled,
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window',
        },
      },
    },

    // Split button styles
    splitButtonContainer: {
      selectors: {
        [HighContrastSelector]: {
          border: 'none',
        },
      },
    },

    splitButtonDivider: {
      ...splitButtonDividerBaseStyles(),
      backgroundColor: Palette.white,
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Window',
        },
      },
    },

    splitButtonMenuButton: {
      backgroundColor: SemanticColors.primaryButtonBackground,
      color: SemanticColors.primaryButtonText,
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'WindowText',
        },
        ':hover': {
          backgroundColor: SemanticColors.primaryButtonBackgroundHovered,
          selectors: {
            [HighContrastSelector]: {
              color: 'Highlight',
            },
          },
        },
      },
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: SemanticColors.primaryButtonBackgroundDisabled,
      selectors: {
        ':hover': {
          backgroundColor: SemanticColors.primaryButtonBackgroundDisabled,
        },
      },
    },

    splitButtonMenuButtonChecked: {
      backgroundColor: SemanticColors.primaryButtonBackgroundPressed,
      selectors: {
        ':hover': {
          backgroundColor: SemanticColors.primaryButtonBackgroundPressed,
        },
      },
    },

    splitButtonMenuButtonExpanded: {
      backgroundColor: SemanticColors.primaryButtonBackgroundPressed,
      selectors: {
        ':hover': {
          backgroundColor: SemanticColors.primaryButtonBackgroundPressed,
        },
      },
    },

    splitButtonMenuIcon: {
      color: SemanticColors.primaryButtonText,
    },

    splitButtonMenuIconDisabled: {
      color: Palette.neutralTertiary,

      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
        },
      },
    },
  }
}
