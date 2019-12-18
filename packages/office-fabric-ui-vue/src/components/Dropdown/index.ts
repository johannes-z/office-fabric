import { styled } from '../styled'
import DropdownBase from './Dropdown.vue'
import { getStyles } from './Dropdown.styles'
import { VueConstructor } from 'vue'

export * from './Dropdown.types'

export const Dropdown: VueConstructor = styled(
  DropdownBase,
  getStyles,
  undefined,
  { scope: 'Dropdown' }
)
