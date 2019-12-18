import { styled } from '../styled'
import DropdownBase from './Dropdown.vue'
import { getStyles } from './Dropdown.styles'

export * from './Dropdown.types'

export const Dropdown = styled(
  DropdownBase,
  getStyles,
  undefined,
  { scope: 'Dropdown' }
)
