import { styled } from '../styled'
import CheckBase from './Check.vue'
import { getStyles } from './Check.styles'
import { VueConstructor } from 'vue'

export const Check: VueConstructor = styled(
  CheckBase,
  getStyles,
  undefined,
  { scope: 'Check' },
)
