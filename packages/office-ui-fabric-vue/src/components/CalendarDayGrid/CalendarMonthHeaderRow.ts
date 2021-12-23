import { MappedType } from '@/types'
import { DAYS_IN_WEEK } from '@fluentui/date-time-utilities'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { css, findIndex } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { withCalendarProps } from '../Calendar/useCalendar'
import { IDayInfo } from './CalendarDayGrid.base'
import { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { withCalendarDayGridProps } from './useCalendarDayGrid'

export interface ICalendarDayMonthHeaderRowProps extends ICalendarDayGridProps {
  weeks: IDayInfo[][];
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>;
}

export const CalendarMonthHeaderRow = Vue.extend({
  name: 'CalendarMonthHeaderRow',

  functional: true,

  props: {
    ...withCalendarProps(),
    ...withCalendarDayGridProps(),

    weeks: { type: Array as () => IDayInfo[][], required: true },
    classNames: { type: Object as () => IProcessedStyleSet<ICalendarDayGridStyles>, required: true },
  } as MappedType<ICalendarDayMonthHeaderRowProps>,

  render (h, ctx): VNode {
    const {
      showWeekNumbers,
      strings,
      firstDayOfWeek,
      allFocusable,
      weeksToShow,
      weeks,
      classNames,
    } = ctx.props

    const dayLabels = strings.shortDays.slice()
    const firstOfMonthIndex = findIndex(weeks[1], (day: any) => day.originalDate.getDate() === 1)

    if (weeksToShow === 1 && firstOfMonthIndex >= 0) {
      // if we only show one week, replace the header with short month name
      const firstOfMonthIndexOffset = (firstOfMonthIndex + firstDayOfWeek) % DAYS_IN_WEEK
      dayLabels[firstOfMonthIndexOffset] = strings.shortMonths[weeks![1][firstOfMonthIndex].originalDate.getMonth()]
    }

    return h('tr', [
      showWeekNumbers && h('th', { class: classNames.dayCell }),
      ...dayLabels.map((val: string, index: number) => {
        const i = (index + firstDayOfWeek) % DAYS_IN_WEEK
        const label = index === firstOfMonthIndex
          ? strings.days[i] + ' ' + dayLabels[i]
          : strings.days[i]

        return h('th', {
          key: dayLabels[i] + ' ' + index,
          class: css(classNames.dayCell, classNames.weekDayLabelCell),
          attrs: {
            scope: 'col',
            title: label,
            'aria-label': label,
            'data-is-focusable': allFocusable ? true : undefined,
          },
        }, dayLabels[i])
      }),
    ])
  },
})
