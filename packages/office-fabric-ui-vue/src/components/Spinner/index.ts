import { styled } from '../styled'
import SpinnerBase from './Spinner.vue'
import { getStyles } from './Spinner.styles'
import { VueConstructor } from 'vue'

export * from './Spinner.types'

export const Spinner: VueConstructor = styled(
  SpinnerBase,
  getStyles,
  undefined,
  { scope: 'Spinner' }
)
