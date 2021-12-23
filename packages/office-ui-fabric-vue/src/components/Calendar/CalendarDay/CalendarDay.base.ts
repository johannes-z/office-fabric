import { CalendarDayGrid } from '@/components/CalendarDayGrid/CalendarDayGrid'
import { withCalendarDayGridProps } from '@/components/CalendarDayGrid/useCalendarDayGrid'
import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction, format, getId } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ICalendarNavigationIcons } from '../Calendar.types'
import { defaultCalendarNavigationIcons } from '../defaults'
import { onButtonKeyDown } from '../helpers'
import { withCalendarProps } from '../useCalendar'
import { ICalendarDayProps, ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types'
import { CalendarDayNavigationButtons } from './CalendarDayNavigationButtons'

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>()

export const CalendarDayBase = Vue.extend({
  name: 'CalendarDayBase',

  props: {
    ...withThemeableProps(),
    ...withCalendarProps(),
    ...withCalendarDayGridProps(),

    navigationIcons: { type: Object as () => ICalendarNavigationIcons, default: () => defaultCalendarNavigationIcons },
    showSixWeeksByDefault: { type: Boolean, default: false },
  } as MappedType<ICalendarDayProps>,

  computed: {
    classNames (): IProcessedStyleSet<ICalendarDayStyles> {
      return getClassNames(this.styles, {
        theme: this.theme!,
        className: this.className,
        headerIsClickable: !!this.$listeners.onHeaderSelect, // !!onHeaderSelect,
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

  methods: {
    onHeaderSelect (): void {
      this.$emit('onHeaderSelect')
    },
  },

  render (h): VNode {
    const {
      strings,
      navigatedDate,
      dateTimeFormatter,
      styles,
      showSixWeeksByDefault,
      minDate,
      maxDate,
      restrictedDates,
      dateRangeType,
      selectedDate,
      monthAndYear,
      headerAriaLabel,

      classNames,
      monthAndYearId,
    } = this

    const HeaderButtonComponentType = this.$listeners.onHeaderSelect ? 'button' : 'div'

    return h('div', { class: classNames.root }, [
      h('div', { class: classNames.header }, [
        h(HeaderButtonComponentType, {
          class: classNames.monthAndYear,
          key: monthAndYear,
          attrs: {
            'aria-live': 'polite',
            'aria-atomic': 'true',
            'aria-label': this.$listeners.onHeaderSelect ? headerAriaLabel : undefined,
            'data-is-focusable': !!this.$listeners.onHeaderSelect,
            tabIndex: this.$listeners.onHeaderSelect ? 0 : -1, // prevent focus if there's no action for the button,
            type: 'button',
          },
          on: {
            click: this.onHeaderSelect,
            keydown: onButtonKeyDown(this.onHeaderSelect),
          },
        }, [
          h('span', { attrs: { id: monthAndYearId } }, monthAndYear),
        ]),
        h(CalendarDayNavigationButtons, {
          props: { ...this.$props, classNames },
          on: this.$listeners,
        }),
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
          labelledBy: monthAndYearId,
          dateRangeType: dateRangeType,
        },
        on: this.$listeners,
      }),
    ])
  },
})
