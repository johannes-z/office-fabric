import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './IconButton.styles'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const IconButton = defineFunctionalComponent({

  name: 'IconButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
    iconProps: { type: Object, default: () => ({}) },
  },

  render(props, { attrs, slots }) {
    const slotProps = asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: 'ms-Button--icon',
        styles: getStyles(props.styles),
      },
    })

    return h(BaseButton, slotProps.root, slots)
  },
})
