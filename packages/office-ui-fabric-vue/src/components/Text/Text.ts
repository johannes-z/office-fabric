import TextView from './Text.view'
import { getStyles } from './Text.styles'
import { VueConstructor } from 'vue'
import { styled } from '../styled'

export * from './Text.types'

export const Text: VueConstructor = styled(
  TextView,
  getStyles,
  undefined,
  { scope: 'Text' },
)
