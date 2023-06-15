import { defineComponent, h } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './MessageBarButton.styles'
import { asSlotProps, useStylingProps } from '@/utils'
import { useForwardRef } from '@/composables'

export const MessageBarButton = defineComponent({
  name: 'MessageBarButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
  },

  setup(props, { attrs, slots }) {
    const handleRef = useForwardRef()

    const slotProps = asSlotProps({
      root: {
        ...attrs,
        ...props,
        styles: getStyles(props.theme, props.styles),
        ref: handleRef,
      },
    })

    return () => h(DefaultButton, slotProps.value, slots)
  },

})
