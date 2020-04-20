import { styled } from '../../styled'
import ColorPickerGridCellBase from './ColorPickerGridCell.vue'
import { getStyles } from './ColorPickerGridCell.styles'
import { VueConstructor } from 'vue'

export * from './ColorPickerGridCell.types'

export const ColorPickerGridCell: VueConstructor = styled(
  ColorPickerGridCellBase,
  getStyles,
  undefined,
  { scope: 'ColorPickerGridCell' },
)
