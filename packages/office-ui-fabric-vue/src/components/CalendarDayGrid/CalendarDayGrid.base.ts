import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { compareDates, DateRangeType, DayOfWeek, DAYS_IN_WEEK, getBoundedDateRange, getDateRangeArray, getDayGrid, IDay, isRestrictedDate } from '@fluentui/date-time-utilities'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction, getRTL } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ICalendarDayGridProps } from '..'
import { AnimationDirection } from '../Calendar/Calendar.types'
import { ICalendarDayGridStyleProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { CalendarGridRow } from './CalendarGridRow'
import { CalendarMonthHeaderRow } from './CalendarMonthHeaderRow'
import { withCalendarDayGridProps } from './useCalendarDayGrid'

const getClassNames = classNamesFunction<ICalendarDayGridStyleProps, ICalendarDayGridStyles>()

export interface IWeekCorners {
  [key: string]: string;
}

export interface IDayInfo extends IDay {
  onSelected: () => void;
}

function useWeeks (
  props: ICalendarDayGridProps,
  onSelectDate: (date: Date) => void,
): IDayInfo[][] {
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
        ...day,
        isMarked: day.isMarked || markedDays?.some(markedDay => compareDates(day.originalDate, markedDay)),
      }

      week.push(dayInfo)
    }
    returnValue.push(week)
  }

  return returnValue
}

function useWeekCornerStyles (props: ICalendarDayGridProps) {
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
        const above =
          weeks[weekIndex - 1] &&
          weeks[weekIndex - 1][dayIndex] &&
          isInSameHoverRange(
            weeks[weekIndex - 1][dayIndex].originalDate,
            day.originalDate,
            weeks[weekIndex - 1][dayIndex].isSelected,
            day.isSelected,
          )
        const below =
          weeks[weekIndex + 1] &&
          weeks[weekIndex + 1][dayIndex] &&
          isInSameHoverRange(
            weeks[weekIndex + 1][dayIndex].originalDate,
            day.originalDate,
            weeks[weekIndex + 1][dayIndex].isSelected,
            day.isSelected,
          )
        const left =
          weeks[weekIndex][dayIndex - 1] &&
          isInSameHoverRange(
            weeks[weekIndex][dayIndex - 1].originalDate,
            day.originalDate,
            weeks[weekIndex][dayIndex - 1].isSelected,
            day.isSelected,
          )
        const right =
          weeks[weekIndex][dayIndex + 1] &&
          isInSameHoverRange(
            weeks[weekIndex][dayIndex + 1].originalDate,
            day.originalDate,
            weeks[weekIndex][dayIndex + 1].isSelected,
            day.isSelected,
          )

        const style: any[] = []
        style.push(calculateRoundedStyles(classNames, above, below, left, right))
        style.push(calculateBorderStyles(classNames, above, below, left, right))

        weekCornersStyled[weekIndex + '_' + dayIndex] = style.join(' ')
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
    const style: any[] = []
    const roundedTopLeft = !above && !left
    const roundedTopRight = !above && !right
    const roundedBottomLeft = !below && !left
    const roundedBottomRight = !below && !right

    if (roundedTopLeft) {
      style.push(getRTL() ? classNames.topRightCornerDate : classNames.topLeftCornerDate)
    }
    if (roundedTopRight) {
      style.push(getRTL() ? classNames.topLeftCornerDate : classNames.topRightCornerDate)
    }
    if (roundedBottomLeft) {
      style.push(getRTL() ? classNames.bottomRightCornerDate : classNames.bottomLeftCornerDate)
    }
    if (roundedBottomRight) {
      style.push(getRTL() ? classNames.bottomLeftCornerDate : classNames.bottomRightCornerDate)
    }

    return style.join(' ')
  }

  const calculateBorderStyles = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string => {
    const style: any[] = []

    if (!above) {
      style.push(classNames.datesAbove)
    }
    if (!below) {
      style.push(classNames.datesBelow)
    }
    if (!left) {
      style.push(getRTL() ? classNames.datesRight : classNames.datesLeft)
    }
    if (!right) {
      style.push(getRTL() ? classNames.datesLeft : classNames.datesRight)
    }

    return style.join(' ')
  }

  const isInSameHoverRange = (date1: Date, date2: Date, date1Selected: boolean, date2Selected: boolean): boolean => {
    const { dateRangeType, firstDayOfWeek, workWeekDays } = props

    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = dateRangeType === DateRangeType.WorkWeek ? DateRangeType.Week : dateRangeType

    // we do not pass daysToSelectInDayView because we handle setting those styles dyanamically in onMouseOver
    const dateRange = getDateRangeArray(date1, dateRangeHoverType, firstDayOfWeek, workWeekDays)

    if (date1Selected !== date2Selected) {
      // if one is selected and the other is not, they can't be in the same range
      return false
    } else if (date1Selected && date2Selected) {
      // if they're both selected at the same time they must be in the same range
      return true
    }

    // otherwise, both must be unselected, so check the dateRange
    return dateRange.filter((date: Date) => date.getTime() === date2.getTime()).length > 0
  }

  return [getWeekCornerStyles, calculateRoundedStyles] as const
}

export const CalendarDayGridBase = Vue.extend({
  name: 'CalendarDayGridBase',

  props: {
    ...withThemeableProps(),

    ...withCalendarDayGridProps(),

    showWeekNumbers: { type: Boolean, default: false },
    lightenDaysOutsideNavigatedMonth: { type: Boolean, default: true },
    animationDirection: { type: Number as () => AnimationDirection, default: undefined },

    minDate: { type: Date, default: undefined },
    maxDate: { type: Date, default: undefined },

    weeksToShow: { type: Number, default: undefined },
  } as MappedType<ICalendarDayGridProps>,

  data () {
    return {
      // TODO useAnimateBackwards
      animateBackwards: false,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ICalendarDayGridStyles> {
      return getClassNames(this.styles, {
        theme: this.theme!,
        className: this.className,
        dateRangeType: this.dateRangeType,
        showWeekNumbers: this.showWeekNumbers,
        lightenDaysOutsideNavigatedMonth: this.lightenDaysOutsideNavigatedMonth === undefined
          ? true
          : this.lightenDaysOutsideNavigatedMonth,
        animationDirection: this.animationDirection,
        animateBackwards: this.animateBackwards,
      })
    },
    weeks (): IDayInfo[][] {
      return useWeeks(this.$props as ICalendarDayGridProps, this.onSelectDate)
    },
    weekCornerStyles (): any {
      return useWeekCornerStyles(this.$props as ICalendarDayGridProps)
    },
    weekCorners (): any {
      const [getWeekCornerStyles] = this.weekCornerStyles
      return getWeekCornerStyles(this.classNames, this.weeks!)
    },
    partialWeekProps (): any {
      return {
        weeks: this.weeks,
        classNames: this.classNames,
        weekCorners: this.weekCorners,
      }
    },
  },

  methods: {
    onSelectDate (selectedDate: Date): void {
      const { dateRangeType, firstDayOfWeek, minDate, maxDate, workWeekDays, daysToSelectInDayView, restrictedDates } = this.$props
      const restrictedDatesOptions = { minDate, maxDate, restrictedDates }

      let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays, daysToSelectInDayView)
      dateRange = getBoundedDateRange(dateRange, minDate, maxDate)

      dateRange = dateRange.filter((d: Date) => {
        return !isRestrictedDate(d, restrictedDatesOptions)
      })

      this.$emit('onSelectDate', selectedDate, dateRange)
      this.$emit('onNavigateDate', selectedDate, true)
    },
  },

  render (h): VNode {
    const {
      classNames,
      weeks,
      partialWeekProps,
    } = this

    return h('div', { class: classNames.wrapper }, [
      h('table', { class: classNames.table }, [
        h('tbody', [
          h(CalendarMonthHeaderRow, {
            props: {
              ...this.$props,
              classNames: classNames,
              weeks,
            },
          }),
          h(CalendarGridRow, {
            props: {
              ...this.$props,
              ...partialWeekProps,
              week: weeks[0],
              weekIndex: -1,
              rowClassName: classNames.firstTransitionWeek,
            },
          }),
          ...weeks.slice(1, weeks.length - 1).map((week, weekIndex: number) => h(CalendarGridRow, {
            props: {
              ...this.$props,
              ...partialWeekProps,
              week,
              weekIndex,
              rowClassName: classNames.weekRow,
            },
          })),
          h(CalendarGridRow, {
            props: {
              ...this.$props,
              ...partialWeekProps,
              week: weeks[weeks.length - 1],
              weekIndex: -2,
              rowClassName: classNames.lastTransitionWeek,
            },
          }),
        ]),
      ]),
    ])
  },
})

/**
 * When given work week, if the days are non-contiguous, the hover states look really weird. So for non-contiguous
 * work weeks, we'll just show week view instead.
 */
function getDateRangeTypeToUse (dateRangeType: DateRangeType, workWeekDays: DayOfWeek[] | undefined): DateRangeType {
  if (workWeekDays && dateRangeType === DateRangeType.WorkWeek) {
    const sortedWWDays = workWeekDays.slice().sort()
    let isContiguous = true
    for (let i = 1; i < sortedWWDays.length; i++) {
      if (sortedWWDays[i] !== sortedWWDays[i - 1] + 1) {
        isContiguous = false
        break
      }
    }

    if (!isContiguous || workWeekDays.length === 0) {
      return DateRangeType.Week
    }
  }

  return dateRangeType
}
