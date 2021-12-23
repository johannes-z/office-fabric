import { withThemeableProps } from '@/useThemeable'
import { withCalendarProps } from '../useCalendar'
import { ICalendarYearStrings } from './CalendarYear.types'

const DefaultCalendarYearStrings: ICalendarYearStrings = {
  prevRangeAriaLabel: undefined,
  nextRangeAriaLabel: undefined,
}

export const withCalendarYearProps = () => ({
  ...withThemeableProps(),
  ...withCalendarProps(),

  highlightCurrentYear: { type: Boolean, default: false },
  highlightSelectedYear: { type: Boolean, default: false },

  minYear: { type: Number, default: undefined },
  maxYear: { type: Number, default: undefined },

  selectedYear: { type: Number, default: undefined },
  navigatedYear: { type: Number, default: undefined },

  strings: { type: Object as () => ICalendarYearStrings, default: () => DefaultCalendarYearStrings },
})

export const withCalendarYearRangeProps = () => ({
  fromYear: { type: Number, required: true },
  toYear: { type: Number, required: true },
})
