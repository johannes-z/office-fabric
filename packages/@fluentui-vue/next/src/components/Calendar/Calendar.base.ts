import { classNamesFunction, css, format } from '@fluentui-vue/utilities'
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

  emits: [
    'update:modelValue',
  ],

  props: {
    ...makeCalendarProps(),
  },

  setup(props, { attrs, emit, slots }) {
    const {
      styles,
      theme,
      className,
      modelValue,
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

    const selectedDate = ref(modelValue.value || today.value)
    const navigatedDate = ref(modelValue.value || today.value)
    const navigatedMonth = ref(modelValue.value || today.value)

    const todayDateString = computed(() => {
      if (!props.dateTimeFormatter || !strings.value.todayDateFormatString)
        return ''
      return format(strings.value.todayDateFormatString, props.dateTimeFormatter.formatMonthDayYear(today.value, strings.value))
    })
    const selectedDateString = computed(() => {
      if (!props.dateTimeFormatter || !strings.value.selectedDateFormatString)
        return ''
      return format(strings.value.selectedDateFormatString, props.dateTimeFormatter.formatMonthDayYear(selectedDate.value, strings.value))
    })
    const selectionAndTodayString = computed(() => `${todayDateString.value}, ${selectedDateString.value}`)

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

    const slotProps = computed(() => asSlotProps({
      root: {
        class: css('ms-DatePicker', classNames.value.root, className.value, 'ms-slideDownIn10'),
        role: 'group',
        ariaLabel: selectionAndTodayString.value,
      },
      liveRegion: {
        class: classNames.value.liveRegion,
        ariaLive: 'polite',
        ariaAtomic: true,
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
        'strings': props.strings,
        'today': props.today,
        'showWeekNumbers': props.showWeekNumbers,
        'firstWeekOfYear': props.firstWeekOfYear!,
        'dateTimeFormatter': props.dateTimeFormatter!,
        'showSixWeeksByDefault': props.showSixWeeksByDefault,
        'navigationIcons': props.navigationIcons,
        'minDate': props.minDate,
        'maxDate': props.maxDate,
        'firstDayOfWeek': props.firstDayOfWeek,
        'dateRangeType': props.dateRangeType,
        'showCloseButton': props.showCloseButton,
        'allFocusable': props.allFocusable,

        'navigatedDate': navigatedDate.value,
        'selectedDate': selectedDate.value,

        'onUpdate:navigatedDate': (date, focus) => {
          // TODO
          navigatedMonth.value = date
          navigatedDate.value = date
          console.log('onUpdate:navigatedDate', date, focus)
        },
        'onUpdate:selectedDate': (date) => {
          console.log(date)
          selectedDate.value = date
          emit('update:modelValue', date)
          console.log(selectedDateString.value)
        },
      },
      calendarMonth: {
        'strings': props.strings,
        'today': props.today,
        'dateTimeFormatter': props.dateTimeFormatter,
        'highlightCurrentMonth': props.highlightCurrentMonth,
        'highlightSelectedMonth': props.highlightSelectedMonth,

        'minDate': props.minDate,
        'maxDate': props.maxDate,

        'navigatedDate': navigatedMonth.value,
        'selectedDate': selectedDate.value,

        'onUpdate:navigatedDate': (date, focus) => {
          // TODO
          navigatedMonth.value = date
          navigatedDate.value = date
          console.log('onUpdate:navigatedDate', date, focus)
        },
      },
    }))

    const renderGoToTodayButton = () => {
      return showGoToToday.value && h('button', {
        ...slotProps.value.goTodayButton,
        onClick: () => {
          navigatedMonth.value = props.today
          navigatedDate.value = props.today
        },
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
