import { Icon } from '@/components'
import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { addYears, compareDatePart, DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, getYearEnd, getYearStart, ICalendarStrings } from '@fluentui/date-time-utilities'
import { getTheme, IProcessedStyleSet, ITheme } from '@fluentui/style-utilities'
import { classNamesFunction, css, format, getRTL } from '@uifabric-vue/utilities'
import Vue, { PropType, VNode } from 'vue'
import { AnimationDirection, ICalendarMonthProps, ICalendarMonthStyleProps, ICalendarMonthStyles, ICalendarNavigationIcons, IDateFormatting } from '..'
import { CalendarYear } from '../CalendarYear/CalendarYear'
import { ICalendarYearRange } from '../CalendarYear/CalendarYear.types'
import { defaultCalendarNavigationIcons } from '../defaults'
import { withCalendarProps } from '../useCalendar'

const MONTHS_PER_ROW = 4

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>()

export default Vue.extend({
  name: 'CalendarMonthBase',

  props: {
    ...withThemeableProps(),
    ...withCalendarProps(),

    selectedDate: { type: Date, default: () => new Date() },
    navigatedDate: { type: Date, required: true },

    highlightCurrentMonth: { type: Boolean, default: false },
    highlightSelectedMonth: { type: Boolean, default: false },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: undefined },

    navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },

    onNavigateDate: { type: Object as PropType<(date: Date, focusOnNavigatedDay: boolean) => void>, default: undefined },
  } as MappedType<ICalendarMonthProps>,

  data () {
    return {
      isYearPickerVisible: true,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ICalendarMonthStyles> {
      const { theme, styles, className, highlightCurrentMonth, highlightSelectedMonth, animationDirection } = this
      return getClassNames(styles, {
        theme: theme!,
        className: className,
        hasHeaderClickCallback: false, //! !props.onHeaderSelect || !yearPickerHidden,
        highlightCurrent: highlightCurrentMonth,
        highlightSelected: highlightSelectedMonth,
        animateBackwards: false,
        animationDirection: animationDirection,
      })
    },
    yearString (): string {
      const { dateTimeFormatter, navigatedDate } = this
      return dateTimeFormatter!.formatYear(navigatedDate)
    },
    headerAriaLabel (): string {
      const { strings, yearString } = this
      return strings.monthPickerHeaderAriaLabel
        ? format(strings.monthPickerHeaderAriaLabel, yearString)
        : yearString
    },
    isPrevYearInBounds (): boolean {
      const { minDate, navigatedDate } = this
      return minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true
    },
    isNextYearInBounds  (): boolean {
      const { maxDate, navigatedDate } = this
      return maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true
    },
  },

  render (h): VNode {
    const {
      classNames,
      allFocusable,

      strings,

      navigatedDate,

      dateTimeFormatter,
      navigationIcons,

      headerAriaLabel,
      isPrevYearInBounds,
      isNextYearInBounds,

      isYearPickerVisible,

    } = this

    const leftNavigationIcon = navigationIcons!.leftNavigation
    const rightNavigationIcon = navigationIcons!.rightNavigation

    if (isYearPickerVisible) {
      // use navigated date for the year picker
      return h(CalendarYear, {
        props: {

        },
      })
      // return (
      //   <CalendarYear
      //     key={'calendarYear'}
      //     minYear={minDate ? minDate.getFullYear() : undefined}
      //     maxYear={maxDate ? maxDate.getFullYear() : undefined}
      //     // eslint-disable-next-line react/jsx-no-bind
      //     onSelectYear={onSelectYear}
      //     navigationIcons={navigationIcons}
      //     // eslint-disable-next-line react/jsx-no-bind
      //     onHeaderSelect={onYearPickerHeaderSelect}
      //     selectedYear={
      //       selectedDate ? selectedDate.getFullYear() : navigatedDate ? navigatedDate.getFullYear() : undefined
      //     }
      //     onRenderYear={onRenderYear}
      //     strings={yearStrings}
      //     componentRef={calendarYearRef}
      //     styles={styles}
      //     highlightCurrentYear={highlightCurrentMonth}
      //     highlightSelectedYear={highlightSelectedMonth}
      //     animationDirection={animationDirection}
      //   />
      // );
    }

    const rowIndexes: number[] = []
    for (let i = 0; i < strings.shortMonths.length / MONTHS_PER_ROW; i++) {
      rowIndexes.push(i)
    }

    const yearString = dateTimeFormatter!.formatYear(navigatedDate)

    return h('div', { class: classNames.root }, [
      h('div', { class: classNames.headerContainer }, [
        h('button', {
          class: classNames.currentItemButton,
          attrs: {
            'aria-label': headerAriaLabel,
            'aria-atomic': true,
            'aria-live': 'polite',
            type: 'button',
          },
        }, yearString),

        // Previous Year
        h('div', { class: classNames.navigationButtonsContainer }, [
          h('button', {
            class: css(classNames.navigationButton, {
              [classNames.disabled]: !isPrevYearInBounds,
            }),
            attrs: {
              'aria-disabled': isPrevYearInBounds,
              tabIndex: isPrevYearInBounds ? undefined : allFocusable ? 0 : -1,
              title: strings.prevYearAriaLabel
                ? strings.prevYearAriaLabel + ' ' + dateTimeFormatter!.formatYear(addYears(navigatedDate, -1))
                : undefined,
              type: 'button',
            },
          }, [
            h(Icon, { props: { iconName: getRTL() ? rightNavigationIcon : leftNavigationIcon } }),
          ]),

          // Next Year
          h('button', {
            class: css(classNames.navigationButton, {
              [classNames.disabled]: !isNextYearInBounds,
            }),
            attrs: {
              'aria-disabled': isNextYearInBounds,
              tabIndex: isNextYearInBounds ? undefined : allFocusable ? 0 : -1,
              title: strings.nextYearAriaLabel
                ? strings.nextYearAriaLabel + ' ' + dateTimeFormatter!.formatYear(addYears(navigatedDate, 1))
                : undefined,
              type: 'button',
            },
          }, [
            h(Icon, { props: { iconName: getRTL() ? leftNavigationIcon : rightNavigationIcon } }),
          ]),
        ]),
      ]),
      // TODO FocusZone
      h('div', { class: classNames.gridContainer }, rowIndexes.map((rowNum: number) => {
        const monthsForRow = strings.shortMonths.slice(rowNum * MONTHS_PER_ROW, (rowNum + 1) * MONTHS_PER_ROW)

        return h('div', { class: classNames.buttonRow }, monthsForRow.map((month: string, index: number) => {
          return h('button', { class: classNames.itemButton }, month)
        }))
      })),
    ])
  },
})

function getYearStrings ({ strings, navigatedDate, dateTimeFormatter }: ICalendarMonthProps) {
  const yearToString = (year: number) => {
    if (dateTimeFormatter) {
      // create a date based on the current nav date
      const yearFormattingDate = new Date(navigatedDate.getTime())
      yearFormattingDate.setFullYear(year)
      return dateTimeFormatter.formatYear(yearFormattingDate)
    }
    return String(year)
  }

  const yearRangeToString = (yearRange: ICalendarYearRange) => {
    return `${yearToString(yearRange.fromYear)} - ${yearToString(yearRange.toYear)}`
  }

  const yearRangeToNextDecadeLabel = (yearRange: ICalendarYearRange) => {
    return strings.nextYearRangeAriaLabel ? `${strings.nextYearRangeAriaLabel} ${yearRangeToString(yearRange)}` : ''
  }

  const yearRangeToPrevDecadeLabel = (yearRange: ICalendarYearRange) => {
    return strings.prevYearRangeAriaLabel ? `${strings.prevYearRangeAriaLabel} ${yearRangeToString(yearRange)}` : ''
  }

  return [
    yearToString,
    {
      rangeAriaLabel: yearRangeToString,
      prevRangeAriaLabel: yearRangeToPrevDecadeLabel,
      nextRangeAriaLabel: yearRangeToNextDecadeLabel,
      headerAriaLabelFormatString: strings.yearPickerHeaderAriaLabel,
    } as const,
  ] as const
}

function isCurrentMonth (month: number, year: number, today: Date): boolean {
  return today.getFullYear() === year && today.getMonth() === month
}

// function onButtonKeyDown(callback: () => void): (ev: React.KeyboardEvent<HTMLButtonElement>) => void {
//   return (ev: React.KeyboardEvent<HTMLButtonElement>) => {
//     // eslint-disable-next-line deprecation/deprecation
//     switch (ev.which) {
//       case KeyCodes.enter:
//         callback();
//         break;
//     }
//   };
// }
