import { styled } from '../../styled'
import { getStyles } from './ColorPickerGridCell.styles'
import { IColorPickerGridCellProps, IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types'
import { ColorPickerGridCellBase } from './ColorPickerGridCell.base'

export const ColorPickerGridCell = styled<IColorPickerGridCellProps, IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>(
  ColorPickerGridCellBase,
  getStyles,
  undefined,
  { scope: 'ColorPickerGridCell' },
)
