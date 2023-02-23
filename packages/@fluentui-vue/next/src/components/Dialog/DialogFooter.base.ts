import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types'
import { useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IDialogFooterStyleProps, IDialogFooterStyles>()

export const DialogFooterBase = (props, { attrs, slots }) => {
  const { className, styles, theme } = props

  const classNames = getClassNames(styles!, {
    theme: theme!,
    className,
  })

  console.log(slots)

  return h('div', {
    class: classNames.actions,
  }, h('div', {
    class: classNames.actionsRight,
  }, slots))
}

DialogFooterBase.props = Object.keys({
  ...useStylingProps(),
})
