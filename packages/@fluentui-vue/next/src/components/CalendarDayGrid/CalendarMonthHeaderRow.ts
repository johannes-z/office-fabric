import { css, findIndex } from '@fluentui-vue/utilities'
import { DAYS_IN_WEEK } from '@fluentui/date-time-utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { type PropType, computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { makeCalendarDayGridProps } from '../Calendar/makeProps'
import { type IDayInfo } from './CalendarDayGrid.base'
import type { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { asSlotProps, makeStylingProps, propsFactory, propsFactoryFromInterface } from '@/utils'
import { useRender } from '@/composables'

export interface ICalendarDayMonthHeaderRowProps extends ICalendarDayGridProps {
  weeks: IDayInfo[][]
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>
}

const makeCalendarMonthHeaderRowProps = propsFactoryFromInterface<ICalendarDayMonthHeaderRowProps>()({
  ...makeStylingProps(),
  ...makeCalendarDayGridProps(),
  weeks: { type: Array as PropType<IDayInfo[][]>, required: true },
  classNames: { type: Object as PropType<IProcessedStyleSet<ICalendarDayGridStyles>>, required: true },
}, 'CalendarMonthHeaderRow')

export const CalendarMonthHeaderRow = defineComponent({
  name: 'CalendarMonthHeaderRow',

  props: makeCalendarMonthHeaderRowProps(),

  setup(props, { attrs, slots }) {
    const dayLabels = ref<string[]>([])
    const firstOfMonthIndex = computed(() => findIndex(props.weeks[1], (day: IDayInfo) => day.originalDate.getDate() === 1))
    watchEffect(() => {
      dayLabels.value = props.strings.shortDays.slice()
      if (props.weeksToShow === 1 && firstOfMonthIndex.value >= 0) {
        // if we only show one week, replace the header with short month name
        const firstOfMonthIndexOffset = (firstOfMonthIndex.value + props.firstDayOfWeek) % DAYS_IN_WEEK
        dayLabels.value[firstOfMonthIndexOffset] = props.strings.shortMonths[props.weeks[1][firstOfMonthIndex.value].originalDate.getMonth()]
      }
    })

    const slotProps = computed(() => asSlotProps({
      dayCellWeekNumber: {
        class: props.classNames.dayCell,
      },
      dayCell: {
        class: css(props.classNames.dayCell, props.classNames.weekDayLabelCell),
        scope: 'col',
        'data-is-focusable': props.allFocusable ? true : undefined,
      },
    }))

    useRender(() => h('tr', [
      props.showWeekNumbers && h('th', slotProps.value.dayCellWeekNumber),
      ...dayLabels.value.map((val, index) => {
        const i = (index + props.firstDayOfWeek) % DAYS_IN_WEEK
        const label = props.strings.days[i]

        return h('th', {
          ...slotProps.value.dayCell,
          'key': `${dayLabels.value[i]} ${index}`,
          'title': label,
          'aria-label': label,
        }, dayLabels.value[i])
      }),
    ]))
  },
})
