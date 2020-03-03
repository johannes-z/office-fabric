import DetailsColumnBase from './DetailsColumn.vue'
import { getStyles } from './DetailsColumn.styles'
import { VueConstructor } from 'vue'
import { styled } from '../../styled'

export const DetailsColumn: VueConstructor = styled(
  DetailsColumnBase,
  getStyles,
  undefined,
  { scope: 'DetailsColumn' }
)
