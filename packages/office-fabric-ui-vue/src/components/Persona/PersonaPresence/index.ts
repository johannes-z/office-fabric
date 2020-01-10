import PersonaPresenceBase from './PersonaPresence.vue'
import { getStyles } from './PersonaPresence.styles'
import { VueConstructor } from 'vue'
import { styled } from '@/components/styled'

export const PersonaPresence: VueConstructor = styled(
  PersonaPresenceBase,
  getStyles,
  undefined,
  { scope: 'PersonaPresence' }
)
