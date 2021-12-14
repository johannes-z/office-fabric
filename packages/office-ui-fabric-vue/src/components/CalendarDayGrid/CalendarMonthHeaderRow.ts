import { DayOfWeek, DAYS_IN_WEEK, DEFAULT_CALENDAR_STRINGS, ICalendarStrings } from '@fluentui/date-time-utilities'
import { css, findIndex } from '@uifabric-vue/utilities'
import { computed, defineComponent, h, PropType, toRefs } from '@vue/composition-api'
import { IDayInfo } from './CalendarDayGrid.base'

export const CalendarMonthHeaderRow = defineComponent({
  name: 'CalendarMonthHeaderRow',

  props: {
    classNames: { type: Object, default: () => {} },

    strings: { type: Object as PropType<ICalendarStrings>, default: () => DEFAULT_CALENDAR_STRINGS },
    weeks: { type: Array as PropType<IDayInfo[][]>, required: true },

    firstDayOfWeek: { type: Number as PropType<DayOfWeek>, default: DayOfWeek.Sunday },
    allFocusable: { type: Boolean, default: false },
    showWeekNumbers: { type: Boolean, default: false },
    weeksToShow: { type: Number, default: undefined },
  },

  setup (props) {
    const { showWeekNumbers, strings, firstDayOfWeek, allFocusable, weeksToShow, weeks, classNames } = toRefs(props)

    const dayLabels = computed(() => strings.value.shortDays.slice())
    const firstOfMonthIndex = computed(
      () => findIndex(weeks.value[1], (day: any) => day.originalDate.getDate() === 1))

    if (weeksToShow.value === 1 && firstOfMonthIndex.value >= 0) {
      // if we only show one week, replace the header with short month name
      const firstOfMonthIndexOffset = (firstOfMonthIndex.value + firstDayOfWeek.value) % DAYS_IN_WEEK
      dayLabels[firstOfMonthIndexOffset] = strings.value.shortMonths[weeks![1][firstOfMonthIndex].originalDate.getMonth()]
    }

    return () => h('tr', [
      showWeekNumbers.value && h('th', { class: classNames.value.dayCell }),
      ...dayLabels.value.map((val: string, index: number) => {
        const i = (index + firstDayOfWeek.value) % DAYS_IN_WEEK
        const label = index === firstOfMonthIndex.value
          ? strings.value.days[i] + ' ' + dayLabels.value[i]
          : strings.value.days[i]

        return h('th', {
          class: css(classNames.value.dayCell, classNames.value.weekDayLabelCell),
          attrs: {
            scope: 'col',
            title: label,
            'data-is-focusable': allFocusable.value ? true : undefined,
          },
        }, dayLabels.value[i])
      }),
    ])
  },
})
