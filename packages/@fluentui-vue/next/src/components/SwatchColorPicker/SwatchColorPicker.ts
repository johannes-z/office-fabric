import { styled } from '../styled'
import { SwatchColorPickerBase } from './SwatchColorPicker.base'
import { getStyles } from './SwatchColorPicker.styles'

export const SwatchColorPicker = styled(
  SwatchColorPickerBase,
  getStyles,
)
