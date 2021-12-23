import { MappedType } from '@/types'
import { addDays, addWeeks, compareDates, findAvailableDate, IAvailableDateOptions } from '@fluentui/date-time-utilities'
import { css, getRTLSafeKeyCode, KeyCodes } from '@uifabric-vue/utilities'
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
    navigateMonthEdge (ev: KeyboardEvent, date: Date): void {
      const {
        restrictedDates,
        minDate,
        maxDate,
        weeks,
      } = this
      let targetDate: Date | undefined
      let direction = 1 // by default search forward

      if (ev.which === KeyCodes.up) {
        targetDate = addWeeks(date, -1)
        direction = -1
      } else if (ev.which === KeyCodes.down) {
        targetDate = addWeeks(date, 1)
      } else if (ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
        targetDate = addDays(date, -1)
        direction = -1
      } else if (ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
        targetDate = addDays(date, 1)
      }

      if (!targetDate) {
        // if we couldn't find a target date at all, do nothing
        return
      }

      const findAvailableDateOptions: IAvailableDateOptions = {
        initialDate: date,
        targetDate,
        direction,
        restrictedDates,
        minDate,
        maxDate,
      }

      // target date is restricted, search in whatever direction until finding the next possible date,
      // stopping at boundaries
      let nextDate = findAvailableDate(findAvailableDateOptions)

      if (!nextDate) {
      // if no dates available in initial direction, try going backwards
        findAvailableDateOptions.direction = -direction
        nextDate = findAvailableDate(findAvailableDateOptions)
      }

      // if the nextDate is still inside the same focusZone area, let the focusZone handle setting the focus so we
      // don't jump the view unnecessarily
      const isInCurrentView =
      weeks &&
      nextDate &&
      weeks.slice(1, weeks.length - 1).some((week: IDayInfo[]) => {
        return week.some((dayToCompare: IDayInfo) => {
          return compareDates(dayToCompare.originalDate, nextDate!)
        })
      })
      if (isInCurrentView) {
        return
      }

      // else, fire navigation on the date to change the view to show it
      if (nextDate) {
        this.$emit('onNavigateDate', nextDate, true)
        ev.preventDefault()
      }
    },
    onMouseOverDay (ev: MouseEvent): void {
      this.isHovering = true
    },
    onMouseOutDay (ev: MouseEvent): void {
      this.isHovering = false
      this.isPressing = false
    },
    onMouseDownDay (ev: MouseEvent): void {
      this.isPressing = true
    },
    onMouseUpDay (ev: MouseEvent): void {
      this.isPressing = false
    },
    onDayKeyDown (ev: KeyboardEvent, day: IDayInfo): void {
      if (ev.which === KeyCodes.enter) {
        this.$emit('onSelectDate', day.originalDate)
      } else {
        this.navigateMonthEdge(ev, day.originalDate)
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
          keydown: (e: KeyboardEvent) => this.onDayKeyDown(e, day),
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
