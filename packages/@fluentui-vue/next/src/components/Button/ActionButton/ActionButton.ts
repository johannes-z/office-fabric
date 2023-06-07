import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './ActionButton.styles'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const ActionButton = defineComponent({
  name: 'ActionButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),

    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    iconProps: { type: Object, default: () => ({}) },
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
        variantClassName: 'ms-Button--action ms-Button--comand',
        styles: getStyles(props.theme, props.styles),
        ref: componentRef,
      },
    }))

    return () => h(BaseButton, slotProps.value.root, slots)
  },
})
