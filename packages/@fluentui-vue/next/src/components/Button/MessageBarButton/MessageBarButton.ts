import { defineComponent, h, onMounted, ref } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './MessageBarButton.styles'
import { asSlotProps, useStylingProps } from '@/utils'

export const MessageBarButton = defineComponent({
  name: 'MessageBarButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
  },

  setup(props, { attrs, slots }) {
    const componentRef = ref(null)

    onMounted(() => {
      props.componentRef?.(componentRef.value)
    })

    const slotProps = asSlotProps({
      root: {
        ...attrs,
        ...props,
        styles: getStyles(props.theme, props.styles),
        ref: componentRef,
      },
    })

    return () => h(DefaultButton, slotProps.value, slots)
  },

})
