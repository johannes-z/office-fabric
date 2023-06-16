import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types'
import { defineFunctionalComponent, makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IDialogFooterStyleProps, IDialogFooterStyles>()

export const DialogFooterBase = defineFunctionalComponent({
  name: 'DialogFooterBase',

  props: {
    ...makeStylingProps(),
  },

  render(props, { slots }) {
    const { className, styles, theme } = props

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    })

    return h('div', {
      class: classNames.actions,
    }, h('div', {
      class: classNames.actionsRight,
    }, slots))
  },
})
