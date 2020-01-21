import { styled } from '../../styled'
import ChoiceGroupOptionBase from './ChoiceGroupOption.vue'
import { getStyles } from './ChoiceGroupOption.styles'
import { VueConstructor } from 'vue'

export * from './ChoiceGroupOption.types'

export const ChoiceGroupOption: VueConstructor = styled(
  ChoiceGroupOptionBase,
  getStyles,
  undefined,
  { scope: 'ChoiceGroupOption' }
)
