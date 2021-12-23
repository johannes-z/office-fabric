import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { DateRangeType, DayOfWeek } from '@fluentui/date-time-utilities'
import { classNamesFunction, css, format, getWindow } from '@uifabric-vue/utilities'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import Vue, { VNode } from 'vue'
import { ICalendarDayProps, ICalendarMonthProps, ICalendarNavigationIcons, ICalendarProps, ICalendarStyleProps, ICalendarStyles } from '.'
import { CalendarDay } from './CalendarDay/CalendarDay'
import { CalendarMonth } from './CalendarMonth/CalendarMonth'
import { withCalendarProps } from './useCalendar'

const MIN_SIZE_FORCE_OVERLAY = 440
const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>()

export default Vue.extend({
  name: 'CalendarBase',

  props: {
    ...withThemeableProps(),

    ...withCalendarProps(),

    firstDayOfWeek: { type: Number as () => DayOfWeek, default: undefined },
    dateRangeType: { type: Number as () => DateRangeType, default: undefined },
    highlightCurrentMonth: { type: Boolean, default: false },
    highlightSelectedMonth: { type: Boolean, default: false },
    navigationIcons: { type: Object as () => ICalendarNavigationIcons, default: undefined },
    minDate: { type: Date, default: undefined },
    maxDate: { type: Date, default: undefined },
    restrictedDates: { type: Array as () => Date[], default: undefined },
    showCloseButton: { type: Boolean, default: false },
    allFocusable: { type: Boolean, default: false },
    calendarDayProps: { type: Object as () => Partial<ICalendarDayProps>, default: undefined },
    calendarMonthProps: { type: Object as () => Partial<ICalendarMonthProps>, default: undefined },

    value: { type: Date, default: () => new Date() },
    today: { type: Date, default: () => new Date() },

    showGoToToday: { type: Boolean, default: false },
    showWeekNumbers: { type: Boolean, default: false },
    showMonthPickerAsOverlay: { type: Boolean, default: false },

    isDayPickerVisible: { type: Boolean, default: true },
    isMonthPickerVisible: { type: Boolean, default: false },
  } as MappedType<ICalendarProps>,

  data () {
    return {
      selectedDate: this.today,
      navigatedMonth: new Date(),
      navigatedDay: new Date(),
      isMonthPickerVisibleInternal: this.isMonthPickerVisible,
      isDayPickerVisibleInternal: this.isDayPickerVisible,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ICalendarStyles> {
      return getClassNames(this.styles, {
        theme: this.theme!,
        className: this.className,
        isMonthPickerVisible: this.isMonthPickerVisibleInternal,
        isDayPickerVisible: this.isDayPickerVisibleInternal,
        monthPickerOnly: this.monthPickerOnly,
        showMonthPickerAsOverlay: this.internalShowMonthPickerAsOverlay,
        overlaidWithButton: this.overlaidWithButton,
        overlayedWithButton: this.overlaidWithButton,
        showGoToToday: this.showGoToToday,
        showWeekNumbers: this.showWeekNumbers,
      })
    },
    internalShowMonthPickerAsOverlay (): boolean | undefined {
      return getShowMonthPickerAsOverlay(this.$props)
    },
    monthPickerOnly (): boolean | undefined {
      return !this.internalShowMonthPickerAsOverlay && this.isDayPickerVisible
    },
    overlaidWithButton (): boolean | undefined {
      return this.internalShowMonthPickerAsOverlay && this.showGoToToday
    },
    todayDateString (): string {
      if (this.dateTimeFormatter && this.strings!.todayDateFormatString) {
        return format(this.strings!.todayDateFormatString, this.dateTimeFormatter.formatMonthDayYear(this.today!, this.strings!))
      }
      return ''
    },
    selectedDateString (): string {
      if (this.dateTimeFormatter && this.strings!.selectedDateFormatString) {
        return format(this.strings!.selectedDateFormatString, this.dateTimeFormatter.formatMonthDayYear(this.selectedDate!, this.strings!))
      }
      return ''
    },
    selectionAndTodayString (): string {
      return this.selectedDateString + ', ' + this.todayDateString
    },
    goTodayEnabled (): boolean {
      let goTodayEnabled = this.showGoToToday

      if (goTodayEnabled && this.today) {
        goTodayEnabled =
          this.navigatedDay.getFullYear() !== this.today.getFullYear() ||
          this.navigatedDay.getMonth() !== this.today.getMonth() ||
          this.navigatedMonth.getFullYear() !== this.today.getFullYear() ||
          this.navigatedMonth.getMonth() !== this.today.getMonth()
      }
      return !!goTodayEnabled
    },
  },

  methods: {
    onNavigateDayDate (date: Date, focusOnNavigatedDay: boolean) {
      this.navigatedMonth = date
      this.navigatedDay = date
    },
    onDateSelected (date: Date, selectedDateRangeArray?: Date[]) {
      this.navigatedMonth = date
      this.navigatedDay = date
      this.selectedDate = date
      this.$emit('input', date, selectedDateRangeArray)
    },
    onGoToToday (): void {
      this.navigatedDay = this.today!
    },
    onHeaderSelect (): void {
      this.isMonthPickerVisibleInternal = !this.isMonthPickerVisibleInternal
      this.isDayPickerVisibleInternal = !this.isDayPickerVisibleInternal
    },
  },

  render (h): VNode {
    const rootClass = 'ms-DatePicker'

    const {
      classNames,
      className,
      selectedDateString,
      isMonthPickerVisibleInternal,
      isDayPickerVisibleInternal,
      navigatedDay,
      today,
      selectedDate,
    } = this

    const renderGoToTodayButton = () => {
      return this.showGoToToday && h('button', {
        class: classNames.goTodayButton,
        attrs: {
          disabled: !this.goTodayEnabled,
        },
        on: {
          click: this.onGoToToday,
        },
      }, this.strings!.goToToday)
    }

    return h('div', {
      attrs: { role: 'group' },
      class: css(rootClass, classNames.root, className, 'ms-slideDownIn10'),
    }, [
      h('div', {
        class: classNames.liveRegion,
      }, selectedDateString),
      isDayPickerVisibleInternal && h(CalendarDay, {
        props: {
          selectedDate: selectedDate,
          navigatedDate: navigatedDay,
          today: today,
        },
        on: {
          onNavigateDate: this.onNavigateDayDate,
          onSelectDate: this.onDateSelected,
          ...getShowMonthPickerAsOverlay(this.$props) && {
            onHeaderSelect: this.onHeaderSelect,
          },
        },
      }),
      isDayPickerVisibleInternal && isMonthPickerVisibleInternal && h('div', { class: classNames.divider }),
      isMonthPickerVisibleInternal
        ? h('div', { class: classNames.monthPickerWrapper }, [
          h(CalendarMonth, {
            props: {
              navigatedDate: this.navigatedMonth,
              selectedDate: this.navigatedDay,
              strings: this.strings!,
              highlightCurrentMonth: this.highlightCurrentMonth,
              highlightSelectedMonth: this.highlightSelectedMonth,
              dateTimeFormatter: this.dateTimeFormatter,
              minDate: this.minDate,
              maxDate: this.maxDate,
            },
            on: {
              onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => {
                this.navigatedMonth = date
                this.navigatedDay = date
              },
            },
          }),
          renderGoToTodayButton(),
        ])
        : renderGoToTodayButton(),
    ])
  },
})

function getShowMonthPickerAsOverlay (props: ICalendarProps) {
  const win = getWindow()
  return props.showMonthPickerAsOverlay || (win && win.innerWidth <= MIN_SIZE_FORCE_OVERLAY)
}
