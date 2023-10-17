import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './ActionButton.styles'
import { asSlotProps, defineFunctionalComponent, makeStylingProps } from '@/utils'
import { useForwardRef } from '@/composables'

export const ActionButton = defineComponent({
  name: 'ActionButton',

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
        ref: handleRef,
        variantClassName: 'ms-Button--action ms-Button--command',
        styles: getStyles(props.theme, props.styles),
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
