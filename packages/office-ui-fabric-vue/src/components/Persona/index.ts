import { styled } from '../styled'
import { PersonaBase } from './Persona.base'
import { getStyles } from './Persona.styles'

export * from './Persona.types'
export * from './PersonaConsts'
export * from './PersonaCoin'
export { getPersonaInitialsColor } from './PersonaInitialsColor'

export const Persona = styled(
  PersonaBase,
  getStyles,
  undefined,
  { scope: 'Persona' },
)
