import { styled } from '../../styled'
import { ShimmerCircleBase } from './ShimmerCircle.base'
import { getStyles } from './ShimmerCircle.styles'
import { VueConstructor } from 'vue'

export const ShimmerCircle: VueConstructor = styled(
  ShimmerCircleBase,
  getStyles,
  undefined,
  { scope: 'ShimmerCircle' },
)
