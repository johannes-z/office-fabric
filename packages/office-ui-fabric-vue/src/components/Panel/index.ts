import { styled } from '../styled'
import PanelBase from './Panel.vue'
import { getStyles } from './Panel.styles'
import { VueConstructor } from 'vue'

export * from './Panel.types'

export const Panel: VueConstructor = styled(
  PanelBase,
  getStyles,
  undefined,
  { scope: 'Panel' },
)
