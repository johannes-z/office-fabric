import { computed, defineComponent, h, onMounted, ref, toRefs } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './CompoundButton.styles'
import { asSlotProps, defineFunctionalComponent, makeStylingProps } from '@/utils'
import { useForwardRef } from '@/composables'

export const CompoundButton = defineComponent({
  name: 'CompoundButton',

  props: {
    ...makeStylingProps(),
    ...useBaseButtonProps(),
    primary: { type: Boolean, default: false },
  },

  setup(props, { attrs, slots }) {
    const { primary, styles } = toRefs(props)

    const handleRef = useForwardRef()

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: primary.value ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
        styles: getStyles(props.theme, styles.value, primary.value),
        ref: handleRef,
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
