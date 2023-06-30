import { css, findIndex } from '@fluentui-vue/utilities'
import { DAYS_IN_WEEK } from '@fluentui/date-time-utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { h } from 'vue'
import { makeCalendarDayGridProps } from '../Calendar/makeProps'
import { type IDayInfo } from './CalendarDayGrid.base'
import type { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { defineFunctionalComponent, makeStylingProps, propsFactoryFromInterface } from '@/utils'

export interface ICalendarDayMonthHeaderRowProps extends ICalendarDayGridProps {
  weeks: IDayInfo[][]
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>
}

const makeCalendarMonthHeaderRowProps = propsFactoryFromInterface<ICalendarDayMonthHeaderRowProps>()({
  ...makeStylingProps(),
  ...makeCalendarDayGridProps(),
  weeks: { type: Array, required: true },
  classNames: { type: Object, required: true },
}, 'CalendarMonthHeaderRow')

export const CalendarMonthHeaderRow = defineFunctionalComponent({
  name: 'CalendarMonthHeaderRow',

  props: makeCalendarMonthHeaderRowProps(),

  render(props) {
    const { showWeekNumbers, strings, firstDayOfWeek, allFocusable, weeksToShow, weeks, classNames } = props
    const dayLabels = strings.shortDays.slice()
    const firstOfMonthIndex = findIndex(weeks![1], (day: IDayInfo) => day.originalDate.getDate() === 1)
    if (weeksToShow === 1 && firstOfMonthIndex >= 0) {
      // if we only show one week, replace the header with short month name
      const firstOfMonthIndexOffset = (firstOfMonthIndex + firstDayOfWeek) % DAYS_IN_WEEK
      dayLabels[firstOfMonthIndexOffset] = strings.shortMonths[weeks![1][firstOfMonthIndex].originalDate.getMonth()]
    }

    const slotProps = {
      dayCellWeekNumber: {
        class: classNames.dayCell,
      },
      dayCell: (index: number) => {
        const i = (index + firstDayOfWeek) % DAYS_IN_WEEK
        const label = strings.days[i]

        return [{
          class: css(classNames.dayCell, classNames.weekDayLabelCell),
          scope: 'col',
          key: `${dayLabels[i]} ${index}`,
          title: label,
          'aria-label': label,
          'data-is-focusable': allFocusable ? true : undefined,
        }, dayLabels[i]] as const
      },
    }

    return h('tr', [
      showWeekNumbers && h('th', slotProps.dayCellWeekNumber),
      ...dayLabels.map((val, index) => h('th', ...slotProps.dayCell(index))),
    ])
  },
})
