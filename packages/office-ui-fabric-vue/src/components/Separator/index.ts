import { styled } from '../styled'
import SeparatorBase from './Separator.vue'
import { getStyles } from './Separator.styles'
import { VueConstructor } from 'vue'

export * from './Separator.types'

export const Separator: VueConstructor = styled(
  SeparatorBase,
  getStyles,
  undefined,
  { scope: 'Separator' }
)
