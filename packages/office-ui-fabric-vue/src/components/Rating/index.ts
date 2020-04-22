import { styled } from '../styled'
import { RatingBase } from './Rating.base'
import { getStyles } from './Rating.styles'

export * from './Rating.types'

export const Rating = styled(
  RatingBase,
  getStyles,
  undefined,
  { scope: 'Rating' },
)
