import { DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, DateRangeType, DayOfWeek, FirstWeekOfYear, type ICalendarStrings, type IDateFormatting } from '@fluentui/date-time-utilities'
import type { PropType } from 'vue'
import type { ICalendarNavigationIcons, ICalendarProps } from './Calendar.types'
import type { ICalendarDayProps } from './CalendarDay/CalendarDay.types'
import type { ICalendarMonthProps } from './CalendarMonth/CalendarMonth.types'
import { defaultCalendarNavigationIcons } from './defaults'
import { makeStylingProps, propsFactory, propsFactoryFromInterface } from '@/utils'

const defaultWorkWeekDays: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
]

export const makeCalendarProps = propsFactoryFromInterface<ICalendarProps>()({
  ...makeStylingProps(),

  firstDayOfWeek: { type: Number as PropType<DayOfWeek>, default: DayOfWeek.Sunday },
  firstWeekOfYear: { type: Number as PropType<FirstWeekOfYear>, default: FirstWeekOfYear.FirstDay },
  dateRangeType: { type: Number as PropType<DateRangeType>, default: DateRangeType.Day },

  strings: { type: Object as PropType<ICalendarStrings>, default: () => DEFAULT_CALENDAR_STRINGS },
  dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: () => DEFAULT_DATE_FORMATTING },

  isMonthPickerVisible: { type: Boolean, default: true },
  isDayPickerVisible: { type: Boolean, default: true },
  showMonthPickerAsOverlay: { type: Boolean, default: false },
  showGoToToday: { type: Boolean, default: false },
  showWeekNumbers: { type: Boolean, default: false },

  highlightCurrentMonth: { type: Boolean, default: false },
  highlightSelectedMonth: { type: Boolean, default: false },
  showSixWeeksByDefault: { type: Boolean, default: false },
  showCloseButton: { type: Boolean, default: false },
  allFocusable: { type: Boolean, default: false },

  navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
  workWeekDays: { type: Array as PropType<DayOfWeek[]>, default: () => defaultWorkWeekDays },

  value: { type: Date, default: undefined },
  minDate: { type: Date, default: undefined },
  maxDate: { type: Date, default: undefined },
  today: { type: Date, default: () => new Date() },

  calendarDayProps: { type: Object as PropType<Partial<ICalendarDayProps>>, default: () => ({}) },
  calendarMonthProps: { type: Object as PropType<Partial<ICalendarMonthProps>>, default: () => ({}) },

  id: { type: String, default: undefined },
  restrictedDates: { type: Array as PropType<Date[]>, default: () => [] },

}, 'Calendar')
