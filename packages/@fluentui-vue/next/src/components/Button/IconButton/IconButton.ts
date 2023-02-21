import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { BaseButtonPropKeys } from '../useBaseButton'
import { getStyles } from './IconButton.styles'
import { StylingPropKeys, asSlotProps } from '@/utils'

export const IconButton = (props, { attrs, slots }) => {
  const slotProps = asSlotProps({
    root: {
      ...attrs,
      ...props,
      variantClassName: 'ms-Button--icon',
      styles: getStyles(props.styles),
    },
  })

  return h(BaseButton, slotProps.root, slots)
}
IconButton.props = [...StylingPropKeys, ...BaseButtonPropKeys, 'iconProps']
