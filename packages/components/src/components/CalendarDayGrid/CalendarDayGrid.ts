import { styled } from '../styled'
import { CalendarDayGridBase } from './CalendarDayGrid.base'
import { getStyles } from './CalendarDayGrid.styles'

export const CalendarDayGrid = styled(
  CalendarDayGridBase,
  getStyles,
)
