import { computed, defineComponent, h, onMounted, ref, toRefs } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './CommandBarButton.styles'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const CommandBarButton = defineComponent({
  name: 'CommandBarButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
  },

  setup(props, { attrs, slots }) {
    const { styles } = toRefs(props)

    const componentRef = ref(null)

    onMounted(() => {
      props.componentRef?.(componentRef.value)
    })

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: 'ms-Button--commandBar',
        styles: getStyles(props.theme, styles.value),
        ref: componentRef,
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
