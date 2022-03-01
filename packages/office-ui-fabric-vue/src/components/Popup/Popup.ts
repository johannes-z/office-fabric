import { withThemeableProps } from '@/useThemeable'
import { KeyCodes, modalize } from '@uifabric-vue/utilities'
import { CreateElement, RenderContext, VNode } from 'vue'
import { Vue } from 'vue-property-decorator'

function useScrollbar (style, root?: HTMLDivElement) {
  if (style && style.overflowY) {
    return false
  }

  let needsVerticalScrollBar = false
  if (root && root.firstElementChild) {
    const rootHeight = root.clientHeight
    const firstChildHeight = root.firstElementChild.clientHeight

    if (rootHeight > 0 && firstChildHeight > rootHeight) {
      needsVerticalScrollBar = firstChildHeight - rootHeight > 1
    }
  }
  return needsVerticalScrollBar
}

function useHideSiblingNodes (props, root?: HTMLDivElement) {
  const shouldHideSiblings = String(props['aria-modal']).toLowerCase() === 'true' && props.enableAriaHiddenSiblings

  if (!(shouldHideSiblings && root)) {
    return
  }

  const unmodalize = modalize(root)
  return unmodalize
}

export const Popup = Vue.extend({
  functional: true,

  props: {
    ...withThemeableProps(),
    role: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
    ariaLabelledBy: { type: String, default: undefined },
    ariaDescribedBy: { type: String, default: undefined },
    propStyle: { type: Object, default: () => {} },
    forwardRef: { type: HTMLDivElement, default: undefined },
  },

  render (h: CreateElement, context: RenderContext): VNode {
    const { role, ariaLabel, ariaLabelledBy, ariaDescribedBy, propStyle, forwardRef } = context.props

    useHideSiblingNodes(context.props, forwardRef)
    // TODO useRestoreFocus

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.which === KeyCodes.escape) {
        (context.listeners.dismiss as Function)?.(ev)
      }
    }
    // TODO useOnEvent

    const needsVerticalScrollBar = useScrollbar(propStyle, forwardRef)

    return h('div', {
      ...context.data,
      ref: context.data.ref,
      style: { overflowY: needsVerticalScrollBar ? 'scroll' : undefined, outline: 'none', ...propStyle },
      attrs: {
        role,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
      },
      on: {
        keydown: onKeyDown,
      },
    }, context.children)
  },
})
