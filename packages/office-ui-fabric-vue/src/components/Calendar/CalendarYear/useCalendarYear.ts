import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { withCalendarProps } from '../useCalendar'
import { ICalendarYearProps } from './CalendarYear.types'

export const withCalendarYearProps = () => ({
  ...withThemeableProps(),
  ...withCalendarProps(),

  highlightCurrentYear: { type: Boolean, default: false },
  highlightSelectedYear: { type: Boolean, default: false },

  minYear: { type: Number, default: undefined },
  maxYear: { type: Number, default: undefined },

} as MappedType<ICalendarYearProps>)

export const withCalendarYearRangeProps = () => ({
  fromYear: { type: Number, required: true },
  toYear: { type: Number, required: true },
})
