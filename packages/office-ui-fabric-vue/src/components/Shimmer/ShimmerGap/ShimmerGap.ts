import { styled } from '../../styled'
import { ShimmerGapBase } from './ShimmerGap.base'
import { getStyles } from './ShimmerGap.styles'
import { VueConstructor } from 'vue'

export const ShimmerGap: VueConstructor = styled(
  ShimmerGapBase,
  getStyles,
  undefined,
  { scope: 'ShimmerGap' },
)
