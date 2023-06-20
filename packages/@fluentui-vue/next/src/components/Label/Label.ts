import { LabelBase } from './Label.base'
import { getStyles } from './Label.styles'
import type { ILabelProps, ILabelStyleProps, ILabelStyles } from './Label.types'
import { styled } from '@/components/styled'

export const Label = styled<ILabelProps, ILabelStyleProps, ILabelStyles>(
  LabelBase,
  getStyles,
)
