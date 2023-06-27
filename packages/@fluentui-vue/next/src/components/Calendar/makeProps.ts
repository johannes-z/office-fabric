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
  restrictedDates: { type: Array as PropType<Date[]>, default: undefined },
}, 'IRestrictedDatesOptions')

const makeAvailableDatesProps = propsFactoryFromInterface<IAvailableDateOptions>()({
  ...makeRestrictedDatesProps(),
  initialDate: { type: Date, default: undefined },
  targetDate: { type: Date, default: undefined },
  direction: { type: Number, default: 0 },
}, 'IRestrictedDatesOptions')

const makeDayGridOptionsProps = propsFactoryFromInterface<IDayGridOptions>()({
  ...makeRestrictedDatesProps(),
  firstDayOfWeek: { type: Number as PropType<DayOfWeek>, default: undefined },
  firstWeekOfYear: { type: Number as PropType<FirstWeekOfYear>, default: undefined },
  dateRangeType: { type: Number as PropType<DateRangeType>, default: undefined },
  daysToSelectInDayView: { type: Number, default: 1 },
  today: { type: Date, default: () => new Date() },
  showWeekNumbers: { type: Boolean, default: false },
  workWeekDays: { type: Array as PropType<DayOfWeek[]>, default: () => defaultWorkWeekDays },
  markedDays: { type: Array as PropType<Date[]>, default: undefined },

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

  firstDayOfWeek: { type: Number as PropType<DayOfWeek>, default: DayOfWeek.Sunday },
  firstWeekOfYear: { type: Number as PropType<FirstWeekOfYear>, default: FirstWeekOfYear.FirstDay },
  dateRangeType: { type: Number as PropType<DateRangeType>, default: DateRangeType.Day },
  showWeekNumbers: { type: Boolean, default: false },
  today: { type: Date, default: () => new Date() },
  workWeekDays: { type: Array as PropType<DayOfWeek[]>, default: () => defaultWorkWeekDays },

  strings: { type: Object as PropType<ICalendarStrings>, default: () => DEFAULT_CALENDAR_STRINGS },
  dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: () => DEFAULT_DATE_FORMATTING },

  isMonthPickerVisible: { type: Boolean, default: true },
  isDayPickerVisible: { type: Boolean, default: true },
  showMonthPickerAsOverlay: { type: Boolean, default: false },
  showGoToToday: { type: Boolean, default: false },

  highlightCurrentMonth: { type: Boolean, default: false },
  highlightSelectedMonth: { type: Boolean, default: false },
  showSixWeeksByDefault: { type: Boolean, default: false },
  showCloseButton: { type: Boolean, default: false },
  allFocusable: { type: Boolean, default: false },

  navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },

  modelValue: { type: Date, default: undefined },

  calendarDayProps: { type: Object as PropType<Partial<ICalendarDayProps>>, default: () => ({}) },
  calendarMonthProps: { type: Object as PropType<Partial<ICalendarMonthProps>>, default: () => ({}) },

  id: { type: String, default: undefined },
  'onUpdate:modelValue': { type: Function as PropType<(value: Date) => void>, default: undefined },
}, 'Calendar')

export const makeCalendarDayGridProps = propsFactoryFromInterface<ICalendarDayGridProps>()({
  ...makeStylingProps(),
  ...makeDayGridOptionsProps({
    firstDayOfWeek: DayOfWeek.Sunday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
  }),

  dateRangeType: { type: Number as PropType<DateRangeType>, default: DateRangeType.Day },
  strings: { type: Object as PropType<ICalendarStrings>, default: () => DEFAULT_CALENDAR_STRINGS },
  dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: () => DEFAULT_DATE_FORMATTING },
  showCloseButton: { type: Boolean, default: false },
  allFocusable: { type: Boolean, default: false },

  navigatedDate: { type: Date, required: true },
  selectedDate: { type: Date, default: undefined },

  weeksToShow: { type: Number, default: undefined },
  animationDirection: { type: Number, default: 0 },
  lightenDaysOutsideNavigatedMonth: { type: Boolean, default: true },
  daysToSelectInDayView: { type: Number, default: 1 },
  labelledBy: { type: String, default: undefined },
  getMarkedDays: { type: Function as PropType<(startingDate: Date, endingDate: Date) => Date[]>, default: undefined },
  markedDays: { type: Array as PropType<Date[]>, default: undefined },

  weeks: { type: Array as PropType<IDayInfo[][]>, required: true },
}, 'CalendarDayGrid')

export const makeCalendarDayProps = propsFactoryFromInterface<ICalendarDayProps>()({
  ...makeStylingProps(),
  ...makeCalendarDayGridProps(),
  navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
  showSixWeeksByDefault: { type: Boolean, default: false },

  onHeaderSelect: { type: Function as PropType<() => void>, default: undefined },
  onDismiss: { type: Function as PropType<() => void>, default: undefined },
  onNavigateDate: { type: Function as PropType<(date: Date, focusOnNavigatedDay: boolean) => void>, required: true },
}, 'CalendarDay')

export const makeCalendarMonthProps = propsFactoryFromInterface<ICalendarMonthProps>()({
  ...makeStylingProps(),
  styles: { type: [Object, Function] as PropType<IStyleFunctionOrObject<any, any> | undefined>, default: () => getStyles },
  strings: { type: Object as PropType<ICalendarStrings>, required: true },
  selectedDate: { type: Date, required: true },
  navigatedDate: { type: Date, required: true },

  navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
  dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: () => DEFAULT_DATE_FORMATTING },
  today: { type: Date, default: new Date() },
  minDate: { type: Date, default: undefined },
  maxDate: { type: Date, default: undefined },
  highlightCurrentMonth: { type: Boolean, default: false },
  highlightSelectedMonth: { type: Boolean, default: false },
  allFocusable: { type: Boolean, default: false },
  yearPickerHidden: { type: Boolean, default: false },

  animationDirection: { type: Number as PropType<AnimationDirection>, default: undefined },
  onHeaderSelect: { type: Function as PropType<() => void>, default: undefined },
  onSelectDate: { type: Function as PropType<(date: Date, selectedDateRangeArray?: Date[]) => void>, default: undefined },
  onNavigateDate: { type: Function as PropType<(date: Date, focusOnNavigatedDay: boolean) => void>, required: true },
}, 'CalendarMonth')
