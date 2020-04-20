import { styled } from '../styled'
import NavBase from './Nav'
import { getStyles } from './Nav.styles'
import { VueConstructor } from 'vue'

export * from './Nav.types'

export const Nav: VueConstructor = styled(
  NavBase,
  getStyles,
  undefined,
  { scope: 'Nav' },
)
