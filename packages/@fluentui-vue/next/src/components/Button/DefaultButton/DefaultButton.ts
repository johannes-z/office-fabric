import { computed, defineComponent, h, onMounted, ref, watch } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './DefaultButton.styles'
import { asSlotProps, useForwardRef, useStylingProps } from '@/utils'

export const DefaultButton = defineComponent({
  name: 'DefaultButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),

    primary: { type: Boolean, default: false },
  },

  setup(props, { attrs, slots }) {
    const handleRef = useForwardRef()

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: props.primary ? 'ms-Button--primary' : 'ms-Button--default',
        styles: getStyles(props.theme, props.styles, props.primary),
        ref: handleRef,
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
