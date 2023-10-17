import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, toRefs, watchEffect } from 'vue'
import { asSlotProps } from '../../utils/types'
import { makeStylingProps, styleToObject } from '@/utils'

function useScrollbar(style, rootRef) {
  const needsVerticalScrollBar = ref(false)

  watchEffect(() => {
    if (style.value.overflowY || !rootRef.value?.firstElementChild)
      return

    const rootHeight = rootRef.value.clientHeight
    const firstChildHeight = rootRef.value.firstElementChild.clientHeight
    if (rootHeight > 0 && firstChildHeight > rootHeight)
      needsVerticalScrollBar.value = firstChildHeight - rootHeight > 1
  })

  return needsVerticalScrollBar
}

export const Popup = defineComponent({
  name: 'Popup',

  props: {
    ...makeStylingProps(),

    role: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
    ariaLabelledBy: { type: String, default: undefined },
    ariaDescribedBy: { type: String, default: undefined },
  },

  emits: [
    'dismiss',
  ],

  setup(props, { attrs, emit, slots }) {
    const {
      role,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
    } = toRefs(props)
    const style = computed(() => styleToObject(attrs.style as any))

    const rootRef = ref<HTMLElement | null>(null)

    const needsVerticalScrollBar = useScrollbar(style, rootRef)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape')
        return

      emit('dismiss', e)

      e.preventDefault()
      e.stopPropagation()
    }

    onMounted(() => window.addEventListener('keydown', onKeyDown))
    onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        class: props.className,
        role: role.value,
        'aria-label': ariaLabel.value,
        'aria-labelledby': ariaLabelledBy.value,
        'aria-describedby': ariaDescribedBy.value,
        style: {
          overflowY: needsVerticalScrollBar.value ? 'scroll' : undefined,
          outline: 'none',
          ...style,
        },
        onKeyDown,
      },
    }))

    return () => h('div', {
      ref: rootRef,
      ...slotProps.value.root,
    }, slots)
  },
})
