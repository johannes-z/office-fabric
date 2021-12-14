import { DayOfWeek, DEFAULT_CALENDAR_STRINGS, FirstWeekOfYear, getWeekNumbersInMonth, ICalendarStrings } from '@fluentui/date-time-utilities'
import { format } from '@uifabric-vue/utilities'
import { defineComponent, h, PropType, toRefs } from '@vue/composition-api'
import { CalendarGridDayCell } from './CalendarGridDayCell'

export const CalendarGridRow = defineComponent({
  name: 'CalendarGridRow',

  props: {
    showWeekNumbers: { type: Boolean, default: false },
    weekIndex: { type: Number, required: true },
    rowClassName: { type: String, default: '' },
    classNames: { type: Object, default: () => {} },

    firstDayOfWeek: { type: Number as PropType<DayOfWeek>, default: DayOfWeek.Sunday },
    firstWeekOfYear: { type: Number as PropType<FirstWeekOfYear>, default: FirstWeekOfYear.FirstDay },
    navigatedDate: { type: Date, required: true },

    week: { type: Array, required: true },
    weeks: { type: Array, required: true },
    strings: { type: Object as PropType<ICalendarStrings>, default: () => DEFAULT_CALENDAR_STRINGS },

    weekCorners: { type: Object, default: undefined },
  },

  setup (props) {
    const {
      classNames,
      showWeekNumbers,
      weekIndex,
      rowClassName,

      firstDayOfWeek,
      firstWeekOfYear,
      navigatedDate,

      week,
      weeks,
      strings,
      weekCorners,
    } = toRefs(props)

    const weekNumbers = showWeekNumbers.value
      ? getWeekNumbersInMonth(weeks.value.length, firstDayOfWeek.value, firstWeekOfYear.value, navigatedDate.value)
      : null

    const titleString = weekNumbers
      ? strings.value.weekNumberFormatString && format(strings.value.weekNumberFormatString, weekNumbers[weekIndex.value])
      : ''

    return () => h('tr', { class: rowClassName.value }, [
      showWeekNumbers.value && weekNumbers && h('th', {
        class: classNames.value.weekNumberCell,
        attrs: {
          title: titleString,
          scope: 'row',
        },
      }, [
        h('span', `${weekNumbers[weekIndex.value]}`),
      ]),
      ...week.value.map((day, dayIndex) => h(CalendarGridDayCell, {
        props: {
          weekCorners: weekCorners.value,
          day,
          dayIndex,
          weekIndex: weekIndex.value,
          classNames: classNames.value,
        },
      })),
    ])
  },
})
