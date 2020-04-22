import { styled } from '../styled'
import { LabelBase } from './Label.base'
import { getStyles } from './Label.styles'

export * from './Label.types'

export const Label = styled(
  LabelBase,
  getStyles,
  undefined,
  { scope: 'Label' },
)
