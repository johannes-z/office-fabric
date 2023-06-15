import { computed, defineComponent, h } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { useBaseButtonProps } from '../useBaseButton'
import { asSlotProps, useStylingProps } from '@/utils'
import { useForwardRef } from '@/composables'

export const PrimaryButton = defineComponent({

  name: 'PrimaryButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
  },

  setup(props, { attrs, slots }) {
    const handleRef = useForwardRef()

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...props,
        primary: true,
        ref: handleRef,
      },
    }))
    return () => h(DefaultButton, slotProps.value.root, slots)
  },

})
