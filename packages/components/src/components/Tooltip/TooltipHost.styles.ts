import { getGlobalClassNames } from '@fluentui-vue/style-utilities'
import type { ITooltipHostStyleProps, ITooltipHostStyles } from './TooltipHost.types'

const GlobalClassNames = {
  root: 'ms-TooltipHost',
  ariaPlaceholder: 'ms-TooltipHost-aria-placeholder',
}

export function getStyles(props: ITooltipHostStyleProps): ITooltipHostStyles {
  const { className, theme } = props
  const classNames = getGlobalClassNames(GlobalClassNames, theme)

  return {
    root: [
      classNames.root,
      {
        display: 'inline',
      },
      className,
    ],
  }
}
