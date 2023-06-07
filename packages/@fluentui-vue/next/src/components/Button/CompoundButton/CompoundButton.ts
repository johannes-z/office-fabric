import { computed, defineComponent, h, onMounted, ref, toRefs } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './CompoundButton.styles'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const CompoundButton = defineComponent({
  name: 'CompoundButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
    primary: { type: Boolean, default: false },
  },

  setup(props, { attrs, slots }) {
    const { primary, styles } = toRefs(props)

    const componentRef = ref(null)

    onMounted(() => {
      props.componentRef?.(componentRef.value)
    })

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: primary.value ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
        styles: getStyles(props.theme, styles.value, primary.value),
        ref: componentRef,
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
