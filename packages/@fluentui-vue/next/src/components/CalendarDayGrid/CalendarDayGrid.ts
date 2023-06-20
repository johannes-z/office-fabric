import { styled } from '../styled'
import { CalendarDayGridBase } from './CalendarDayGrid.base'
import { getStyles } from './CalendarDayGrid.styles'
import type { ICalendarDayGridProps } from './CalendarDayGrid.types'

export const CalendarDayGrid = styled(
  CalendarDayGridBase,
  getStyles,
)
