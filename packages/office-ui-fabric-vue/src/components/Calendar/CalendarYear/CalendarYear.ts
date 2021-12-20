import { getStyles } from './CalendarYear.styles'
import { CalendarYearBase } from './CalendarYear.base'
import { styled } from '@/components/styled'

export const CalendarYear = styled(
  CalendarYearBase,
  getStyles,
  undefined,
  { scope: 'CalendarYear' },
)
