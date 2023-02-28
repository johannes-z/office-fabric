import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './ActionButton.styles'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const ActionButton = defineFunctionalComponent({
  name: 'ActionButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),

    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    iconProps: { type: Object, default: () => {} },
  },

  render(props, { attrs, slots }) {
    const slotProps = asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: 'ms-Button--action ms-Button--comand',
        styles: getStyles(props.styles),
      },
    })

    return h(BaseButton, slotProps.root, slots)
  },
})
