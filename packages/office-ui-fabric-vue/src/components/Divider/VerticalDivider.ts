import { styled } from '../styled'
import { VerticalDividerBase } from './VerticalDivider.base'
import { getStyles } from './VerticalDivider.styles'

export * from './VerticalDivider.types'

export const VerticalDivider = styled(
  VerticalDividerBase,
  getStyles,
  undefined,
  { scope: 'VerticalDivider' },
)
