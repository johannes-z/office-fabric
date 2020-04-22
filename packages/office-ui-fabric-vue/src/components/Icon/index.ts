import { styled } from '../styled'
import IconBase from './Icon'
import { getStyles } from './Icon.styles'

export * from './Icon.types'

export const Icon = styled(
  IconBase,
  getStyles,
  undefined,
  { scope: 'Icon' },
)

export * from './FontIcon'
