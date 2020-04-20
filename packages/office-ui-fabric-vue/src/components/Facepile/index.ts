import { styled } from '../styled'
import FacepileBase from './Facepile.vue'
import { getStyles } from './Facepile.styles'
import { VueConstructor } from 'vue'

// export * from './Facepile.types'

export const Facepile: VueConstructor = styled(
  FacepileBase,
  getStyles,
  undefined,
  { scope: 'Facepile' },
)
