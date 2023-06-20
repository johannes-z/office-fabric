import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { DAYS_IN_WEEK } from '@fluentui/date-time-utilities'
import { css, findIndex } from '@fluentui-vue/utilities'
import type { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { makeCalendarDayGridProps } from './makeProps'
import type { IDayInfo } from './CalendarDayGrid.base'
import { asSlotProps, makeStylingProps } from '@/utils'

export interface ICalendarDayMonthHeaderRowProps extends ICalendarDayGridProps {
  weeks: IDayInfo[][]
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>
}

export const CalendarMonthHeaderRow = defineComponent({
  name: 'CalendarMonthHeaderRow',

  props: {
    ...makeStylingProps(),
    ...makeCalendarDayGridProps(),
  },

  setup(props, { attrs, slots }) {
    const {
      classNames,
      showWeekNumbers,
      strings,
      weeksToShow,
      firstDayOfWeek,
      allFocusable,
      weeks,
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
      dayCell: {
        class: classNames.value.dayCell,
      },
    }))
    return () => h('tr', [
      showWeekNumbers.value && h('th', slotProps.value.dayCell),
      ...dayLabels.value.map((val, index) => {
        const i = (index + firstDayOfWeek.value) % DAYS_IN_WEEK
        const label = strings.value.days[i]

        return h('th', {
          class: css(classNames.value.dayCell, classNames.value.weekDayLabelCell),
          scope: 'col',
          key: `${dayLabels.value[i]} ${index}`,
          title: label,
          ariaLabel: label,
          dataIsFocusable: allFocusable.value ? true : undefined,
        }, dayLabels.value[i])
      }),
    ])
  },
})
