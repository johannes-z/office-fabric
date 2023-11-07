import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './IconButton.styles'
import { asSlotProps, defineFunctionalComponent, makeStylingProps } from '@/utils'
import { useForwardRef } from '@/composables'

export const IconButton = defineComponent({
  name: 'IconButton',

  props: {
    ...makeStylingProps(),
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