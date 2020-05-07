import { styled } from '../styled'
import { getStyles } from './Separator.styles'
import { ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles } from './Separator.types'
import { SeparatorBase } from './Separator.base'

export const Separator = styled<ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles>(
  SeparatorBase,
  getStyles,
  undefined,
  { scope: 'Separator' },
)
