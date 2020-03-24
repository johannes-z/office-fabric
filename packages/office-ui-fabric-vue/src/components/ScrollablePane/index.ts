import { styled } from '../styled'
import ScrollablePaneBase from './ScrollablePane.vue'
import { getStyles } from './ScrollablePane.styles'
import { VueConstructor } from 'vue'

export * from './ScrollablePane.types'

export const ScrollablePane: VueConstructor = styled(
  ScrollablePaneBase,
  getStyles,
  undefined,
  { scope: 'ScrollablePane' }
)
