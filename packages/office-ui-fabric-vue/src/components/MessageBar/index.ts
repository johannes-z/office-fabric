import { styled } from '../styled'
import MessageBarBase from './MessageBar.vue'
import { getStyles } from './MessageBar.styles'
import { VueConstructor } from 'vue'

export * from './MessageBar.types'

export const MessageBar: VueConstructor = styled(
  MessageBarBase,
  getStyles,
  undefined,
  { scope: 'MessageBar' },
)
