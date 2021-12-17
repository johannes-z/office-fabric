import { styled } from '../styled'
import { SpinnerBase } from './Spinner.base'
import { getStyles } from './Spinner.styles'
import { VueConstructor } from 'vue'

export const Spinner: VueConstructor = styled(
  SpinnerBase,
  getStyles,
  undefined,
  { scope: 'Spinner' },
)
