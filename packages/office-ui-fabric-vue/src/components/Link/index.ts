import { styled } from '../styled'
import LinkBase from './Link'
import { getStyles } from './Link.styles'
import { VueConstructor } from 'vue'

export * from './Link.types'

export const Link: VueConstructor = styled(
  LinkBase,
  getStyles,
  undefined,
  { scope: 'Link' }
)
