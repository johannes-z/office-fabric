import { styled } from '../styled'
import SwatchColorPickerBase from './SwatchColorPicker.vue'
import { getStyles } from './SwatchColorPicker.styles'
import { VueConstructor } from 'vue'

export * from './SwatchColorPicker.types'

export const SwatchColorPicker: VueConstructor = styled(
  SwatchColorPickerBase,
  getStyles,
  undefined,
  { scope: 'SwatchColorPicker' },
)
