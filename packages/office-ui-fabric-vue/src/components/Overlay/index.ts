import { styled } from '../styled'
import OverlayBase from './Overlay.vue'
import { getStyles } from './Overlay.styles'
import { VueConstructor } from 'vue'

export * from './Overlay.types'

export const Overlay: VueConstructor = styled(
  OverlayBase,
  getStyles,
  undefined,
  { scope: 'Overlay' }
)
