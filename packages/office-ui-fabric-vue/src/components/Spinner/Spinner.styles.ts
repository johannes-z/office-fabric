import { getHighContrastNoAdjustStyle } from '@fluentui/style-utilities'
import { memoizeFunction } from '@uifabric-vue/utilities'
import { keyframes } from '@uifabric/merge-styles'
import { getGlobalClassNames, hiddenContentStyle, HighContrastSelector } from '@uifabric/styling'
import { ISpinnerStyles, ISpinnerStyleProps } from './Spinner.types'

const GlobalClassNames = {
  root: 'ms-Spinner',
  circle: 'ms-Spinner-circle',
  label: 'ms-Spinner-label',
}

const spinAnimation = memoizeFunction(() =>
  keyframes({
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  }),
)

export const getStyles = (props: ISpinnerStyleProps): ISpinnerStyles => {
  const { theme, size, className, labelPosition } = props

  const { palette } = theme

  const classNames = getGlobalClassNames(GlobalClassNames, theme)

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
        border: '1.5px solid ' + palette.themeLight,
        borderTopColor: palette.themePrimary,
        animationName: spinAnimation(),
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
      theme.fonts.small,
      {
        color: palette.themePrimary,
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
