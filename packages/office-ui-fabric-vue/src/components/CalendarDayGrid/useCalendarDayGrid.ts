import { MappedType } from '@/types'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { PropType } from 'vue'
import { AnimationDirection, ICalendarDayGridStyles } from '..'
import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '../Calendar'
import { withCalendarProps } from '../Calendar/useCalendar'
import { IDayInfo } from './CalendarDayGrid.base'
import { ICalendarDayGridProps } from './CalendarDayGrid.types'
import { ICalendarGridRowProps } from './CalendarGridRow'

export const withCalendarDayGridProps = () => ({
  ...withCalendarProps(),

  dateRangeType: { type: Number as () => DateRangeType, default: DateRangeType.Day },
  firstDayOfWeek: { type: Number as () => DayOfWeek, default: DayOfWeek.Sunday },
  firstWeekOfYear: { type: Number as () => FirstWeekOfYear, default: FirstWeekOfYear.FirstDay },

  selectedDate: { type: Date, required: true },
  navigatedDate: { type: Date, required: true },

  //  onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;
  //  onNavigateDate?: (date: Date, focusOnNavigatedDay: boolean) => void;
  //  onDismiss?: () => void;

  daysToSelectInDayView: { type: Number, default: 1 },
  today: { type: Date, default: () => new Date() },
  showWeekNumbers: { type: Boolean, default: false },

  //  customDayCellRef?: (element: HTMLElement, date: Date, classNames: IProcessedStyleSet<ICalendarDayGridStyles>) => void;
  weeksToShow: { type: Number, default: undefined },
  minDate: { type: Date, default: undefined },
  maxDate: { type: Date, default: undefined },
  restrictedDates: { type: Array as () => Date[], default: undefined },

  workWeekDays: { type: Array as PropType<DayOfWeek[]>, default: () => [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday] },
  showCloseButton: { type: Boolean, default: false },
  allFocusable: { type: Boolean, default: false },
  labelledBy: { type: String, default: undefined },
  lightenDaysOutsideNavigatedMonth: { type: Boolean, default: true },
  animationDirection: { type: Number as () => AnimationDirection, default: undefined },
  //  getMarkedDays?: (startingDate: Date, endingDate: Date) => Date[];

} as MappedType<ICalendarDayGridProps>)

export const withCalendarGridRowProps = () => ({
  ...withCalendarDayGridProps(),

  classNames: { type: Object as () => IProcessedStyleSet<ICalendarDayGridStyles>, required: true },
  weeks: { type: Array, required: true },
  week: { type: Array as PropType<IDayInfo[]>, required: true },
  weekIndex: { type: Number, required: true },
  weekCorners: { type: Object, default: undefined },
  ariaHidden: { type: Boolean, default: undefined },
  rowClassName: { type: String, default: '' },
  ariaRole: { type: String, default: undefined },
  activeDescendantId: { type: String, default: undefined },
} as MappedType<ICalendarGridRowProps>)
