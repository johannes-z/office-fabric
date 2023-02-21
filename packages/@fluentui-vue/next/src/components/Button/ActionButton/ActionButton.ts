import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { getStyles } from './ActionButton.styles'
import { asSlotProps } from '@/utils'

export const ActionButton = (props, { attrs, slots }) => {
  const slotProps = asSlotProps({
    root: {
      ...attrs,
      ...props,
      variantClassName: 'ms-Button--action ms-Button--comand',
      styles: getStyles(props.styles),
    },
  })

  return h(BaseButton, slotProps.root, slots)
}
