import { classNamesFunction } from '@fluentui-vue/utilities'
import { DAYS_IN_WEEK, DateRangeType, addWeeks, compareDates, getDayGrid } from '@fluentui/date-time-utilities'
import type { DayOfWeek, IDay } from '@fluentui/date-time-utilities'
import { type ComputedRef, type PropType, computed, defineComponent, h, ref, toRefs } from 'vue'
import { makeCalendarProps } from '../Calendar/makeProps'
import { AnimationDirection } from '../Calendar/Calendar.types'
import type { ICalendarDayGridProps, ICalendarDayGridStyleProps, ICalendarDayGridStyles } from './CalendarDayGrid.types'
import { CalendarMonthHeaderRow } from './CalendarMonthHeaderRow'
import { CalendarGridRow } from './CalendarGridRow'
import { makeStylingProps } from '@/utils'

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

export const CalendarDayGridBase = defineComponent({
  name: 'CalendarDayGridBase',

  props: {
    ...makeStylingProps(),
    ...makeCalendarProps(),

    lightenDaysOutsideNavigatedMonth: { type: Boolean, default: true },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: AnimationDirection.Horizontal },
    classNames: { type: Object as PropType<any>, default: () => ({}) },
  },

  setup(props, { attrs, slots }) {
    const {
      styles,
      theme,
      className,
      dateRangeType,
      showWeekNumbers,
      lightenDaysOutsideNavigatedMonth,
      animationDirection,
    } = toRefs(props)

    const animateBackwards = ref(false)
    const weeks = useWeeks(props, (date: Date) => {}, () => {})

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value!,
      className: className.value,
      dateRangeType: dateRangeType.value,
      showWeekNumbers: showWeekNumbers.value,
      lightenDaysOutsideNavigatedMonth:
        lightenDaysOutsideNavigatedMonth.value === undefined ? true : lightenDaysOutsideNavigatedMonth.value,
      animationDirection: animationDirection.value,
      animateBackwards: animateBackwards.value,
    }))

    const slotProps = computed(() => ({
      wrapper: {
        class: classNames.value.wrapper,
      },
      table: {
        class: classNames.value.table,
      },
      headerRow: {
        ...props,
        classNames: classNames.value,
        weeks: weeks.value,
      },
      firstTransitionWeek: {
        ...props,
        weeks: weeks.value,
        classNames: classNames.value,
        week: weeks.value[0],
        weekIndex: -1,
        rowClassName: classNames.value.firstTransitionWeek,
      },
      lastTransitionWeek: {
        ...props,
        weeks: weeks.value,
        classNames: classNames.value,
        week: weeks.value[weeks.value.length - 1],
        weekIndex: -2,
        rowClassName: classNames.value.lastTransitionWeek,
      },
      weekRow: {
        ...props,
        weeks: weeks.value,
        classNames: classNames.value,
        rowClassName: classNames.value.weekRow,
      },
    }))
    console.log(weeks.value.slice(1, weeks.value.length - 1))

    return () => h('div', slotProps.value.wrapper, [
      h('table', slotProps.value.table, [
        h('tbody', [
          h(CalendarMonthHeaderRow, slotProps.value.headerRow),
          h(CalendarGridRow, slotProps.value.firstTransitionWeek),
          weeks.value.slice(1, weeks.value.length - 1).map((week, weekIndex) => h(CalendarGridRow, {
            ...slotProps.value.weekRow,
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
