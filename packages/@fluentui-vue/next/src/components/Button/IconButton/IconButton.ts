import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './IconButton.styles'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const IconButton = defineComponent({
  name: 'IconButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
    iconProps: { type: Object, default: () => ({}) },
  },

  setup(props, { attrs, slots }) {
    const componentRef = ref(null)

    onMounted(() => {
      props.componentRef?.(componentRef.value)
    })

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: 'ms-Button--icon',
        styles: getStyles(props.styles),
        ref: componentRef,
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
