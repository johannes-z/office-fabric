import { styled } from '../styled'
import { ChoiceGroupBase } from './ChoiceGroup.base'
import { getStyles } from './ChoiceGroup.styles'
import { VueConstructor } from 'vue'

export * from './ChoiceGroup.types'

export const ChoiceGroup: VueConstructor = styled(
  ChoiceGroupBase,
  getStyles,
  undefined,
  { scope: 'ChoiceGroup' },
)
