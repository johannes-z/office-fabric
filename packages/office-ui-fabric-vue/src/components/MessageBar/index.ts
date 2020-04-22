import { styled } from '../styled'
import { MessageBarBase } from './MessageBar.base'
import { getStyles } from './MessageBar.styles'

export * from './MessageBar.types'

export const MessageBar = styled(
  MessageBarBase,
  getStyles,
  undefined,
  { scope: 'MessageBar' },
)
