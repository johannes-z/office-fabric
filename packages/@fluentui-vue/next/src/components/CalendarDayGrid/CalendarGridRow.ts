import { format } from '@fluentui-vue/utilities'
import { getWeekNumbersInMonth } from '@fluentui/date-time-utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { IDayInfo, IWeekCorners } from './CalendarDayGrid.base'
import type { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { CalendarGridDayCell } from './CalendarGridDayCell'
import { makeCalendarDayGridProps } from './makeProps'
import { asSlotProps, makeStylingProps } from '@/utils'

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

export const CalendarGridRow = defineComponent({
  name: 'CalendarGridRow',

  props: {
    ...makeStylingProps(),
    ...makeCalendarDayGridProps(),
    rowClassName: { type: String, default: '' },
  },

  setup(props, { attrs, slots }) {
    const {
      classNames,
      rowClassName,
      week,
      weeks,
      weekIndex,
      showWeekNumbers,
      firstDayOfWeek,
      firstWeekOfYear,
      navigatedDate,
      strings,
    } = toRefs(props)

    const weekNumbers = computed(() => showWeekNumbers.value
      ? getWeekNumbersInMonth(weeks.value.length, firstDayOfWeek.value, firstWeekOfYear.value, navigatedDate.value!)
      : null)

    const titleString = computed(() => weekNumbers.value
      ? strings.value.weekNumberFormatString && format(strings.value.weekNumberFormatString, weekNumbers.value[weekIndex.value])
      : '')

    const slotProps = computed(() => asSlotProps({
      row: {
        role: attrs.ariaRole,
        class: rowClassName.value,
        key: `${weekIndex.value}_${week.value[0].key}`,
      },
      weekNumberCell: {
        key: weekIndex.value,
        class: classNames.value.weekNumberCell,
        title: titleString.value,
        ariaLabel: titleString.value,
        scope: 'row',
      },
    }))
    return () => h('tr', slotProps.value.row, [
      showWeekNumbers.value && weekNumbers.value && h('th', slotProps.value.weekNumberCell, [
        h('span', weekNumbers.value[weekIndex.value]),
      ]),
      week.value.map((day: IDayInfo, dayIndex: number) => h(CalendarGridDayCell, {
        ...props,
        key: day.key,
        day,
        dayIndex,
      })),
    ])
  },
})
