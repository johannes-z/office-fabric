import { styled } from '../styled'
import { TextFieldBase } from './TextField.base'
import { getStyles } from './TextField.styles'

export * from './TextField.types'

export const TextField = styled(
  TextFieldBase,
  getStyles,
  undefined,
  { scope: 'TextField' },
)
