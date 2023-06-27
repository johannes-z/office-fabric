import { format } from '@fluentui-vue/utilities'
import { FirstWeekOfYear, getWeekNumbersInMonth } from '@fluentui/date-time-utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import { makeCalendarDayGridProps } from '../Calendar/makeProps'
import { type IDayInfo, type IWeekCorners } from './CalendarDayGrid.base'
import type { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { CalendarGridDayCell } from './CalendarGridDayCell'
import { asSlotProps, makeStylingProps, propsFactory } from '@/utils'

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

const makeCalendarGridRowProps = propsFactory({
  ...makeStylingProps(),
  ...makeCalendarDayGridProps(),
  rowClassName: { type: String, default: '' },
  classNames: { type: Object as PropType<IProcessedStyleSet<ICalendarDayGridStyles>>, required: true },
  weeks: { type: Array as PropType<IDayInfo[][]>, required: true },
  week: { type: Array as PropType<IDayInfo[]>, required: true },
  weekIndex: { type: Number, required: true },
  weekCorners: { type: Object as PropType<IWeekCorners>, required: true },
}, 'CalendarGridRow')

export const CalendarGridRow = defineComponent({
  name: 'CalendarGridRow',

  props: makeCalendarGridRowProps(),

  setup(props, { attrs, slots }) {
    const weekNumbers = computed(() => props.showWeekNumbers
      ? getWeekNumbersInMonth(props.weeks.length, props.firstDayOfWeek, props.firstWeekOfYear, props.navigatedDate)
      : null)

    const titleString = computed(() => weekNumbers.value
      ? props.strings.weekNumberFormatString && format(props.strings.weekNumberFormatString, weekNumbers.value[props.weekIndex])
      : '')

    const slotProps = computed(() => asSlotProps({
      row: {
        role: attrs.ariaRole,
        class: props.rowClassName,
        key: `${props.weekIndex}_${props.week[0].key}`,
      },
      weekNumberCell: {
        key: props.weekIndex,
        class: props.classNames.weekNumberCell,
        title: titleString.value,
        ariaLabel: titleString.value,
        scope: 'row',
      },
    }))
    return () => h('tr', slotProps.value.row, [
      props.showWeekNumbers && weekNumbers.value && h('th', slotProps.value.weekNumberCell, [
        h('span', weekNumbers.value[props.weekIndex]),
      ]),
      props.week.map((day: IDayInfo, dayIndex: number) => h(CalendarGridDayCell, {
        ...props,
        key: day.key,
        day,
        dayIndex,
      })),
    ])
  },
})
