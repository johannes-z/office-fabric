import { styled } from '../styled'
import { OverlayBase } from './Overlay.base'
import { getStyles } from './Overlay.styles'

export const Overlay = styled(
  OverlayBase,
  getStyles,
  undefined,
  { scope: 'Overlay' },
)
