import { type PropType, computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import type { ICalendarStrings } from '@fluentui/date-time-utilities'
import { DAYS_IN_WEEK, DayOfWeek } from '@fluentui/date-time-utilities'
import { css, findIndex } from '@fluentui-vue/utilities'
import { makeCalendarProps } from '../Calendar/makeProps'
import type { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { makeCalendarDayGridProps } from './makeProps'
import type { IDayInfo } from './CalendarDayGrid.base'
import { asSlotProps, makeStylingProps, propsFactoryFromInterface } from '@/utils'

export interface ICalendarDayMonthHeaderRowProps extends ICalendarDayGridProps {
  weeks: IDayInfo[][]
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>
}

export const makeCalendarMonthHeaderRowProps = propsFactoryFromInterface<ICalendarDayMonthHeaderRowProps>()({
  ...makeCalendarDayGridProps(),

  weeks: { type: Array as PropType<IDayInfo[][]>, required: true },
  classNames: { type: Object as PropType<IProcessedStyleSet<ICalendarDayGridStyles>>, required: true },
}, 'CalendarMonthHeaderRow')

export const CalendarMonthHeaderRow = defineComponent({
  name: 'CalendarMonthHeaderRow',

  // inheritAttrs: false,

  props: {
    ...makeCalendarDayGridProps(),
    weeks: { type: Array as PropType<IDayInfo[][]>, required: true },
    classNames: { type: Object as PropType<IProcessedStyleSet<ICalendarDayGridStyles>>, required: true },
    strings: { type: Object as PropType<ICalendarStrings>, required: true },

    showWeekNumbers: { type: Boolean, default: false },
    firstDayOfWeek: { type: Number as PropType<DayOfWeek>, default: DayOfWeek.Sunday },
    allFocusable: { type: Boolean, default: false },
    weeksToShow: { type: Number, default: undefined },
  },

  setup(props, { attrs, slots }) {
    const {
      showWeekNumbers,
      strings,
      firstDayOfWeek,
      allFocusable,
      weeksToShow,
      weeks,
      classNames,
    } = toRefs(props)

    const dayLabels = ref<string[]>([])

    const firstOfMonthIndex = computed(() => findIndex(weeks.value[1], (day: IDayInfo) => day.originalDate.getDate() === 1))
    watchEffect(() => {
      dayLabels.value = strings.value.shortDays.slice()
      if (weeksToShow.value === 1 && firstOfMonthIndex.value >= 0) {
        // if we only show one week, replace the header with short month name
        const firstOfMonthIndexOffset = (firstOfMonthIndex.value + firstDayOfWeek.value) % DAYS_IN_WEEK
        dayLabels.value[firstOfMonthIndexOffset] = strings.value.shortMonths[weeks.value[1][firstOfMonthIndex.value].originalDate.getMonth()]
      }
    })

    const slotProps = computed(() => asSlotProps({
      dayCellWeekNumber: {
        class: classNames.value.dayCell,
      },
      dayCell: {
        class: css(classNames.value.dayCell, classNames.value.weekDayLabelCell),
        scope: 'col',
        dataIsFocusable: allFocusable.value ? true : undefined,
      },
    }))

    return () => h('tr', [
      showWeekNumbers.value && h('th', slotProps.value.dayCellWeekNumber),
      ...dayLabels.value.map((val, index) => {
        const i = (index + firstDayOfWeek.value) % DAYS_IN_WEEK
        const label = strings.value.days[i]

        return h('th', {
          ...slotProps.value.dayCell,
          key: `${dayLabels.value[i]} ${index}`,
          title: label,
          ariaLabel: label,
        }, dayLabels.value[i])
      }),
    ])
  },
})
