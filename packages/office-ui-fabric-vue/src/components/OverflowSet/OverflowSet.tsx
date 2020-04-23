
import { OverflowSetBase } from './OverflowSet.base'
import { getStyles } from './OverflowSet.styles'
import { styled } from '../styled'

export const OverflowSet = styled(
  OverflowSetBase,
  getStyles,
  undefined,
  { scope: 'OverflowSet' },
)
