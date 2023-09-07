import { getGlobalClassNames } from '@fluentui-vue/style-utilities'

const GlobalClassNames = {
  root: 'ms-StackItem',
}

const alignMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end',
}

export function StackItemStyles(props, theme, tokens) {
  const { grow, shrink, disableShrink, align, verticalFill, order, className, basis = 'auto' } = props

  const classNames = getGlobalClassNames(GlobalClassNames, theme)

  return {
    root: [
      theme.fonts.medium,
      classNames.root,
      {
        flexBasis: basis,
        margin: tokens.margin,
        padding: tokens.padding,
        height: verticalFill ? '100%' : 'auto',
        width: 'auto',
      },
      grow && {
        flexGrow: grow === true ? 1 : grow,
      },
      (disableShrink || (!grow && !shrink)) && {
        flexShrink: 0,
      },
      shrink
        && !disableShrink && {
        flexShrink: 1,
      },
      align && {
        alignSelf: alignMap[align] || align,
      },
      order && {
        order,
      },
      className,
    ],
  }
}
