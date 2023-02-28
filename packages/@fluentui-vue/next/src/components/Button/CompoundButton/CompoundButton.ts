import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './CompoundButton.styles'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const CompoundButton = defineFunctionalComponent({
  name: 'CompoundButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
    primary: { type: Boolean, default: false },
  },

  render(props, { attrs, slots }) {
    const { primary, styles } = props
    const slotProps = asSlotProps({
      root: {
        ...attrs,
        ...props,
        variantClassName: primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
        styles: getStyles(styles, primary),
      },
    })

    return h(BaseButton, slotProps.root, slots)
  },
})
