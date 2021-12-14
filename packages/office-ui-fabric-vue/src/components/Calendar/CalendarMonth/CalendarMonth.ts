import { styled } from '../../styled'
import CalendarMonthBase from './CalendarMonth.base'
import { getStyles } from './CalendarMonth.styles'

export const CalendarMonth = styled(
  CalendarMonthBase,
  getStyles,
  undefined,
  { scope: 'CalendarMonth' },
)
