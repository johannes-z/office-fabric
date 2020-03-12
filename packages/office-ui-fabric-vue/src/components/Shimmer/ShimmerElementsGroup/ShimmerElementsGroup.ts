import { styled } from '../../styled'
import ShimmerElementsGroupBase from './ShimmerElementsGroup.base'
import { getStyles } from './ShimmerElementsGroup.styles'
import { VueConstructor } from 'vue'

export const ShimmerElementsGroup: VueConstructor = styled(
  ShimmerElementsGroupBase,
  getStyles,
  undefined,
  { scope: 'ShimmerElementsGroup' }
)
