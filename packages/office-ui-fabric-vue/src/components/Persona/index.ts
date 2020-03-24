import { styled } from '../styled'
import PersonaBase from './Persona.vue'
import { getStyles } from './Persona.styles'
import { VueConstructor } from 'vue'

export * from './Persona.types'
export * from './PersonaConsts'
export * from './PersonaCoin'
export { getPersonaInitialsColor } from './PersonaInitialsColor'

export const Persona: VueConstructor = styled(
  PersonaBase,
  getStyles,
  undefined,
  { scope: 'Persona' }
)
