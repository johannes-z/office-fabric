import { styled } from '../styled'
import { IconBase } from './Icon.base'
import { getStyles } from './Icon.styles'

export const Icon = styled(
  IconBase,
  getStyles,
  undefined,
  { scope: 'Icon' },
)
