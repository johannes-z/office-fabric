import { getStyles } from './CalendarYear.styles'
import { CalendarYearBase } from './CalendarYear.base'
import type { ICalendarYearProps } from './CalendarYear.types'
import { styled } from '@/components/styled'

export const CalendarYear = styled(
  CalendarYearBase,
  getStyles,
)
