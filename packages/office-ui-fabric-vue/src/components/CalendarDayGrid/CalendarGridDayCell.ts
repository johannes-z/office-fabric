import { DEFAULT_DATE_FORMATTING } from '@fluentui/date-time-utilities'
import { css } from '@uifabric-vue/utilities'
import { computed, defineComponent, h, PropType, toRefs } from '@vue/composition-api'
import { IDateFormatting } from '..'
import { IDayInfo } from './CalendarDayGrid.base'

export const CalendarGridDayCell = defineComponent({
  name: 'CalendarGridDayCell',

  props: {
    day: { type: Object as PropType<IDayInfo>, required: true },
    dayIndex: { type: Number, required: true },
    weekIndex: { type: Number, required: true },

    dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: () => DEFAULT_DATE_FORMATTING },
    classNames: { type: Object, default: () => {} },

    weekCorners: { type: Object, default: undefined },
  },

  setup (props, { emit }) {
    const {
      classNames,
      day,
      dayIndex,
      weekIndex,
      dateTimeFormatter,
      weekCorners,
    } = toRefs(props)

    const cornerStyle = computed(() => weekCorners.value?.[weekIndex.value + '_' + dayIndex.value] ?? '')

    return () => h('td', {
      class: css(
        classNames.value.dayCell,
        weekCorners.value && cornerStyle.value,
        day.value.isSelected && classNames.value.daySelected,
        day.value.isSelected && 'ms-CalendarDay-daySelected',
        !day.value.isInBounds && classNames.value.dayOutsideBounds,
        !day.value.isInMonth && classNames.value.dayOutsideNavigatedMonth,
      ),
      on: {
        ...day.value.isInBounds && { click: day.value.onSelected },
      },
    }, [
      h('button', {
        class: css(
          classNames.value.dayButton,
          day.value.isToday && classNames.value.dayIsToday,
          day.value.isToday && 'ms-CalendarDay-dayIsToday',
        ),
        attrs: {
          disabled: !day.value.isInBounds,
          role: 'gridcell',
        },
      }, [
        h('span', dateTimeFormatter.value.formatDay(day.value.originalDate)),
        day.value.isMarked && h('div', { class: classNames.value.dayMarker }),
      ]),
    ])
  },
})
