import { MappedType } from '@/types'
import { compareDates } from '@fluentui/date-time-utilities'
import { css, KeyCodes } from '@uifabric-vue/utilities'
import Vue, { PropType, VNode } from 'vue'
import { withCalendarProps } from '../Calendar/useCalendar'
import { IDayInfo } from './CalendarDayGrid.base'
import { ICalendarGridRowProps } from './CalendarGridRow'
import { withCalendarGridRowProps } from './useCalendarDayGrid'

export interface ICalendarGridDayCellProps extends ICalendarGridRowProps {
  day: IDayInfo;
  dayIndex: number;
}

export const CalendarGridDayCell = Vue.extend({
  name: 'CalendarGridDayCell',

  props: {
    ...withCalendarProps(),
    ...withCalendarGridRowProps(),

    day: { type: Object as PropType<IDayInfo>, required: true },
    dayIndex: { type: Number, required: true },
  } as MappedType<ICalendarGridDayCellProps>,

  data () {
    return {
      isHovering: false,
      isPressing: false,
    }
  },

  computed: {
    cornerStyle (): string {
      return this.weekCorners?.[this.weekIndex + '_' + this.dayIndex] ?? ''
    },
    isNavigatedDate (): boolean {
      const { navigatedDate, day } = this
      return compareDates(navigatedDate as unknown as Date, day.originalDate)
    },
    ariaLabel (): string {
      const { day, strings } = this
      return [
        day.originalDate.getDate(),
        strings.months[day.originalDate.getMonth()],
        day.originalDate.getFullYear(),
        day.isMarked && strings.dayMarkedAriaLabel,
      ].filter(e => e).join(', ')
    },
  },

  methods: {
    onMouseOverDay (ev: MouseEvent): void {
      this.isHovering = true
    },
    onMouseOutDay  (ev: MouseEvent): void {
      this.isHovering = false
      this.isPressing = false
    },
    onMouseDownDay (ev: MouseEvent): void {
      this.isPressing = true
    },
    onMouseUpDay (ev: MouseEvent): void {
      this.isPressing = false
    },
    onDayKeyDown (ev: KeyboardEvent): void {
      if (ev.which === KeyCodes.enter) {
        // onSelectDate?.(day.originalDate);
        console.log('onSelectDate')
      } else {
        // navigateMonthEdge(ev, day.originalDate);
        console.log('navigateMonthEdge')
      }
    },
  },

  render (h): VNode {
    const {
      allFocusable,
      ariaHidden,
      ariaLabel,
      classNames,
      day,
      dateTimeFormatter,
      weekCorners,
      activeDescendantId,

      cornerStyle,
      isNavigatedDate,
    } = this

    return h('td', {
      class: css(
        classNames.dayCell,
        weekCorners && cornerStyle,
        day.isSelected && classNames.daySelected,
        day.isSelected && 'ms-CalendarDay-daySelected',
        !day.isInBounds && classNames.dayOutsideBounds,
        !day.isInMonth && classNames.dayOutsideNavigatedMonth,
        this.isHovering && 'ms-CalendarDay-hoverStyle',
        this.isPressing && 'ms-CalendarDay-pressedStyle',
      ),
      attrs: {
        role: 'gridcell',
        tabIndex: isNavigatedDate ? 0 : undefined,
        'aria-hidden': ariaHidden,
        'aria-disabled': !ariaHidden && !day.isInBounds,
        'aria-readonly': true,
        'aria-current': day.isSelected ? 'date' : undefined,
        'aria-selected': day.isInBounds ? day.isSelected : undefined,
        'data-is-focusable': !ariaHidden && (allFocusable || (day.isInBounds ? true : undefined)),
      },
      on: {
        ...day.isInBounds && !ariaHidden && { click: day.onSelected },
        ...!ariaHidden && {
          mouseover: this.onMouseOverDay,
          mouseout: this.onMouseOutDay,
          mousedown: this.onMouseDownDay,
          mouseup: this.onMouseUpDay,
          keyDown: this.onDayKeyDown,
        },
      },
    }, [
      h('button', {
        key: day.key + 'button',
        class: css(
          classNames.dayButton,
          day.isToday && classNames.dayIsToday,
          day.isToday && 'ms-CalendarDay-dayIsToday',
        ),
        attrs: {
          'aria-hidden': ariaHidden,
          'aria-label': ariaLabel,
          id: isNavigatedDate ? activeDescendantId : undefined,
          disabled: !ariaHidden && !day.isInBounds,
          type: 'button',
          tabIndex: -1,
          'data-is-focusable': false,
        },
        // ref
      }, [
        h('span', { attrs: { 'aria-hidden': 'true' } }, dateTimeFormatter.formatDay(day.originalDate)),
        day.isMarked && h('div', { attrs: { 'aria-hidden': 'true' }, class: classNames.dayMarker }),
      ]),
    ])
  },
})
