import { styled } from '../styled'
import { FacepileBase } from './Facepile.base'
import { getStyles } from './Facepile.styles'

export const Facepile = styled(
  FacepileBase,
  getStyles,
  undefined,
  { scope: 'Facepile' },
)
