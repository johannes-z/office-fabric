import { styled } from '../styled'
import { LinkBase } from './Link.base'
import { getStyles } from './Link.styles'
import { VueConstructor } from 'vue'

export * from './Link.types'

export const Link = styled(
  LinkBase,
  getStyles,
  undefined,
  { scope: 'Link' },
)
