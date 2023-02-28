import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './DefaultButton.styles'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const DefaultButton = defineFunctionalComponent({
  name: 'DefaultButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),

    primary: { type: Boolean, default: false },
  },

  render(props, { attrs, slots }) {
    const slotProps = asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: props.primary ? 'ms-Button--primary' : 'ms-Button--default',
        styles: getStyles(props.styles, props.primary),
      },
    })

    return h(BaseButton, slotProps.root, slots)
  },
})
