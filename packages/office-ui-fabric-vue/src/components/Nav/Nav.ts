import { styled } from '../styled'
import NavBase from './Nav.base'
import { getStyles } from './Nav.styles'

export const Nav = styled(
  NavBase,
  getStyles,
  undefined,
  { scope: 'Nav' },
)
