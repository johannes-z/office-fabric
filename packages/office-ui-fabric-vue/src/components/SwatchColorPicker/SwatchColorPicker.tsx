import { styled } from '../styled'
import { getStyles } from './SwatchColorPicker.styles'
import { ISwatchColorPickerProps, ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types'
import { SwatchColorPickerBase } from './SwatchColorPicker.base'

export const SwatchColorPicker = styled<ISwatchColorPickerProps, ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>(
  SwatchColorPickerBase,
  getStyles,
  undefined,
  { scope: 'SwatchColorPicker' },
)
