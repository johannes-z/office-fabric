import { styled } from '../../styled'
import { ChoiceGroupOptionBase } from './ChoiceGroupOption.base'
import { getStyles } from './ChoiceGroupOption.styles'

export * from './ChoiceGroupOption.types'

export const ChoiceGroupOption = styled(
  ChoiceGroupOptionBase,
  getStyles,
  undefined,
  { scope: 'ChoiceGroupOption' },
)
