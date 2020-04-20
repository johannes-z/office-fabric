import { styled } from '../styled'
import SliderBase from './Slider.vue'
import { getStyles } from './Slider.styles'
import { VueConstructor } from 'vue'

export * from './Slider.types'

export const Slider: VueConstructor = styled(
  SliderBase,
  getStyles,
  undefined,
  { scope: 'Slider' },
)
