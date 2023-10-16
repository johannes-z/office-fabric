import { ScreenWidthMinMedium, getGlobalClassNames } from '@fluentui-vue/style-utilities'
import type { IDialogStyleProps, IDialogStyles } from '.'

const GlobalClassNames = {
  root: 'ms-Dialog',
}

export function getStyles(props: IDialogStyleProps): IDialogStyles {
  const {
    className,
    containerClassName, // eslint-disable-line deprecation/deprecation
    dialogDefaultMinWidth = '288px',
    dialogDefaultMaxWidth = '340px',
    hidden,
    theme,
  } = props

  const classNames = getGlobalClassNames(GlobalClassNames, theme)

  return {
    root: [classNames.root, theme.fonts.medium, className],

    main: [
      {
        width: dialogDefaultMinWidth,
        outline: '3px solid transparent',

        selectors: {
          [`@media (min-width: ${ScreenWidthMinMedium}px)`]: {
            width: 'auto',
            maxWidth: dialogDefaultMaxWidth,
            minWidth: dialogDefaultMinWidth,
          },
        },
      },
      !hidden && { display: 'flex' },
      containerClassName,
    ],
  }
}
