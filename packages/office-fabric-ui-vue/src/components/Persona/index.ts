import { styled } from '../styled'
import PersonaBase from './Persona.vue'
import { getStyles } from './Persona.styles'
import { VueConstructor } from 'vue'

export * from './Persona.types'

export const Persona: VueConstructor = styled(
  PersonaBase,
  getStyles,
  undefined,
  { scope: 'Persona' }
)
