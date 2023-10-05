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

    //map each child of slots in an span with class action
    const childSlots = (slots.default?.() || []).map((slot) => {
      return h('span', {
        class: classNames.action,
      }, slot)
    })

    return h('div', {
      class: classNames.actions,
    }, h('div', {
      class: classNames.actionsRight,
    }, childSlots))
  },
})
