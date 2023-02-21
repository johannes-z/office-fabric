import Vue, { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import { asSlotProps } from '../../utils/types'
import { StylingPropKeys, useStylingProps } from '@/utils'

export const Popup = defineComponent({
  name: 'Popup',

  props: {
    ...useStylingProps(),

    role: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
    ariaLabelledBy: { type: String, default: undefined },
    ariaDescribedBy: { type: String, default: undefined },
  },

  setup(props, { attrs, slots }) {
    const {
      role,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
    } = toRefs(props)

    const needsVerticalScrollBar = ref(false)

    const onKeyDown = (e: KeyboardEvent) => {
      console.log('onKeyDown')
      if (e.key !== 'Escape')
        return
      // ;(ctx.listeners.dismiss as Function | null)?.(e)

      e.preventDefault()
      e.stopPropagation()
    }

    onMounted(() => window.addEventListener('keydown', onKeyDown))
    onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))

    const slotProps = computed(() => asSlotProps({
      root: {
        'class': props.className,
        ...attrs,
        role,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        'style': {
          overflowY: needsVerticalScrollBar.value ? 'scroll' : undefined,
          outline: 'none',
          // ...attrs.style,
        },
        onKeyDown,
      },
    }))

    return () => h('div', slotProps.value.root, slots)
  },
})
