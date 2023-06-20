import { DayOfWeek, FirstWeekOfYear } from '@fluentui/date-time-utilities'
import type { ICalendarStrings, IDateFormatting } from '@fluentui/date-time-utilities'
import type { PropType } from 'vue'
import { defaultCalendarStrings } from '../Calendar/defaults'
import type { IDayInfo } from './CalendarDayGrid.base'
import { makeStylingProps, propsFactory } from '@/utils'

export const makeCalendarDayGridProps = propsFactory({
  ...makeStylingProps(),

  navigatedDate: { type: Date, required: true },
  dateTimeFormatter: { type: Object as PropType<IDateFormatting>, required: true },

  classNames: { type: Object as PropType<Record<string, string>>, default: () => ({}) },
  rowClassName: { type: String, default: '' },
  week: { type: Array as PropType<IDayInfo[]>, default: () => [] },
  weeks: { type: Array as PropType<IDayInfo[][]>, default: () => [] },
  weekIndex: { type: Number, default: 0 },
  showWeekNumbers: { type: Boolean, default: undefined },
  firstDayOfWeek: { type: Number as PropType<DayOfWeek>, default: DayOfWeek.Sunday },
  firstWeekOfYear: { type: Number as PropType<FirstWeekOfYear>, default: FirstWeekOfYear.FirstDay },
  strings: { type: Object as PropType<ICalendarStrings>, default: () => defaultCalendarStrings },
  weeksToShow: { type: Number, default: undefined },
  allFocusable: { type: Boolean, default: undefined },
  animationDirection: { type: Number, default: 0 },
}, 'CalendarDayGrid')
