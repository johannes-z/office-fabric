import { styled } from '../styled'
import { ProgressIndicatorBase } from './ProgressIndicator.base'
import { getStyles } from './ProgressIndicator.styles'

export * from './ProgressIndicator.types'

export const ProgressIndicator = styled(
  ProgressIndicatorBase,
  getStyles,
  undefined,
  { scope: 'ProgressIndicator' },
)
