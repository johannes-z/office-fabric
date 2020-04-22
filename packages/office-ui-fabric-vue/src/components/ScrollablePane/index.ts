import { styled } from '../styled'
import { ScrollablePaneBase } from './ScrollablePane.base'
import { getStyles } from './ScrollablePane.styles'

export * from './ScrollablePane.types'

export const ScrollablePane = styled(
  ScrollablePaneBase,
  getStyles,
  undefined,
  { scope: 'ScrollablePane' },
)
