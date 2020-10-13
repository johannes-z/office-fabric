import { styled } from '../styled'
import { getStyles } from './Dropdown.styles'
import { DropdownBase } from './Dropdown.base'
import { IDropdownProps, IDropdownStyleProps, IDropdownStyles } from './Dropdown.types'

export const Dropdown = styled<
IDropdownProps,
IDropdownStyleProps,
IDropdownStyles
>(
  DropdownBase,
  getStyles,
  undefined,
  { scope: 'Dropdown' },
)
