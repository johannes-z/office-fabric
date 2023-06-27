import { css } from '@fluentui-vue/utilities'
import { type PropType, computed, defineComponent, h, ref, toRefs } from 'vue'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { DateRangeType, type IAvailableDateOptions, addDays, addWeeks, compareDates, findAvailableDate } from '@fluentui/date-time-utilities'
import type { ICalendarDayGridStyles } from '..'
import { makeCalendarDayGridProps } from '../Calendar/makeProps'
import { type IDayInfo, type IWeekCorners } from './CalendarDayGrid.base'
import type { ICalendarGridRowProps } from './CalendarGridRow'
import { asSlotProps, defineFunctionalComponent, makeStylingProps, propsFactoryFromInterface } from '@/utils'

export interface ICalendarGridDayCellProps extends ICalendarGridRowProps {
  day: IDayInfo
  dayIndex: number
}

const makeCalendarGridDayCellProps = propsFactoryFromInterface<ICalendarGridDayCellProps>()({
  ...makeStylingProps(),
  ...makeCalendarDayGridProps(),
  day: { type: Object, required: true },
  dayIndex: { type: Number, required: true },
  rowClassName: { type: String, default: '' },
  classNames: { type: Object, required: true },
  weeks: { type: Array, required: true },
  week: { type: Array, required: true },
  weekIndex: { type: Number, required: true },
  weekCorners: { type: Object, default: undefined },
  ariaHidden: { type: String, default: undefined },
  ariaRole: { type: String, default: undefined },
  activeDescendantId: { type: String, required: true },
  calculateRoundedStyles: { type: Function, required: true },
  getDayInfosInRangeOfDay: { type: Function, required: true },
  getRefsFromDayInfos: { type: Function, required: true },
}, 'CalendarGridDayCell')

export const CalendarGridDayCell = defineFunctionalComponent({
  name: 'CalendarGridDayCell',

  inheritAttrs: false,

  props: makeCalendarGridDayCellProps(),

  render(props, { attrs, slots }) {
    const {
      navigatedDate,
      dateTimeFormatter,
      allFocusable,
      strings,
      activeDescendantId,
      calculateRoundedStyles,
      weeks,
      classNames,
      day,
      dayIndex,
      weekIndex,
      weekCorners,
      ariaHidden,
      dateRangeType,
      daysToSelectInDayView,
      // onSelectDate,
      restrictedDates,
      minDate,
      maxDate,
      // onNavigateDate,
      getDayInfosInRangeOfDay,
      getRefsFromDayInfos,
    } = props
    const cornerStyle = weekCorners?.[`${weekIndex}_${dayIndex}`] ?? ''
    const isNavigatedDate = compareDates(navigatedDate, day.originalDate)

    let ariaLabel = `${day.originalDate.getDate()}, ${strings.months[day.originalDate.getMonth()]}, ${day.originalDate.getFullYear()}`

    if (day.isMarked)
      ariaLabel = `${ariaLabel}, ${strings.dayMarkedAriaLabel}`

    const slotProps = {
      dayCell: {
        class: css(
          classNames.dayCell,
          weekCorners && cornerStyle,
          day.isSelected && classNames.daySelected,
          day.isSelected && 'ms-CalendarDay-daySelected',
          !day.isInBounds && classNames.dayOutsideBounds,
          !day.isInMonth && classNames.dayOutsideNavigatedMonth,
        ),
        // TODO day.setRef?
        // ref: (element: HTMLTableCellElement) => {
        // },
        'aria-hidden': ariaHidden,
        'aria-disabled': !ariaHidden && !day.isInBounds,
        onClick: day.isInBounds && !ariaHidden ? day.onSelected : undefined,
        // TODO add onHover/onKeydown
        role: 'gridcell',
        'tab-index': isNavigatedDate ? 0 : undefined,
        'aria-current': day.isToday ? 'date' : undefined,
        'aria-selected': day.isInBounds ? day.isSelected : undefined,
        'data-is-focusable': !ariaHidden && (allFocusable || (day.isInBounds ? true : undefined)),
      },
      dayButton: {
        key: `${day.key}button`,
        class: css(
          classNames.dayButton,
          day.isToday && classNames.dayIsToday,
          day.isToday && 'ms-CalendarDay-dayIsToday',
        ),
        'aria-hidden': ariaHidden,
        'aria-label': ariaLabel,
        id: isNavigatedDate ? activeDescendantId : undefined,
        disabled: !ariaHidden && !day.isInBounds,
        type: 'button',
        tabIndex: -1,
        'data-is-focusable': false,
      },
      day: {
        'aria-hidden': true,
      },
      dayMarker: {
        class: classNames.dayMarker,
        'aria-hidden': true,
      },
    }

    return h('td', slotProps.dayCell, [
      h('button', slotProps.dayButton, [
        h('span', slotProps.day, dateTimeFormatter.formatDay(day.originalDate)),
        day.isMarked && h('div', slotProps.dayMarker),
      ]),
    ])
  },
})
