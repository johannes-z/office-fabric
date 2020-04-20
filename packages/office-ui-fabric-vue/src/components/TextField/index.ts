import { styled } from '../styled'
import TextFieldBase from './TextField.vue'
import { getStyles } from './TextField.styles'
import { VueConstructor } from 'vue'

export * from './TextField.types'

export const TextField: VueConstructor = styled(
  TextFieldBase,
  getStyles,
  undefined,
  { scope: 'TextField' },
)
