import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { useBaseButtonProps } from '../useBaseButton'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const PrimaryButton = defineComponent({

  name: 'PrimaryButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
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
        primary: true,
        ref: componentRef,
      },
    }))
    return () => h(DefaultButton, slotProps.value.root, slots)
  },

})
