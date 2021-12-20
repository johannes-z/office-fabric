import { withThemeableProps } from '@/useThemeable'
import { DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, ICalendarStrings, IDateFormatting } from '@fluentui/date-time-utilities'
import { getTheme, ITheme } from '@fluentui/style-utilities'
import { classNamesFunction, format, getWindow } from '@uifabric-vue/utilities'
import { computed, defineComponent, h, PropType, ref, toRefs } from '@vue/composition-api'
import { ICalendarProps, ICalendarStyleProps, ICalendarStyles } from '.'
import { CalendarDay } from './CalendarDay/CalendarDay'
import { CalendarMonth } from './CalendarMonth/CalendarMonth'
import { withCalendarProps } from './useCalendar'

const MIN_SIZE_FORCE_OVERLAY = 440
const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>()

export default defineComponent({
  name: 'CalendarBase',

  props: {
    ...withThemeableProps(),

    ...withCalendarProps(),

    firstDayOfWeek: { type: String, default: undefined },
    dateRangeType: { type: String, default: undefined },
    highlightCurrentMonth: { type: String, default: undefined },
    highlightSelectedMonth: { type: String, default: undefined },
    navigationIcons: { type: String, default: undefined },
    minDate: { type: String, default: undefined },
    maxDate: { type: String, default: undefined },
    restrictedDates: { type: String, default: undefined },
    showCloseButton: { type: String, default: undefined },
    allFocusable: { type: String, default: undefined },
    calendarDayProps: { type: String, default: undefined },
    calendarMonthProps: { type: String, default: undefined },

    value: { type: Date, default: () => new Date() },
    today: { type: Date, default: () => new Date() },

    showGoToToday: { type: Boolean, default: false },
    showWeekNumbers: { type: Boolean, default: false },
    showMonthPickerAsOverlay: { type: Boolean, default: false },

    isDayPickerVisible: { type: Boolean, default: true },
    isMonthPickerVisible: { type: Boolean, default: true },
  },
  setup (props) {
    const rootClass = 'ms-DatePicker'
    const {
      firstDayOfWeek,
      dateRangeType,
      strings,
      showGoToToday,
      highlightCurrentMonth,
      highlightSelectedMonth,
      navigationIcons,
      minDate,
      maxDate,
      restrictedDates,
      className,
      showCloseButton,
      allFocusable,
      styles,
      showWeekNumbers,
      theme,
      calendarDayProps,
      calendarMonthProps,
      dateTimeFormatter,
      today,
      value,

      isDayPickerVisible,
      isMonthPickerVisible,

      showMonthPickerAsOverlay,
    } = toRefs(props)

    const _showMonthPickerAsOverlay = computed(() => getShowMonthPickerAsOverlay(showMonthPickerAsOverlay.value))

    const monthPickerOnly = computed(() => !_showMonthPickerAsOverlay.value && !isDayPickerVisible.value)
    const overlaidWithButton = computed(() => _showMonthPickerAsOverlay.value && showGoToToday.value)

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      isMonthPickerVisible: isMonthPickerVisible.value,
      isDayPickerVisible: isDayPickerVisible.value,
      monthPickerOnly: monthPickerOnly.value,
      showMonthPickerAsOverlay: _showMonthPickerAsOverlay.value,
      overlaidWithButton: overlaidWithButton.value,
      overlayedWithButton: overlaidWithButton.value,
      showGoToToday: showGoToToday.value,
      showWeekNumbers: showWeekNumbers.value,
    }))

    const selectedDate = ref(today.value)

    let todayDateString: string = ''
    let selectedDateString: string = ''
    if (dateTimeFormatter && strings.value.todayDateFormatString) {
      todayDateString = format(strings.value.todayDateFormatString, dateTimeFormatter.value.formatMonthDayYear(today.value, strings.value))
    }
    if (dateTimeFormatter && strings.value.selectedDateFormatString) {
      selectedDateString = format(
        strings.value.selectedDateFormatString,
        dateTimeFormatter.value.formatMonthDayYear(selectedDate.value, strings.value),
      )
    }
    const selectionAndTodayString = selectedDateString + ', ' + todayDateString

    const navigatedMonth = ref(new Date())
    const navigatedDay = ref(new Date())

    return () => h('div', {
      attrs: { role: 'group' },
      class: classNames.value.root,
    }, [
      h('div', {
        class: classNames.value.liveRegion,
      }, selectedDateString),
      isDayPickerVisible.value && h(CalendarDay, {
        props: {
          selectedDate: value.value,
          navigatedDate: navigatedDay.value,
        },
      }),
      isDayPickerVisible.value && isMonthPickerVisible.value && h('div', { class: classNames.value.divider }),
      isMonthPickerVisible.value
        ? h('div', { class: classNames.value.monthPickerWrapper }, [
          h(CalendarMonth, {
            props: {
              navigatedDate: navigatedMonth.value,
              selectedDate: navigatedDay.value,
              strings: strings.value,
              highlightCurrentMonth: highlightCurrentMonth.value,
              highlightSelectedMonth: highlightSelectedMonth.value,
              dateTimeFormatter: dateTimeFormatter.value,
              minDate: minDate.value,
              maxDate: maxDate.value,
            },
          }),
          showGoToToday.value && h('button', { class: classNames.value.goTodayButton }, strings.value.goToToday),
        ])
        : showGoToToday.value && h('button', { class: classNames.value.goTodayButton }, strings.value.goToToday),
    ])
  },
})

function getShowMonthPickerAsOverlay (showMonthPickerAsOverlay: boolean) {
  const win = getWindow()
  return showMonthPickerAsOverlay || (win && win.innerWidth <= MIN_SIZE_FORCE_OVERLAY)
}
