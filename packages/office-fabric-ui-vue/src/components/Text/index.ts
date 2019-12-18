import { styled } from '../styled'
import TextBase from './Text.vue'
import { getStyles } from './Text.styles'
import { VueConstructor } from 'vue'

export * from './Text.types'

export const Text: VueConstructor = styled(
  TextBase,
  getStyles,
  undefined,
  { scope: 'Text' }
)
