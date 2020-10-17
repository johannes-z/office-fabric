import { styled } from '../styled'
import { getStyles } from './Shimmer.styles'
import { IShimmerProps, IShimmerStyleProps, IShimmerStyles } from './Shimmer.types'
import { ShimmerBase } from './Shimmer.base'

export const Shimmer = styled<IShimmerProps, IShimmerStyleProps, IShimmerStyles>(
  ShimmerBase,
  getStyles,
  undefined,
  { scope: 'Shimmer' },
)
