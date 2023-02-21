import Vue, { h } from 'vue'
import { asSlotProps } from '../../utils/types'
import { StylingPropKeys } from '@/utils'

export const Popup = (props, { attrs, listeners, slots }) => {
  const {
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
  } = props
  const needsVerticalScrollBar = false

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape')
      return
    // ;(ctx.listeners.dismiss as Function | null)?.(e)

    e.preventDefault()
    e.stopPropagation()
  }

  // TODO memory leak?
  window.addEventListener('keydown', onKeyDown)

  const slotProps = asSlotProps({
    root: {
      'class': props.className,
      ...attrs,
      role,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'style': {
        overflowY: needsVerticalScrollBar ? 'scroll' : undefined,
        outline: 'none',
        ...attrs.style,
      },
      'on': {
        keydown: onKeyDown,
      },
    },
  })

  return h('div', slotProps.root, slots)
}
Popup.props = [...StylingPropKeys,
  'className',
  'role',
  'ariaLabel',
  'ariaLabelledBy',
  'ariaDescribedBy',
]
