import { PersonaPresenceBase } from './PersonaPresence.base'
import { getStyles } from './PersonaPresence.styles'
import { VueConstructor } from 'vue'
import { styled } from '../../styled'

export const PersonaPresence = styled(
  PersonaPresenceBase,
  getStyles,
  undefined,
  { scope: 'PersonaPresence' },
)
