import { styled } from '../styled'
import { ColorPickerGridCellBase } from './ColorPickerGridCell.base'
import { getStyles } from './ColorPickerGridCell.styles'

export const ColorPickerGridCell = styled(
  ColorPickerGridCellBase,
  getStyles,
)
