import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './DefaultButton.styles'
import { asSlotProps, useStylingProps } from '@/utils'

export const DefaultButton = defineComponent({
  name: 'DefaultButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),

    primary: { type: Boolean, default: false },
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
        variantClassName: props.primary ? 'ms-Button--primary' : 'ms-Button--default',
        styles: getStyles(props.styles, props.primary),
        ref: componentRef,
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
