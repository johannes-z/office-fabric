import { styled } from '../styled'
import { CheckboxBase } from './Checkbox.base'
import { getStyles } from './Checkbox.styles'
import { VueConstructor } from 'vue'

export * from './Checkbox.types'

export const Checkbox: VueConstructor = styled(
  CheckboxBase,
  getStyles,
  undefined,
  { scope: 'Checkbox' },
)
