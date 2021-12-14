import { DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, ICalendarStrings, IDateFormatting } from '@fluentui/date-time-utilities'
import { getTheme, ITheme } from '@fluentui/style-utilities'
import { classNamesFunction, format, getWindow } from '@uifabric-vue/utilities'
import { computed, defineComponent, h, PropType, ref, toRefs } from '@vue/composition-api'
import { ICalendarProps, ICalendarStyleProps, ICalendarStyles } from '.'
import { CalendarDay } from './CalendarDay/CalendarDay'
import { CalendarMonth } from './CalendarMonth/CalendarMonth'

const MIN_SIZE_FORCE_OVERLAY = 440
const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>()

export default defineComponent({
  props: {
    className: { type: String, default: '' },
    styles: { type: [Object, Function] as PropType<any>, default: undefined },
    theme: { type: Object as PropType<ITheme>, default: () => getTheme() },

    firstDayOfWeek: { type: String, default: undefined },
    dateRangeType: { type: String, default: undefined },
    strings: { type: Object as PropType<ICalendarStrings>, default: () => DEFAULT_CALENDAR_STRINGS },
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
    dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: () => DEFAULT_DATE_FORMATTING },

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

    const $liveRegion = h('div', {
      class: classNames.value.liveRegion,
    }, selectedDateString)

    const $dayPicker = isDayPickerVisible.value && h(CalendarDay, {
      props: {
        navigatedDate: navigatedDay.value,

      },
    })

    const $divider = isDayPickerVisible.value && isMonthPickerVisible.value && h('div', { class: classNames.value.divider })

    const $goToToday = showGoToToday.value && h('button', { class: classNames.value.goTodayButton }, strings.value.goToToday)

    const $monthPicker = isMonthPickerVisible.value
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
        $goToToday,
      ])
      : $goToToday

    return () => h('div', {
      attrs: { role: 'group' },
      class: classNames.value.root,
    }, [
      $liveRegion,
      $dayPicker,
      $divider,
      $monthPicker,
    ])
  },
})

function getShowMonthPickerAsOverlay (showMonthPickerAsOverlay: boolean) {
  const win = getWindow()
  return showMonthPickerAsOverlay || (win && win.innerWidth <= MIN_SIZE_FORCE_OVERLAY)
}
