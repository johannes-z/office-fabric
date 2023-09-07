import { format } from '@fluentui-vue/utilities'
import { getWeekNumbersInMonth } from '@fluentui/date-time-utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { h } from 'vue'
import { makeCalendarDayGridProps } from '../Calendar/makeProps'
import { type IDayInfo, type IWeekCorners } from './CalendarDayGrid.base'
import type { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { CalendarGridDayCell } from './CalendarGridDayCell'
import { defineFunctionalComponent, makeStylingProps, propsFactoryFromInterface } from '@/utils'

export interface ICalendarGridRowProps extends ICalendarDayGridProps {
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>
  weeks: IDayInfo[][]
  week: IDayInfo[]
  weekIndex: number
  weekCorners?: IWeekCorners
  ariaHidden?: boolean
  rowClassName?: string
  ariaRole?: string
  activeDescendantId: string
  calculateRoundedStyles(
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string
  getDayInfosInRangeOfDay(dayToCompare: IDayInfo): IDayInfo[]
  getRefsFromDayInfos(dayInfosInRange: IDayInfo[]): (HTMLElement | null)[]
}

const makeCalendarGridRowProps = propsFactoryFromInterface<ICalendarGridRowProps>()({
  ...makeStylingProps(),
  ...makeCalendarDayGridProps(),
  rowClassName: { type: String, default: '' },
  classNames: { type: Object, required: true },
  weeks: { type: Array, required: true },
  week: { type: Array, required: true },
  weekIndex: { type: Number, required: true },
  weekCorners: { type: Object, required: true },
  ariaHidden: { type: String, default: undefined },
  ariaRole: { type: String, default: undefined },
  activeDescendantId: { type: String, required: true },
  calculateRoundedStyles: { type: Function, required: true },
  getDayInfosInRangeOfDay: { type: Function, required: true },
  getRefsFromDayInfos: { type: Function, required: true },
}, 'CalendarGridRow')

export const CalendarGridRow = defineFunctionalComponent({
  name: 'CalendarGridRow',

  props: makeCalendarGridRowProps(),

  render(props) {
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
    } = props

    const weekNumbers = showWeekNumbers
      ? getWeekNumbersInMonth(weeks.length, firstDayOfWeek, firstWeekOfYear, navigatedDate)
      : null

    const titleString = weekNumbers
      ? strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex])
      : ''

    const slotProps = {
      row: {
        role: ariaRole,
        class: rowClassName,
        key: `${weekIndex}_${week[0].key}`,
      },
      weekNumberCell: {
        key: weekIndex,
        class: classNames.weekNumberCell,
        title: titleString,
        ariaLabel: titleString,
        scope: 'row',
      },
      dayCell: (day: IDayInfo, dayIndex: number) => ({
        ...props,
        key: day.key,
        day,
        dayIndex,
      }),
    }

    return h('tr', slotProps.row, [
      showWeekNumbers && weekNumbers && h('th', slotProps.weekNumberCell, [
        h('span', weekNumbers[weekIndex]),
      ]),
      week.map((day: IDayInfo, dayIndex: number) =>
        h(CalendarGridDayCell, slotProps.dayCell(day, dayIndex))),
    ])
  },
})
