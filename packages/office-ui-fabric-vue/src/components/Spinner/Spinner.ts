import { styled } from '../styled'
import SpinnerBase from './Spinner.base'
import { getStyles } from './Spinner.styles'

export const Spinner = styled(
  SpinnerBase,
  getStyles,
  undefined,
  { scope: 'Spinner' },
)
