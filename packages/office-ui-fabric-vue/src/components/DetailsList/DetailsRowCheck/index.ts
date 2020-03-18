import DetailsRowCheckBase from './DetailsRowCheck.vue'
import { getStyles } from './DetailsRowCheck.styles'
import { VueConstructor } from 'vue'
import { styled } from '../../styled'

export const DetailsRowCheck: VueConstructor = styled(
  DetailsRowCheckBase,
  getStyles,
  undefined,
  { scope: 'DetailsRowCheck' },
  true
)
