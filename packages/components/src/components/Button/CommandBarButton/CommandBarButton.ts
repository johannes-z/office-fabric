import { computed, defineComponent, h, onMounted, ref, toRefs } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './CommandBarButton.styles'
import { asSlotProps, defineFunctionalComponent, makeStylingProps } from '@/utils'
import { useForwardRef } from '@/composables'

export const CommandBarButton = defineComponent({
  name: 'CommandBarButton',

  props: {
    ...makeStylingProps(),
    ...useBaseButtonProps(),
  },

  setup(props, { attrs, slots }) {
    const { styles } = toRefs(props)
    const handleRef = useForwardRef()

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: 'ms-Button--commandBar',
        styles: getStyles(props.theme, styles.value),
        ref: handleRef,
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
