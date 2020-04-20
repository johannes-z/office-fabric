import { VueConstructor } from 'vue'
import { styled } from '../styled'
import { getStyles } from './Separator.styles'
import { ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles } from './Separator.types'
import SeparatorBase from './Separator.vue'

export * from './Separator.types'

export const Separator: VueConstructor = styled<ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles>(
  SeparatorBase,
  getStyles,
  undefined,
  { scope: 'Separator' },
)
