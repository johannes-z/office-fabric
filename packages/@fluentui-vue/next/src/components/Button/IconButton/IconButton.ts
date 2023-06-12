import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './IconButton.styles'
import { asSlotProps, defineFunctionalComponent, useForwardRef, useStylingProps } from '@/utils'

export const IconButton = defineComponent({
  name: 'IconButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
    iconProps: { type: Object, default: () => ({}) },
  },

  setup(props, { attrs, slots }) {
    const handleRef = useForwardRef()

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: 'ms-Button--icon',
        styles: getStyles(props.theme, props.styles),
        ref: handleRef,
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
