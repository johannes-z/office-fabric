import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { BaseButtonPropKeys } from '../useBaseButton'
import { getStyles } from './CompoundButton.styles'
import { StylingPropKeys, asSlotProps } from '@/utils'

export const CompoundButton = (props, { attrs, slots }) => {
  const { primary, styles } = props
  const slotProps = asSlotProps({
    root: {
      ...attrs,
      ...props,
      variantClassName: primary != null ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
      styles: getStyles(styles, primary != null),
    },
  })

  return h(BaseButton, slotProps.root, slots)
}
CompoundButton.props = [...StylingPropKeys, ...BaseButtonPropKeys, 'primary']
