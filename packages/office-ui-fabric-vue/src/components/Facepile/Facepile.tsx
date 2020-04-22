import { styled } from '../styled'
import { FacepileBase } from './Facepile.base'
import { getStyles } from './Facepile.styles'
import { VueConstructor } from 'vue'

// export * from './Facepile.types'

export const Facepile: VueConstructor = styled(
  FacepileBase,
  getStyles,
  undefined,
  { scope: 'Facepile' },
)
