import { DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, DateRangeType, DayOfWeek, FirstWeekOfYear, type IAvailableDateOptions, type ICalendarStrings, type IDateFormatting, type IDayGridOptions, type IRestrictedDatesOptions } from '@fluentui/date-time-utilities'
import type { PropType } from 'vue'
import type { IStyleFunctionOrObject } from '@fluentui/merge-styles'
import type { IDayInfo } from '../CalendarDayGrid/CalendarDayGrid.base'
import type { AnimationDirection, ICalendarNavigationIcons, ICalendarProps } from './Calendar.types'
import type { ICalendarDayProps } from './CalendarDay/CalendarDay.types'
import type { ICalendarMonthProps } from './CalendarMonth/CalendarMonth.types'
import { defaultCalendarNavigationIcons } from './defaults'
import { getStyles } from './CalendarMonth/CalendarMonth.styles'
import type { ICalendarDayGridProps } from '.'
import { makeStylingProps, propsFactory, propsFactoryFromInterface } from '@/utils'

const defaultWorkWeekDays: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
]

const makeRestrictedDatesProps = propsFactoryFromInterface<IRestrictedDatesOptions>()({
  minDate: { type: Date, default: undefined },
  maxDate: { type: Date, default: undefined },
  restrictedDates: { type: Array, default: undefined },
}, 'IRestrictedDatesOptions')

const makeAvailableDatesProps = propsFactoryFromInterface<IAvailableDateOptions>()({
  ...makeRestrictedDatesProps(),
  initialDate: { type: Date, default: undefined },
  targetDate: { type: Date, default: undefined },
  direction: { type: Number, default: 0 },
}, 'IRestrictedDatesOptions')

const makeDayGridOptionsProps = propsFactoryFromInterface<IDayGridOptions>()({
  ...makeRestrictedDatesProps(),
  firstDayOfWeek: { type: Number, default: undefined },
  firstWeekOfYear: { type: Number, default: undefined },
  dateRangeType: { type: Number, default: undefined },
  daysToSelectInDayView: { type: Number, default: 1 },
  today: { type: Date, default: () => new Date() },
  showWeekNumbers: { type: Boolean, default: false },
  workWeekDays: { type: Array, default: () => defaultWorkWeekDays },
  markedDays: { type: Array, default: undefined },

  navigatedDate: { type: Date, required: true },
  selectedDate: { type: Date, required: true },

  weeksToShow: { type: Number, default: undefined },
}, 'IDayGridOptions')

export const makeCalendarProps = propsFactoryFromInterface<ICalendarProps>()({
  ...makeStylingProps(),
  ...makeRestrictedDatesProps(),
  // ...makeDayGridOptionsProps({
  //   firstDayOfWeek: DayOfWeek.Sunday,
  //   firstWeekOfYear: FirstWeekOfYear.FirstDay,
  //   dateRangeType: DateRangeType.Day,
  //   today: new Date(),
  //   showWeekNumbers: false,
  //   workWeekDays: defaultWorkWeekDays,
  // }),

  firstDayOfWeek: { type: Number, default: DayOfWeek.Sunday },
  firstWeekOfYear: { type: Number, default: FirstWeekOfYear.FirstDay },
  dateRangeType: { type: Number, default: DateRangeType.Day },
  showWeekNumbers: { type: Boolean, default: false },
  today: { type: Date, default: () => new Date() },
  workWeekDays: { type: Array, default: () => defaultWorkWeekDays },

  strings: { type: Object, default: () => DEFAULT_CALENDAR_STRINGS },
  dateTimeFormatter: { type: Object, default: () => DEFAULT_DATE_FORMATTING },

  isMonthPickerVisible: { type: Boolean, default: true },
  isDayPickerVisible: { type: Boolean, default: true },
  showMonthPickerAsOverlay: { type: Boolean, default: false },
  showGoToToday: { type: Boolean, default: false },

  highlightCurrentMonth: { type: Boolean, default: false },
  highlightSelectedMonth: { type: Boolean, default: false },
  showSixWeeksByDefault: { type: Boolean, default: false },
  showCloseButton: { type: Boolean, default: false },
  allFocusable: { type: Boolean, default: false },

  navigationIcons: { type: Object, default: () => defaultCalendarNavigationIcons },

  modelValue: { type: Date, default: undefined },

  calendarDayProps: { type: Object, default: () => ({}) },
  calendarMonthProps: { type: Object, default: () => ({}) },

  id: { type: String, default: undefined },
  'onUpdate:modelValue': { type: Function, default: undefined },
}, 'Calendar')

export const makeCalendarDayGridProps = propsFactoryFromInterface<ICalendarDayGridProps>()({
  ...makeStylingProps(),
  ...makeDayGridOptionsProps({
    firstDayOfWeek: DayOfWeek.Sunday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
  }),

  dateRangeType: { type: Number, default: DateRangeType.Day },
  strings: { type: Object, default: () => DEFAULT_CALENDAR_STRINGS },
  dateTimeFormatter: { type: Object, default: () => DEFAULT_DATE_FORMATTING },
  showCloseButton: { type: Boolean, default: false },
  allFocusable: { type: Boolean, default: false },

  navigatedDate: { type: Date, required: true },
  selectedDate: { type: Date, default: undefined },

  weeksToShow: { type: Number, default: undefined },
  animationDirection: { type: Number, default: 0 },
  lightenDaysOutsideNavigatedMonth: { type: Boolean, default: true },
  daysToSelectInDayView: { type: Number, default: 1 },
  labelledBy: { type: String, default: undefined },
  getMarkedDays: { type: Function, default: undefined },
  markedDays: { type: Array, default: undefined },

  weeks: { type: Array, default: () => [] },
}, 'CalendarDayGrid')

export const makeCalendarDayProps = propsFactoryFromInterface<ICalendarDayProps>()({
  ...makeStylingProps(),
  ...makeCalendarDayGridProps(),
  navigationIcons: { type: Object, default: () => defaultCalendarNavigationIcons },
  showSixWeeksByDefault: { type: Boolean, default: false },

  onHeaderSelect: { type: Function, default: undefined },
  onDismiss: { type: Function, default: undefined },
  onNavigateDate: { type: Function, required: true },
}, 'CalendarDay')

export const makeCalendarMonthProps = propsFactoryFromInterface<ICalendarMonthProps>()({
  ...makeStylingProps(),
  styles: { type: [Object, Function], default: () => getStyles },
  strings: { type: Object, required: true },
  selectedDate: { type: Date, required: true },
  navigatedDate: { type: Date, required: true },

  navigationIcons: { type: Object, default: () => defaultCalendarNavigationIcons },
  dateTimeFormatter: { type: Object, default: () => DEFAULT_DATE_FORMATTING },
  today: { type: Date, default: new Date() },
  minDate: { type: Date, default: undefined },
  maxDate: { type: Date, default: undefined },
  highlightCurrentMonth: { type: Boolean, default: false },
  highlightSelectedMonth: { type: Boolean, default: false },
  allFocusable: { type: Boolean, default: false },
  yearPickerHidden: { type: Boolean, default: false },

  animationDirection: { type: Number, default: undefined },
  onHeaderSelect: { type: Function, default: undefined },
  onSelectDate: { type: Function, default: undefined },
  onNavigateDate: { type: Function, required: true },
}, 'CalendarMonth')
