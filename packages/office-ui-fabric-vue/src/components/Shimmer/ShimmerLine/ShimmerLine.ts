import { styled } from '../../styled'
import ShimmerLineBase from './ShimmerLine.base'
import { getStyles } from './ShimmerLine.styles'
import { VueConstructor } from 'vue'

export const ShimmerLine: VueConstructor = styled(
  ShimmerLineBase,
  getStyles,
  undefined,
  { scope: 'ShimmerLine' }
)
