import Vue from 'vue'
import { asSlotProps } from '../../utils/types'

export const Popup = Vue.extend({
  name: 'Popup',

  functional: true,

  props: {
    className: { type: String, default: undefined },
    role: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
    ariaLabelledBy: { type: String, default: undefined },
    ariaDescribedBy: { type: String, default: undefined },
  },

  render (h, ctx) {
    const {
      role,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
    } = ctx.props
    const needsVerticalScrollBar = false

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      ;(ctx.listeners.dismiss as Function | null)?.(e)

      e.preventDefault()
      e.stopPropagation()
    }

    // TODO memory leak?
    window.addEventListener('keydown', onKeyDown)

    const slotProps = asSlotProps({
      root: {
        class: ctx.props.className,
        ...ctx.data,
        attrs: {
          role,
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
          'aria-describedby': ariaDescribedBy,
          ...ctx.data.attrs,
        },
        staticStyle: {
          overflowY: needsVerticalScrollBar ? 'scroll' : undefined,
          outline: 'none',
          ...ctx.data.staticStyle,
        },
        on: {
          keydown: onKeyDown,
        },
      },
    })

    return h('div', slotProps.root, ctx.children)
  },
})
