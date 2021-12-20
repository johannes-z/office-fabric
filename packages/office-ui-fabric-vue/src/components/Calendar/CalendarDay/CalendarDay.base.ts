import { CalendarDayGrid } from '@/components/CalendarDayGrid/CalendarDayGrid'
import { withThemeableProps } from '@/useThemeable'
import { DateRangeType, DayOfWeek, DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, FirstWeekOfYear, IDateFormatting } from '@fluentui/date-time-utilities'
import { classNamesFunction, format, getId } from '@uifabric-vue/utilities'
import { AnimationDirection, ICalendarNavigationIcons, ICalendarStrings } from '..'
import { ICalendarDayProps, ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types'

import { defaultCalendarNavigationIcons } from '../defaults'
import Vue, { PropType, VNode } from 'vue'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { MappedType } from '@/types'
import { withCalendarProps } from '../useCalendar'
import { withCalendarDayGridProps } from '@/components/CalendarDayGrid/useCalendarDayGrid'

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>()

export const CalendarDayBase = Vue.extend({
  name: 'CalendarDayBase',

  props: {
    ...withThemeableProps(),
    ...withCalendarProps(),
    ...withCalendarDayGridProps(),

    // onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
    // onDismiss?: () => void;
    navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
    // onHeaderSelect?: () => void;
    showSixWeeksByDefault: { type: Boolean, default: false },
  } as MappedType<ICalendarDayProps>,

  computed: {
    classNames (): IProcessedStyleSet<ICalendarDayStyles> {
      return getClassNames(this.styles, {
        theme: this.theme!,
        className: this.className,
        headerIsClickable: false, // !!onHeaderSelect,
        showWeekNumbers: this.showWeekNumbers,
        animationDirection: this.animationDirection,
      })
    },
    monthAndYearId (): string {
      return getId()
    },
    monthAndYear (): string {
      const { dateTimeFormatter, navigatedDate, strings } = this
      return dateTimeFormatter.formatMonthYear(navigatedDate, strings)
    },
    headerAriaLabel (): string {
      const { strings, monthAndYear } = this
      return strings.yearPickerHeaderAriaLabel
        ? format(strings.yearPickerHeaderAriaLabel, monthAndYear)
        : monthAndYear
    },
  },

  render (h): VNode {
    const {
      strings,
      navigatedDate,
      dateTimeFormatter,
      styles,
      // onHeaderSelect,
      showSixWeeksByDefault,
      minDate,
      maxDate,
      restrictedDates,
      // onNavigateDate,
      dateRangeType,
      selectedDate,
      monthAndYear,
      headerAriaLabel,

      classNames,
      monthAndYearId,
    } = this

    const onHeaderSelect = true

    const HeaderButtonComponentType = onHeaderSelect ? 'button' : 'div'

    // const leftNavigationIcon = navigationIcons.leftNavigation
    // const rightNavigationIcon = navigationIcons.rightNavigation
    // const closeNavigationIcon = navigationIcons.closeIcon

    return h('div', { class: classNames.root }, [
      h('div', { class: classNames.header }, [
        h(HeaderButtonComponentType, {
          class: classNames.monthAndYear,
          key: monthAndYear,
          attrs: {
            'aria-live': 'polite',
            'aria-atomic': 'true',
            'aria-label': onHeaderSelect ? headerAriaLabel : undefined,
            'data-is-focusable': !!onHeaderSelect,
            tabIndex: onHeaderSelect ? 0 : -1, // prevent focus if there's no action for the button,
            type: 'button',
            // 'onKeyDown': onButtonKeyDown(onHeaderSelect),
            // onClick: onHeaderSelect,
          },
        }, [
          h('span', { attrs: { id: monthAndYearId } }, monthAndYear),
        ]),
        // TODO CalendarDayNavigationButtons
      ]),
      h(CalendarDayGrid, {
        props: {
          ...this.$props,
          styles: styles,
          selectedDate: selectedDate,
          strings: strings,
          navigatedDate: navigatedDate,
          weeksToShow: showSixWeeksByDefault ? 6 : undefined,
          dateTimeFormatter: dateTimeFormatter,
          minDate: minDate,
          maxDate: maxDate,
          restrictedDates: restrictedDates,
          // onNavigateDate: onNavigateDate,
          labelledBy: monthAndYearId,
          dateRangeType: dateRangeType,
        },
      }),
    ])
  },
})
