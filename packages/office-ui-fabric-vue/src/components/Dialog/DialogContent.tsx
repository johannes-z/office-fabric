import { styled } from '../styled'
import { DialogContentBase } from './DialogContent.base'
import { getStyles } from './DialogContent.styles'

export const DialogContent = styled(
  DialogContentBase,
  getStyles,
  undefined,
  { scope: 'DialogContent' },
)
