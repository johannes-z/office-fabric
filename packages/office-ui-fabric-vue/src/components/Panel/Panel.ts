import { PanelBase } from './Panel.base'
import { getStyles } from './Panel.styles'
import { styled } from '../styled'

export const Panel = styled(
  PanelBase,
  getStyles,
  undefined,
  { scope: 'Panel' },
)
