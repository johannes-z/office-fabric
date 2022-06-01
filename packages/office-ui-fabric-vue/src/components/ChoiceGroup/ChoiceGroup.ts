import { styled } from '../styled'
import { ChoiceGroupBase } from './ChoiceGroup.base'
import { getStyles } from './ChoiceGroup.styles'

export const ChoiceGroup = styled(
  ChoiceGroupBase,
  getStyles,
  undefined,
  { scope: 'ChoiceGroup' },
)
