import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { BaseButtonPropKeys } from '../useBaseButton'
import { getStyles } from './CommandBarButton.styles'
import { StylingPropKeys, asSlotProps } from '@/utils'

export const CommandBarButton = (props, { attrs, slots }) => {
  const { styles } = props

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      ...props,
      variantClassName: 'ms-Button--commandBar',
      styles: getStyles(styles),
    },
  })

  return h(BaseButton, slotProps.root, slots)
}
CommandBarButton.props = [...StylingPropKeys, ...BaseButtonPropKeys]
