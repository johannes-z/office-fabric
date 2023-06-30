import { classNamesFunction, getRTL } from '@fluentui-vue/utilities'
import type { DayOfWeek, IDay } from '@fluentui/date-time-utilities'
import { DAYS_IN_WEEK, DateRangeType, compareDates, getBoundedDateRange, getDateRangeArray, getDayGrid, isRestrictedDate } from '@fluentui/date-time-utilities'
import { type ComputedRef, computed, defineComponent, h, ref, toRefs } from 'vue'
import { useId } from '@fluentui-vue/hooks'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { makeCalendarDayGridProps } from '../Calendar/makeProps'
import type { ICalendarDayGridProps, ICalendarDayGridStyleProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { CalendarGridRow } from './CalendarGridRow'
import { CalendarMonthHeaderRow } from './CalendarMonthHeaderRow'

const getClassNames = classNamesFunction<ICalendarDayGridStyleProps, ICalendarDayGridStyles>()

export interface IWeekCorners {
  [key: string]: string
}

export interface IDayInfo extends IDay {
  onSelected: () => void
  setRef(element: HTMLElement | null): void
}

function useWeeks(
  props: ICalendarDayGridProps,
  onSelectDate: (date: Date) => void,
  getSetRefCallback: (dayKey: string) => (element: HTMLElement | null) => void,
): ComputedRef<IDayInfo[][]> {
  /**
   * Initial parsing of the given props to generate IDayInfo two dimensional array, which contains a representation
   * of every day in the grid. Convenient for helping with conversions between day refs and Date objects in callbacks.
   */
  const weeks = computed(() => {
    const weeksGrid = getDayGrid(props)

    const firstVisibleDay = weeksGrid[1][0].originalDate
    const lastVisibleDay = weeksGrid[weeksGrid.length - 1][6].originalDate
    const markedDays = props.getMarkedDays?.(firstVisibleDay, lastVisibleDay) || []

    /**
     * Weeks is a 2D array. Weeks[0] contains the last week of the prior range,
     * Weeks[weeks.length - 1] contains first week of next range. These are for transition states.
     *
     * Weeks[1... weeks.length - 2] contains the actual visible data
     */
    const returnValue: IDayInfo[][] = []

    for (let weekIndex = 0; weekIndex < weeksGrid.length; weekIndex++) {
      const week: IDayInfo[] = []
      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        const day = weeksGrid[weekIndex][dayIndex]
        const dayInfo: IDayInfo = {
          onSelected: () => onSelectDate(day.originalDate),
          setRef: getSetRefCallback(day.key),
          ...day,
          isMarked: day.isMarked || markedDays?.some(markedDay => compareDates(day.originalDate, markedDay)),
        }

        week.push(dayInfo)
      }
      returnValue.push(week)
    }

    return returnValue
  })

  return weeks
}

function useWeekCornerStyles(props: ICalendarDayGridProps) {
  /**
   *
   * Section for setting the rounded corner styles on individual day cells. Individual day cells need different
   * corners to be rounded depending on which date range type and where the cell is located in the current grid.
   * If we just round all of the corners, there isn't a good overlap and we get gaps between contiguous day boxes
   * in Edge browser.
   *
   */
  const getWeekCornerStyles = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    initialWeeks: IDayInfo[][],
  ): IWeekCorners => {
    const weekCornersStyled: { [key: string]: string } = {}
    /* need to handle setting all of the corners on arbitrarily shaped blobs
          __
       __|A |
      |B |C |__
      |D |E |F |

      in this case, A needs top left rounded, top right rounded
      B needs top left rounded
      C doesn't need any rounding
      D needs bottom left rounded
      E doesn't need any rounding
      F needs top right rounding
    */

    // cut off the animation transition weeks
    const weeks = initialWeeks.slice(1, initialWeeks.length - 1)

    // if there's an item above, lose both top corners. Item below, lose both bottom corners, etc.
    weeks.forEach((week: IDayInfo[], weekIndex: number) => {
      week.forEach((day: IDayInfo, dayIndex: number) => {
        const above
          = weeks[weekIndex - 1]
          && weeks[weekIndex - 1][dayIndex]
          && isInSameHoverRange(
            weeks[weekIndex - 1][dayIndex].originalDate,
            day.originalDate,
            weeks[weekIndex - 1][dayIndex].isSelected,
            day.isSelected,
          )
        const below
          = weeks[weekIndex + 1]
          && weeks[weekIndex + 1][dayIndex]
          && isInSameHoverRange(
            weeks[weekIndex + 1][dayIndex].originalDate,
            day.originalDate,
            weeks[weekIndex + 1][dayIndex].isSelected,
            day.isSelected,
          )
        const left
          = weeks[weekIndex][dayIndex - 1]
          && isInSameHoverRange(
            weeks[weekIndex][dayIndex - 1].originalDate,
            day.originalDate,
            weeks[weekIndex][dayIndex - 1].isSelected,
            day.isSelected,
          )
        const right
          = weeks[weekIndex][dayIndex + 1]
          && isInSameHoverRange(
            weeks[weekIndex][dayIndex + 1].originalDate,
            day.originalDate,
            weeks[weekIndex][dayIndex + 1].isSelected,
            day.isSelected,
          )

        const style = []
        style.push(calculateRoundedStyles(classNames, above, below, left, right))
        style.push(calculateBorderStyles(classNames, above, below, left, right))

        weekCornersStyled[`${weekIndex}_${dayIndex}`] = style.join(' ')
      })
    })

    return weekCornersStyled
  }

  const calculateRoundedStyles = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string => {
    const style = []
    const roundedTopLeft = !above && !left
    const roundedTopRight = !above && !right
    const roundedBottomLeft = !below && !left
    const roundedBottomRight = !below && !right

    if (roundedTopLeft)
      style.push(getRTL() ? classNames.topRightCornerDate : classNames.topLeftCornerDate)

    if (roundedTopRight)
      style.push(getRTL() ? classNames.topLeftCornerDate : classNames.topRightCornerDate)

    if (roundedBottomLeft)
      style.push(getRTL() ? classNames.bottomRightCornerDate : classNames.bottomLeftCornerDate)

    if (roundedBottomRight)
      style.push(getRTL() ? classNames.bottomLeftCornerDate : classNames.bottomRightCornerDate)

    return style.join(' ')
  }

  const calculateBorderStyles = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string => {
    const style = []

    if (!above)
      style.push(classNames.datesAbove)

    if (!below)
      style.push(classNames.datesBelow)

    if (!left)
      style.push(getRTL() ? classNames.datesRight : classNames.datesLeft)

    if (!right)
      style.push(getRTL() ? classNames.datesLeft : classNames.datesRight)

    return style.join(' ')
  }

  const isInSameHoverRange = (date1: Date, date2: Date, date1Selected: boolean, date2Selected: boolean): boolean => {
    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = props.dateRangeType === DateRangeType.WorkWeek
      ? DateRangeType.Week
      : props.dateRangeType

    // we do not pass daysToSelectInDayView because we handle setting those styles dyanamically in onMouseOver
    const dateRange = getDateRangeArray(date1, dateRangeHoverType, props.firstDayOfWeek, props.workWeekDays)

    if (date1Selected !== date2Selected) {
      // if one is selected and the other is not, they can't be in the same range
      return false
    }
    else if (date1Selected && date2Selected) {
      // if they're both selected at the same time they must be in the same range
      return true
    }

    // otherwise, both must be unselected, so check the dateRange
    return dateRange.filter((date: Date) => date.getTime() === date2.getTime()).length > 0
  }

  return [getWeekCornerStyles, calculateRoundedStyles] as const
}

export const CalendarDayGridBase = defineComponent({
  name: 'CalendarDayGridBase',

  props: makeCalendarDayGridProps(),

  setup(props, { attrs, emit, slots }) {
    const animateBackwards = ref(false)

    const onSelectDate = (selectedDate: Date): void => {
      // we can destructure props because they don't have to be reactive within the callback
      const { dateRangeType, firstDayOfWeek, minDate, maxDate, workWeekDays, daysToSelectInDayView, restrictedDates } = props
      const restrictedDatesOptions = { minDate, maxDate, restrictedDates }

      let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays, daysToSelectInDayView)
      dateRange = getBoundedDateRange(dateRange, minDate, maxDate)

      dateRange = dateRange.filter((d: Date) => {
        return !isRestrictedDate(d, restrictedDatesOptions)
      })

      props.onSelectDate?.(selectedDate, dateRange)
      props.onNavigateDate?.(selectedDate, true)
    }

    const weeks = useWeeks(props, onSelectDate, () => { })

    const [getWeekCornerStyles, calculateRoundedStyles] = useWeekCornerStyles(props)
    const weekCorners = computed(() => getWeekCornerStyles(classNames.value, weeks.value))

    const activeDescendantId = useId()

    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme,
      className: props.className,
      dateRangeType: props.dateRangeType,
      showWeekNumbers: props.showWeekNumbers,
      lightenDaysOutsideNavigatedMonth: props.lightenDaysOutsideNavigatedMonth === undefined
        ? true
        : props.lightenDaysOutsideNavigatedMonth,
      animationDirection: props.animationDirection,
      animateBackwards: animateBackwards.value,
    }))

    const slotProps = computed(() => {
      const partialWeekProps = {
        weeks: weeks.value,
        classNames: classNames.value,
        activeDescendantId,
        calculateRoundedStyles,
        weekCorners: weekCorners.value,
      }
      return {
        wrapper: {
          class: classNames.value.wrapper,
          preventDefaultWhenHandled: true,
        },
        table: {
          class: classNames.value.table,
          'aria-multiselectable': false,
          'aria-labelledby': attrs.labelledBy,
          'aria-activedescendant': activeDescendantId,
          role: 'grid',
        },
        monthHeaderRow: {
          ...props,
          classNames: classNames.value,
          weeks: weeks.value,
        },
        firstTransitionWeek: {
          ...props,
          ...partialWeekProps,
          week: weeks.value[0],
          weekIndex: -1,
          rowClassName: classNames.value.firstTransitionWeek,
          'aria-role': 'presentation',
          'aria-hidden': true,
        },
        weekRow: {
          ...props,
          ...partialWeekProps,
          rowClassName: classNames.value.weekRow,
        },
        lastTransitionWeek: {
          ...props,
          ...partialWeekProps,
          week: weeks.value[weeks.value.length - 1],
          weekIndex: -2,
          rowClassName: classNames.value.lastTransitionWeek,
          'aria-role': 'presentation',
          'aria-hidden': true,
        },
      }
    })

    // TODO FocusZone
    return () => h('div', slotProps.value.wrapper, [
      h('table', slotProps.value.table, [
        h('tbody', [
          h(CalendarMonthHeaderRow, slotProps.value.monthHeaderRow),
          h(CalendarGridRow, slotProps.value.firstTransitionWeek),
          weeks.value.slice(1, weeks.value.length - 1).map((week, weekIndex) => h(CalendarGridRow, {
            ...slotProps.value.weekRow,
            key: weekIndex,
            week,
            weekIndex,
          })),
          h(CalendarGridRow, slotProps.value.lastTransitionWeek),
        ]),
      ]),
    ])
  },
})

/**
 * When given work week, if the days are non-contiguous, the hover states look really weird. So for non-contiguous
 * work weeks, we'll just show week view instead.
 */
function getDateRangeTypeToUse(dateRangeType: DateRangeType, workWeekDays: DayOfWeek[] | undefined): DateRangeType {
  if (workWeekDays && dateRangeType === DateRangeType.WorkWeek) {
    const sortedWWDays = workWeekDays.slice().sort()
    let isContiguous = true
    for (let i = 1; i < sortedWWDays.length; i++) {
      if (sortedWWDays[i] !== sortedWWDays[i - 1] + 1) {
        isContiguous = false
        break
      }
    }

    if (!isContiguous || workWeekDays.length === 0)
      return DateRangeType.Week
  }

  return dateRangeType
}
