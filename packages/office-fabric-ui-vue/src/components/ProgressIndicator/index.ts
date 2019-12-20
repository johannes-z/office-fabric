import { styled } from '../styled'
import ProgressIndicatorBase from './ProgressIndicator'
import { getStyles } from './ProgressIndicator.styles'
import { VueConstructor } from 'vue'

export * from './ProgressIndicator.types'

export const ProgressIndicator: VueConstructor = styled(
  ProgressIndicatorBase,
  getStyles,
  undefined,
  { scope: 'ProgressIndicator' }
)
