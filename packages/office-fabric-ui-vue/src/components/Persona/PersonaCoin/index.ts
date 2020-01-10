import PersonaCoinBase from './PersonaCoin.vue'
import { getStyles } from './PersonaCoin.styles'
import { VueConstructor } from 'vue'
import { styled } from '@/components/styled'

export const PersonaCoin: VueConstructor = styled(
  PersonaCoinBase,
  getStyles,
  undefined,
  { scope: 'PersonaCoin' }
)
