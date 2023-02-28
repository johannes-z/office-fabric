import { h } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { useBaseButtonProps } from '../useBaseButton'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const PrimaryButton = defineFunctionalComponent({

  name: 'PrimaryButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
  },

  render(props, { attrs, slots }) {
    const slotProps = asSlotProps({
      root: {
        ...attrs,
        ...props,
        primary: true,
      },
    })
    return h(DefaultButton, slotProps.root, slots)
  },

})
