import { h } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './CommandBarButton.styles'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const CommandBarButton = defineFunctionalComponent({
  name: 'CommandBarButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
  },

  render(props, { attrs, slots }) {
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
  },
})
