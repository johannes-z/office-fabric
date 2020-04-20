import { styled } from '../styled'
import RatingBase from './Rating.vue'
import { getStyles } from './Rating.styles'
import { VueConstructor } from 'vue'

export * from './Rating.types'

export const Rating: VueConstructor = styled(
  RatingBase,
  getStyles,
  undefined,
  { scope: 'Rating' },
)
