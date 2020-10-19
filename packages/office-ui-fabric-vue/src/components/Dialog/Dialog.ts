import { styled } from '../styled'
import { DialogBase } from './Dialog.base'
import { getStyles } from './Dialog.styles'

export const Dialog = styled(
  DialogBase,
  getStyles,
  undefined,
  { scope: 'Dialog' },
)
