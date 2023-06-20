import { css } from '@fluentui-vue/utilities'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import type { IDayInfo } from './CalendarDayGrid.base'
import { makeCalendarDayGridProps } from './makeProps'
import { asSlotProps, makeStylingProps } from '@/utils'

export const CalendarGridDayCell = defineComponent({
  name: 'CalendarGridDayCell',

  props: {
    ...makeStylingProps(),
    ...makeCalendarDayGridProps(),
    day: { type: Object as PropType<IDayInfo>, required: true },
    dayIndex: { type: Number, required: true },
  },

  setup(props, { attrs, slots }) {
    const {
      classNames,
      day,
      dayIndex,
      dateTimeFormatter,
    } = toRefs(props)

    const slotProps = computed(() => asSlotProps({
      dayCell: {
        class: css(
          classNames.value.dayCell,
          day.value.isSelected && classNames.value.daySelected,
          day.value.isSelected && 'ms-CalendarDay-daySelected',
          !day.value.isInBounds && classNames.value.dayOutsideBounds,
          !day.value.isInMonth && classNames.value.dayOutsideNavigatedMonth,
        ),
        role: 'gridcell',
      },
      dayButton: {
        class: css(
          classNames.value.dayButton,
        ),
        type: 'button',
      },
      dayMarker: {
        'class': classNames.value.dayMarker,
        'aria-hidden': true,
      },
    }))

    return () => h('td', slotProps.value.dayCell, [
      h('button', slotProps.value.dayButton, [
        h('span', { 'aria-hidden': true }, dateTimeFormatter.value?.formatDay(day.value.originalDate)),
        day.value.isMarked && h('div', slotProps.value.dayMarker),
      ]),
    ])
  },
})
