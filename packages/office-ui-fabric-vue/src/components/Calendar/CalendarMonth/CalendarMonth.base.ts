import { Icon } from '@/components'
import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { addYears, compareDatePart, getMonthEnd, getMonthStart, getYearEnd, getYearStart, setMonth } from '@fluentui/date-time-utilities'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction, css, format, getRTL } from '@uifabric-vue/utilities'
import Vue, { PropType, VNode } from 'vue'
import { AnimationDirection, ICalendarMonthProps, ICalendarMonthStyleProps, ICalendarMonthStyles, ICalendarNavigationIcons } from '..'
import { CalendarYear } from '../CalendarYear/CalendarYear'
import { ICalendarYearRange } from '../CalendarYear/CalendarYear.types'
import { defaultCalendarNavigationIcons } from '../defaults'
import { onButtonKeyDown } from '../helpers'
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
    yearPickerHidden: { type: Boolean, default: false },
  } as MappedType<ICalendarMonthProps>,

  data () {
    return {
      isYearPickerVisible: false,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ICalendarMonthStyles> {
      const { theme, styles, className, highlightCurrentMonth, highlightSelectedMonth, animationDirection, yearPickerHidden } = this
      return getClassNames(styles, {
        theme: theme!,
        className: className,
        hasHeaderClickCallback: !!this.$listeners.onHeaderSelect || !yearPickerHidden,
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
    yearStrings () {
      const { strings, navigatedDate, dateTimeFormatter } = this
      return getYearStrings({ strings, navigatedDate, dateTimeFormatter })
    },
  },

  methods: {
    focusOnNextUpdate () {
      // focus
    },
    selectMonthCallback (newMonth: number): (() => void) {
      return () => this.onSelectMonth(newMonth)
    },
    onSelectMonth (newMonth: number): void {
      this.$emit('onHeaderSelect')
      this.$emit('onNavigateDate', setMonth(this.navigatedDate, newMonth), true)
    },
    onSelectPrevYear (): void {
      this.$emit('onNavigateDate', addYears(this.navigatedDate, -1), false)
    },
    onSelectNextYear (): void {
      this.$emit('onNavigateDate', addYears(this.navigatedDate, 1), false)
    },
    onHeaderSelect (): void {
      if (!this.yearPickerHidden) {
        // focusOnNextUpdate();
        this.isYearPickerVisible = true
      } else {
        this.$emit('onHeaderSelect')
      }
    },
    onYearPickerHeaderSelect (): void {
      // focusOnNextUpdate();
      this.isYearPickerVisible = false
    },
    onSelectYear (selectedYear: number): void {
      // focusOnNextUpdate();
      const navYear = this.navigatedDate.getFullYear()

      if (navYear !== selectedYear) {
        let newNavigationDate = new Date(this.navigatedDate.getTime())
        newNavigationDate.setFullYear(selectedYear)
        // for min and max dates, adjust the new navigation date - perhaps this should be
        // checked on the master navigation date handler (i.e. in Calendar)
        if (this.maxDate && newNavigationDate > this.maxDate) {
          newNavigationDate = setMonth(newNavigationDate, this.maxDate.getMonth())
        } else if (this.minDate && newNavigationDate < this.minDate) {
          newNavigationDate = setMonth(newNavigationDate, this.minDate.getMonth())
        }
        this.$emit('onNavigateDate', newNavigationDate, true)
      }
      this.isYearPickerVisible = false
    },
  },

  render (h): VNode {
    const {
      styles,
      classNames,
      allFocusable,

      strings,

      navigatedDate,
      selectedDate,

      dateTimeFormatter,
      navigationIcons,

      headerAriaLabel,
      isPrevYearInBounds,
      isNextYearInBounds,

      isYearPickerVisible,
      today,
      highlightCurrentMonth,
      highlightSelectedMonth,
    } = this

    const leftNavigationIcon = navigationIcons!.leftNavigation
    const rightNavigationIcon = navigationIcons!.rightNavigation

    if (isYearPickerVisible) {
      const [onRenderYear, yearStrings] = this.yearStrings

      // use navigated date for the year picker
      return h(CalendarYear, {
        key: 'calendarYear',
        props: {
          minYear: this.minDate ? this.minDate.getFullYear() : undefined,
          maxYear: this.maxDate ? this.maxDate.getFullYear() : undefined,
          navigationIcons,
          selectedYear: selectedDate
            ? selectedDate.getFullYear()
            : navigatedDate
              ? navigatedDate.getFullYear()
              : undefined,
          strings: yearStrings,
          styles: styles,
          highlightCurrentYear: this.highlightCurrentMonth,
          highlightSelectedYear: this.highlightSelectedMonth,
          animationDirection: this.animationDirection,
        },
        on: {
          onHeaderSelect: this.onYearPickerHeaderSelect,
          onSelectYear: this.onSelectYear,
        },
        scopedSlots: {
          onRenderYear,
        },
      })
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
            'aria-atomic': true,
            'aria-label': headerAriaLabel,
            'aria-live': 'polite',
            'data-is-focusable': !!this.$listeners.onHeaderSelect || !this.yearPickerHidden,
            tabIndex: !!this.$listeners.onHeaderSelect || !this.yearPickerHidden ? 0 : -1,
            type: 'button',
          },
          on: {
            click: this.onHeaderSelect,
            keydown: onButtonKeyDown(this.onHeaderSelect),
          },
        }, yearString),

        // Previous Year
        h('div', { class: classNames.navigationButtonsContainer }, [
          h('button', {
            class: css(classNames.navigationButton, {
              [classNames.disabled]: !isPrevYearInBounds,
            }),
            attrs: {
              'aria-disabled': !isPrevYearInBounds,
              tabIndex: isPrevYearInBounds ? undefined : allFocusable ? 0 : -1,
              title: strings.prevYearAriaLabel
                ? strings.prevYearAriaLabel + ' ' + dateTimeFormatter!.formatYear(addYears(navigatedDate, -1))
                : undefined,
              type: 'button',
            },
            on: {
              ...isPrevYearInBounds && {
                click: this.onSelectPrevYear,
                keyDown: onButtonKeyDown(this.onSelectPrevYear),
              },
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
              'aria-disabled': !isNextYearInBounds,
              tabIndex: isNextYearInBounds ? undefined : allFocusable ? 0 : -1,
              title: strings.nextYearAriaLabel
                ? strings.nextYearAriaLabel + ' ' + dateTimeFormatter!.formatYear(addYears(navigatedDate, 1))
                : undefined,
              type: 'button',
            },
            on: {
              ...isPrevYearInBounds && {
                click: this.onSelectNextYear,
                keyDown: onButtonKeyDown(this.onSelectNextYear),
              },
            },
          }, [
            h(Icon, { props: { iconName: getRTL() ? leftNavigationIcon : rightNavigationIcon } }),
          ]),
        ]),
      ]),
      // TODO FocusZone
      h('div', {
        class: classNames.gridContainer,
        attrs: {
          role: 'grid',
          'aria-label': yearString,
        },
      }, rowIndexes.map((rowNum: number) => {
        const monthsForRow = strings.shortMonths.slice(rowNum * MONTHS_PER_ROW, (rowNum + 1) * MONTHS_PER_ROW)

        return h('div', {
          key: 'monthRow_' + rowNum + navigatedDate.getFullYear(),
          class: classNames.buttonRow,
          attrs: {
            role: 'row',
          },
        }, monthsForRow.map((month: string, index: number) => {
          const monthIndex = rowNum * MONTHS_PER_ROW + index
          const indexedMonth = setMonth(navigatedDate, monthIndex)
          const isNavigatedMonth = navigatedDate.getMonth() === monthIndex
          const isSelectedMonth = selectedDate.getMonth() === monthIndex
          const isSelectedYear = selectedDate.getFullYear() === navigatedDate.getFullYear()
          const isInBounds =
                (this.minDate ? compareDatePart(this.minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
                (this.maxDate ? compareDatePart(getMonthStart(indexedMonth), this.maxDate) < 1 : true)

          return h('button', {
            key: monthIndex,
            class: css(classNames.itemButton, {
              [classNames.current]: highlightCurrentMonth &&
                isCurrentMonth(monthIndex, navigatedDate.getFullYear(), today!),
              [classNames.selected]: highlightSelectedMonth && isSelectedMonth && isSelectedYear,
              [classNames.disabled]: !isInBounds,
            }),
            attrs: {
              role: 'gridcell',
              disabled: !allFocusable && !isInBounds,
              'aria-label': this.dateTimeFormatter!.formatMonth(indexedMonth, strings),
              'aria-selected': isNavigatedMonth,
              'data-is-focusable': isInBounds ? true : undefined,
              type: 'button',
            },
            on: {
              ...isInBounds && {
                click: this.selectMonthCallback(monthIndex),
                keydown: onButtonKeyDown(this.selectMonthCallback(monthIndex)),
              },
            },
          }, month)
        }))
      })),
    ])
  },
})

function getYearStrings ({ strings, navigatedDate, dateTimeFormatter }) {
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

  console.log('test')

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
