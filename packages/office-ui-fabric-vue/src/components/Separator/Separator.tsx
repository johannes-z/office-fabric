import { VueConstructor } from 'vue'
import { styled } from '../styled'
import { getStyles } from './Separator.styles'
import { ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles } from './Separator.types'
import { SeparatorBase } from './Separator.base'

export const Separator: VueConstructor = styled<ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles>(
  SeparatorBase,
  getStyles,
  undefined,
  { scope: 'Separator' },
)
