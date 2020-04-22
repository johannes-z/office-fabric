import { styled } from '../styled'
import LabelBase from './Label'
import { getStyles } from './Label.styles'
import { VueConstructor } from 'vue'

export * from './Label.types'

export const Label = styled(
  LabelBase,
  getStyles,
  undefined,
  { scope: 'Label' },
)
