import { getHighContrastNoAdjustStyle, hiddenContentStyle, HighContrastSelector } from '@fluentui-vue/style-utilities'
import { DefaultFontStyles, Palette } from '@fluentui-vue/theme'
import { keyframes } from '@fluentui/merge-styles'
import { ISpinnerStyleProps, ISpinnerStyles } from './Spinner.types'

const GlobalClassNames = {
  root: 'ms-Spinner',
  circle: 'ms-Spinner-circle',
  label: 'ms-Spinner-label',
}

const spinAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const getStyles = (props: ISpinnerStyleProps): ISpinnerStyles => {
  const { size, className, labelPosition } = props

  const classNames = GlobalClassNames

  return {
    root: [
      classNames.root,
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      labelPosition === 'top' && {
        flexDirection: 'column-reverse',
      },
      labelPosition === 'right' && {
        flexDirection: 'row',
      },
      labelPosition === 'left' && {
        flexDirection: 'row-reverse',
      },
      className,
    ],
    circle: [
      classNames.circle,
      {
        boxSizing: 'border-box',
        borderRadius: '50%',
        border: '1.5px solid ' + Palette.themeLight,
        borderTopColor: Palette.themePrimary,
        animationName: spinAnimation,
        animationDuration: '1.3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(.53,.21,.29,.67)',
        selectors: {
          [HighContrastSelector]: {
            borderTopColor: 'Highlight',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },
      {
        width: size,
        height: size,
      },
    ],
    label: [
      classNames.label,
      DefaultFontStyles.small,
      {
        color: Palette.themePrimary,
        margin: '8px 0 0',
        textAlign: 'center',
      },
      labelPosition === 'top' && {
        margin: '0 0 8px',
      },
      labelPosition === 'right' && {
        margin: '0 0 0 8px',
      },
      labelPosition === 'left' && {
        margin: '0 8px 0 0',
      },
    ],
    screenReaderText: hiddenContentStyle,
  }
}
