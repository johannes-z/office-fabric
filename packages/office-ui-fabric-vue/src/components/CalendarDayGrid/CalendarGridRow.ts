import { MappedType } from '@/types'
import { DayOfWeek, DEFAULT_CALENDAR_STRINGS, FirstWeekOfYear, getWeekNumbersInMonth, ICalendarStrings } from '@fluentui/date-time-utilities'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { format } from '@uifabric-vue/utilities'
import Vue, { PropType, VNode } from 'vue'
import { withCalendarProps } from '../Calendar/useCalendar'
import { IDayInfo, IWeekCorners } from './CalendarDayGrid.base'
import { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { CalendarGridDayCell } from './CalendarGridDayCell'
import { withCalendarDayGridProps, withCalendarGridRowProps } from './useCalendarDayGrid'

export interface ICalendarGridRowProps extends ICalendarDayGridProps {
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>;
  weeks: IDayInfo[][];
  week: IDayInfo[];
  weekIndex: number;
  weekCorners?: IWeekCorners;
  ariaHidden?: boolean;
  rowClassName?: string;
  ariaRole?: string;
  // navigatedDayRef: React.RefObject<HTMLButtonElement>;
  activeDescendantId: string;
  calculateRoundedStyles?(
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string;
  getDayInfosInRangeOfDay?(dayToCompare: IDayInfo): IDayInfo[];
  getRefsFromDayInfos?(dayInfosInRange: IDayInfo[]): (HTMLElement | null)[];
}

export const CalendarGridRow = Vue.extend({
  name: 'CalendarGridRow',

  props: {
    ...withCalendarProps(),
    ...withCalendarGridRowProps(),
  } as MappedType<ICalendarGridRowProps>,

  computed: {
    weekNumbers (): number[] | null {
      return this.showWeekNumbers
        ? getWeekNumbersInMonth(this.weeks.length, this.firstDayOfWeek, this.firstWeekOfYear, this.navigatedDate)
        : null
    },
    titleString (): string | undefined {
      return this.weekNumbers
        ? this.strings.weekNumberFormatString && format(this.strings.weekNumberFormatString, this.weekNumbers[this.weekIndex])
        : ''
    },
  },

  render (h): VNode {
    const {
      classNames,
      week,
      weeks,
      weekIndex,
      rowClassName,
      ariaRole,
      showWeekNumbers,
      firstDayOfWeek,
      firstWeekOfYear,
      navigatedDate,
      strings,
      weekCorners,

      weekNumbers,
      titleString,
    } = this

    return h('tr', {
      class: rowClassName,
      key: weekIndex + '_' + week[0].key,
      attrs: {
        role: ariaRole,
      },
    }, [
      showWeekNumbers && weekNumbers && h('th', {
        class: classNames.weekNumberCell,
        key: weekIndex,
        attrs: {
          title: titleString,
          'aria-label': titleString,
          scope: 'row',
        },
      }, [
        h('span', `${weekNumbers[weekIndex]}`),
      ]),
      ...week.map((day: IDayInfo, dayIndex: number) => h(CalendarGridDayCell, {
        key: day.key,
        props: {
          ...this.$props,
          day,
          dayIndex,
        },
      })),
    ])
  },
})
