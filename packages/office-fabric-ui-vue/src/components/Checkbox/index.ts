import { styled } from '../styled'
import CheckboxBase from './Checkbox.vue'
import { getStyles } from './Checkbox.styles'

export * from './Checkbox.types'

export const Checkbox = styled(
  CheckboxBase,
  getStyles,
  undefined,
  { scope: 'Checkbox' }
)
