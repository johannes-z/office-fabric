import { css } from '@fluentui-vue/utilities'
import { type PropType, computed, defineComponent, h, ref, toRefs } from 'vue'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { compareDates } from '@fluentui/date-time-utilities'
import type { ICalendarDayGridStyles } from '..'
import { makeCalendarDayGridProps } from '../Calendar/makeProps'
import { type IDayInfo, type IWeekCorners } from './CalendarDayGrid.base'
import type { ICalendarGridRowProps } from './CalendarGridRow'
import { asSlotProps, makeStylingProps } from '@/utils'

export interface ICalendarGridDayCellProps extends ICalendarGridRowProps {
  day: IDayInfo
  dayIndex: number
}

export const CalendarGridDayCell = defineComponent({
  name: 'CalendarGridDayCell',

  inheritAttrs: false,

  props: {
    ...makeStylingProps(),
    ...makeCalendarDayGridProps(),
    day: { type: Object as PropType<IDayInfo>, required: true },
    dayIndex: { type: Number, required: true },
    rowClassName: { type: String, default: '' },
    classNames: { type: Object as PropType<IProcessedStyleSet<ICalendarDayGridStyles>>, required: true },
    weeks: { type: Array as PropType<IDayInfo[][]>, required: true },
    week: { type: Array as PropType<IDayInfo[]>, required: true },
    weekIndex: { type: Number, required: true },
    weekCorners: { type: Object as PropType<IWeekCorners>, default: undefined },
  },

  setup(props, { attrs, slots }) {
    const cornerStyle = computed(() => props.weekCorners?.[`${props.weekIndex}_${props.dayIndex}`] ?? '')
    const isNavigatedDate = computed(() => compareDates(props.navigatedDate, props.day.originalDate))

    const ariaLabel = computed(() => {
      const label = `${props.day.originalDate.getDate()}, ${props.strings.months[props.day.originalDate.getMonth()]}, ${props.day.originalDate.getFullYear()}`
      if (props.day.isMarked)
        return `${label}, ${props.strings.dayMarkedAriaLabel}`
      return label
    })

    const slotProps = computed(() => asSlotProps({
      dayCell: {
        'class': css(
          props.classNames.dayCell,
          props.weekCorners && cornerStyle.value,
          props.day.isSelected && props.classNames.daySelected,
          props.day.isSelected && 'ms-CalendarDay-daySelected',
          !props.day.isInBounds && props.classNames.dayOutsideBounds,
          !props.day.isInMonth && props.classNames.dayOutsideNavigatedMonth,
        ),
        'ariaDisabled': !attrs.ariaHidden && !props.day.isInBounds,
        'onClick': props.day.isInBounds ? props.day.onSelected : undefined,
        // TODO add onHover/onKeydown
        'role': 'gridcell',
        'tabIndex': isNavigatedDate.value ? 0 : undefined,
        'ariaCurrent': props.day.isToday ? 'date' : undefined,
        'ariaSelected': props.day.isInBounds ? props.day.isSelected : undefined,
        'data-is-focusable': !attrs.ariaHidden && (props.allFocusable || (props.day.isInBounds ? true : undefined)),
      },
      dayButton: {
        'key': `${props.day.key}button`,
        'ariaHidden': attrs.ariaHidden,
        'ariaLabel': ariaLabel.value,
        'id': isNavigatedDate.value ? attrs.activeDescendantId : undefined,
        'disabled': !attrs.ariaHidden && !props.day.isInBounds,
        'tabIndex': -1,
        'data-is-focusable': 'false',
        'class': css(
          props.classNames.dayButton,
          props.day.isToday && props.classNames.dayIsToday,
          props.day.isToday && 'ms-CalendarDay-dayIsToday',
        ),
        'type': 'button',
      },
      day: {
        ariaHidden: true,
      },
      dayMarker: {
        class: props.classNames.dayMarker,
        ariaHidden: true,
      },
    }))

    return () => h('td', slotProps.value.dayCell, [
      h('button', slotProps.value.dayButton, [
        h('span', slotProps.value.day, props.dateTimeFormatter.formatDay(props.day.originalDate)),
        props.day.isMarked && h('div', slotProps.value.dayMarker),
      ]),
    ])
  },
})
