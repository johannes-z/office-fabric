import { MappedType } from '@/types'
import { getWeekNumbersInMonth } from '@fluentui/date-time-utilities'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { format } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { withCalendarProps } from '../Calendar/useCalendar'
import { IDayInfo, IWeekCorners } from './CalendarDayGrid.base'
import { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { CalendarGridDayCell } from './CalendarGridDayCell'
import { withCalendarGridRowProps } from './useCalendarDayGrid'

export interface ICalendarGridRowProps extends ICalendarDayGridProps {
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>;
  weeks: IDayInfo[][];
  week: IDayInfo[];
  weekIndex: number;
  weekCorners?: IWeekCorners;
  ariaHidden?: boolean;
  rowClassName?: string;
  ariaRole?: string;
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

  functional: true,

  props: {
    ...withCalendarProps(),
    ...withCalendarGridRowProps(),
  } as MappedType<ICalendarGridRowProps>,

  render (h, ctx): VNode {
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
    } = ctx.props

    const weekNumbers = showWeekNumbers
      ? getWeekNumbersInMonth(weeks.length, firstDayOfWeek, firstWeekOfYear, navigatedDate)
      : null

    const titleString = weekNumbers
      ? strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex])
      : ''

    return h('tr', {
      key: weekIndex + '_' + week[0].key,
      class: rowClassName,
      attrs: {
        role: ariaRole,
      },
    }, [
      showWeekNumbers && weekNumbers && h('th', {
        key: weekIndex,
        class: classNames.weekNumberCell,
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
        ...ctx.data,
        props: {
          ...ctx.props,
          day,
          dayIndex,
        },
      })),
    ])
  },
})
