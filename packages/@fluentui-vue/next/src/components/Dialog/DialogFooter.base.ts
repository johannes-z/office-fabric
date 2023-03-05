import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types'
import { defineFunctionalComponent, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IDialogFooterStyleProps, IDialogFooterStyles>()

export const DialogFooterBase = defineFunctionalComponent({
  name: 'DialogFooterBase',

  props: {
    ...useStylingProps(),
  },

  render(props, { attrs, slots }) {
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
  },
})
