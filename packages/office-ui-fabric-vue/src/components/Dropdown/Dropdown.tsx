import { styled } from '../styled'
import { getStyles } from './Dropdown.styles'
// import { IDropdownProps, IDropdownStyleProps, IDropdownStyles } from './Dropdown.types'
import { DropdownBase } from './Dropdown.base'

export const Dropdown = styled<any, any, any>(
  DropdownBase,
  getStyles,
  undefined,
  { scope: 'Dropdown' },
)
