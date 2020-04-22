import { CalloutContentBase } from './CalloutContent.base'
import { getStyles } from './CalloutContent.styles'
import { styled } from '../styled'

export const CalloutContent = styled(
  CalloutContentBase,
  getStyles,
  undefined,
  { scope: 'CalloutContent' },
)
