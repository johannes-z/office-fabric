import { h } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { useBaseButtonProps } from '../useBaseButton'
import { asSlotProps, useStylingProps } from '@/utils'

export const PrimaryButton = (props, { attrs, slots }) => {
  const slotProps = asSlotProps({
    root: {
      ...attrs,
      ...props,
      primary: true,
    },
  })
  return h(DefaultButton, slotProps.root, slots)
}
PrimaryButton.props = Object.keys({
  ...useStylingProps(),
  ...useBaseButtonProps(),
})
