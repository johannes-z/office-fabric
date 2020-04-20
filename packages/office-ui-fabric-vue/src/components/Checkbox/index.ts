import { styled } from '../styled'
import CheckboxBase from './Checkbox.vue'
import { getStyles } from './Checkbox.styles'
import { VueConstructor } from 'vue'

export * from './Checkbox.types'

export const Checkbox: VueConstructor = styled(
  CheckboxBase,
  getStyles,
  undefined,
  { scope: 'Checkbox' },
)
