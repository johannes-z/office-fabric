import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { BaseButtonPropKeys } from '../useBaseButton'
import { getStyles } from './DefaultButton.styles'
import { StylingPropKeys, asSlotProps } from '@/utils'

export const DefaultButton = (props, { attrs, emit, slots }) => {
  const slotProps = asSlotProps({
    root: {
      ...attrs,
      ...props,
      variantClassName: props.primary != null ? 'ms-Button--primary' : 'ms-Button--default',
      styles: getStyles(props.styles, props.primary != null),
    },
  })

  return h(BaseButton, slotProps.root, slots)
}
DefaultButton.props = [...StylingPropKeys, ...BaseButtonPropKeys, 'primary']
