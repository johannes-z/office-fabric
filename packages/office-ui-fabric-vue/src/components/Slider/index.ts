import { styled } from '../styled'
import { SliderBase } from './Slider.base'
import { getStyles } from './Slider.styles'

export * from './Slider.types'

export const Slider = styled(
  SliderBase,
  getStyles,
  undefined,
  { scope: 'Slider' },
)
