import { styled } from '../styled'
import ShimmerBase from './Shimmer.vue'
import { getStyles } from './Shimmer.styles'
import { VueConstructor } from 'vue'

export * from './Shimmer.types'

export const Shimmer: VueConstructor = styled(
  ShimmerBase,
  getStyles,
  undefined,
  { scope: 'Shimmer' },
)
