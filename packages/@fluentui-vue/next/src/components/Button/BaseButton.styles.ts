import { getFocusStyle } from '@/style-utilities/getFocusStyle'
import { SemanticColors, DefaultEffects, DefaultFontStyles } from '@fluentui-vue/theme'
import { memoizeFunction } from '@fluentui-vue/utilities'
import { IRawStyle } from '@fluentui/merge-styles'
import { hiddenContentStyle, HighContrastSelector } from '@/style-utilities/styles'

const noOutline: IRawStyle = {
  outline: 0,
}

const iconStyle = (fontSize?: string | number): IRawStyle => {
  return {
    fontSize: fontSize,
    margin: '0 4px',
    height: '16px',
    lineHeight: '16px',
    textAlign: 'center',
    flexShrink: 0,
  }
}

/**
 * Gets the base button styles. Note: because it is a base class to be used with the `mergeRules`
 * helper, it should have values for all class names in the interface. This let `mergeRules` optimize
 * mixing class names together.
 */
export const getStyles = memoizeFunction(
  (): IButtonStyles => {
    const border = SemanticColors.buttonBorder
    const disabledBackground = SemanticColors.disabledBackground
    const disabledText = SemanticColors.disabledText
    const buttonHighContrastFocus = {
      left: -2,
      top: -2,
      bottom: -2,
      right: -2,
      outlineColor: 'ButtonText',
    }

    return {
      root: [
        // getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent' }),
        DefaultFontStyles.medium,
        {
          boxSizing: 'border-box',
          border: '1px solid ' + border,
          userSelect: 'none',
          display: 'inline-block',
          textDecoration: 'none',
          textAlign: 'center',
          cursor: 'pointer',
          padding: '0 16px',
          borderRadius: DefaultEffects.roundedCorner2,

          selectors: {
            // IE11 workaround for preventing shift of child elements of a button when active.
            ':active > *': {
              position: 'relative',
              left: 0,
              top: 0,
            },
          },
        },
      ],

      rootDisabled: [
        // getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent' }),
        {
          backgroundColor: disabledBackground,
          borderColor: disabledBackground,
          color: disabledText,
          cursor: 'default',
          selectors: {
            ':hover': noOutline,
            ':focus': noOutline,
          },
        },
      ],

      iconDisabled: {
        color: disabledText,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
          },
        },
      },

      menuIconDisabled: {
        color: disabledText,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
          },
        },
      },

      flexContainer: {
        display: 'flex',
        height: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
      },
      description: {
        display: 'block',
      },

      textContainer: {
        flexGrow: 1,
        display: 'block',
      },

      icon: iconStyle(DefaultFontStyles.mediumPlus.fontSize),

      menuIcon: iconStyle(DefaultFontStyles.small.fontSize),

      label: {
        margin: '0 4px',
        lineHeight: '100%',
        display: 'block',
      },

      screenReaderText: hiddenContentStyle,
    }
  },
)
