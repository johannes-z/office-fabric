import { SpinnerBase } from './Spinner.base'
import { getStyles } from './Spinner.styles'
import type { ISpinnerProps, ISpinnerStyleProps, ISpinnerStyles } from './Spinner.types'
import { styled } from '@/components/styled'

export const Spinner = styled<
  ISpinnerProps,
  ISpinnerStyleProps,
  ISpinnerStyles
>(
  SpinnerBase,
  getStyles,
)
