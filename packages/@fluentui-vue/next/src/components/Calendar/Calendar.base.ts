import { classNamesFunction, css } from '@fluentui-vue/utilities'
import { type PropType, computed, defineComponent, h, ref, toRefs } from 'vue'
import { DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, type ICalendarStrings } from '@fluentui/date-time-utilities'
import { CalendarDay } from './CalendarDay/CalendarDay'
import { CalendarMonth } from './CalendarMonth/CalendarMonth'
import { makeCalendarProps } from './makeProps'
import { DateRangeType, DayOfWeek, type ICalendarProps, type ICalendarStyleProps, type ICalendarStyles, type IDateFormatting } from '.'
import { asSlotProps, makeStylingProps } from '@/utils'

const MIN_SIZE_FORCE_OVERLAY = 440

const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>()

export const CalendarBase = defineComponent({
  name: 'CalendarBase',

  props: {
    ...makeStylingProps(),

    value: { type: Date, default: undefined },
    today: { type: Date, default: () => new Date() },
    minDate: { type: Date, default: undefined },
    maxDate: { type: Date, default: undefined },

    ...makeCalendarProps(),
  },

  setup(props, { attrs, slots }) {
    const {
      styles,
      theme,
      className,
      value,
      today,
      minDate,
      maxDate,
      strings,
      isDayPickerVisible,
      isMonthPickerVisible,
      showMonthPickerAsOverlay,
      showGoToToday,
      showWeekNumbers,
      firstDayOfWeek,
      dateRangeType,
    } = toRefs(props)

    const _showMonthPickerAsOverlay = computed(() => {
      const win = window
      return showMonthPickerAsOverlay.value || (isDayPickerVisible.value && win && win.innerWidth <= MIN_SIZE_FORCE_OVERLAY)
    })

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

    const selectedDateString = ref('')

    const slotProps = computed(() => asSlotProps({
      root: {
        class: css('ms-DatePicker', classNames.value.root, className.value, 'ms-slideDownIn10'),
        role: 'group',
      },
      liveRegion: {
        'class': classNames.value.liveRegion,
        'aria-live': 'polite',
        'aria-atomic': true,
      },
      divider: {
        class: classNames.value.divider,
      },
      monthPickerWrapper: {
        class: classNames.value.monthPickerWrapper,
      },
      goTodayButton: {
        class: css('js-goToday', classNames.value.goTodayButton),
        type: 'button',
      },
      calendarDay: {
        strings: strings.value,
        today: today.value,
        minDate: minDate.value,
        maxDate: maxDate.value,
        firstDayOfWeek: firstDayOfWeek.value,
        dateRangeType: dateRangeType.value,
        dateTimeFormatter: props.dateTimeFormatter,
        navigatedDate: new Date(),
      },
      calendarMonth: {
        strings: strings.value,
        today: today.value,
        minDate: minDate.value,
        maxDate: maxDate.value,
        dateTimeFormatter: props.dateTimeFormatter,
        navigatedDate: new Date(),
      },
    }))

    const renderGoToTodayButton = () => {
      return showGoToToday.value && h('button', {
        ...slotProps.value.goTodayButton,
      }, strings.value.goToToday)
    }

    return () => h('div', slotProps.value.root, [
      h('div', slotProps.value.liveRegion, [
        h('span', selectedDateString.value),
      ]),
      isDayPickerVisible.value && h(CalendarDay, slotProps.value.calendarDay),
      isDayPickerVisible.value && isMonthPickerVisible.value && h('div', slotProps.value.divider),
      isMonthPickerVisible.value
        ? h('div', slotProps.value.monthPickerWrapper, [
          h(CalendarMonth, slotProps.value.calendarMonth),
          renderGoToTodayButton(),
        ])
        : renderGoToTodayButton(),
    ])
  },
})
