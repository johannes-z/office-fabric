import { classNamesFunction, css, format } from '@fluentui-vue/utilities'
import { type PropType, type Ref, computed, defineComponent, h, ref, toRefs, watch } from 'vue'
import { CalendarDay } from './CalendarDay/CalendarDay'
import { CalendarMonth } from './CalendarMonth/CalendarMonth'
import { makeCalendarProps } from './makeProps'
import { type ICalendarStyleProps, type ICalendarStyles } from '.'
import { asSlotProps } from '@/utils'
import { useProxiedModel, useRender, useSyncedRef } from '@/composables'

const MIN_SIZE_FORCE_OVERLAY = 440

const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>()

export const CalendarBase = defineComponent({
  name: 'CalendarBase',

  props: {
    ...makeCalendarProps(),
    'onUpdate:modelValue': { type: Function as PropType<(date: Date, selectedDateRangeArray?: Date[]) => void>, default: undefined },
  },

  setup(props, { attrs, emit, slots }) {
    const selectedDate = useProxiedModel(props, 'modelValue', props.today)
    const navigatedDate = useSyncedRef(props, 'modelValue', props.today)
    const navigatedMonth = useSyncedRef(props, 'modelValue', props.today)
    const isMonthPickerVisible = useSyncedRef(props, 'isMonthPickerVisible', true) as Ref<boolean | undefined>
    const isDayPickerVisible = useSyncedRef(props, 'isDayPickerVisible', true) as Ref<boolean | undefined>

    const _showMonthPickerAsOverlay = computed(() => {
      const win = window
      return props.showMonthPickerAsOverlay || (isDayPickerVisible.value && win && win.innerWidth <= MIN_SIZE_FORCE_OVERLAY)
    })

    const monthPickerOnly = computed(() => !_showMonthPickerAsOverlay.value && !isDayPickerVisible.value)
    const overlaidWithButton = computed(() => _showMonthPickerAsOverlay.value && props.showGoToToday)

    const todayDateString = computed(() => {
      if (!props.dateTimeFormatter || !props.strings.todayDateFormatString)
        return ''
      return format(props.strings.todayDateFormatString, props.dateTimeFormatter.formatMonthDayYear(props.today, props.strings))
    })
    const selectedDateString = computed(() => {
      if (!props.dateTimeFormatter || !props.strings.selectedDateFormatString)
        return ''
      return format(props.strings.selectedDateFormatString, props.dateTimeFormatter.formatMonthDayYear(selectedDate.value!, props.strings))
    })
    const selectionAndTodayString = computed(() => `${todayDateString.value}, ${selectedDateString.value}`)

    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme,
      className: props.className,
      isMonthPickerVisible: isMonthPickerVisible.value,
      isDayPickerVisible: isDayPickerVisible.value,
      monthPickerOnly: monthPickerOnly.value,
      showMonthPickerAsOverlay: _showMonthPickerAsOverlay.value,
      overlaidWithButton: overlaidWithButton.value,
      overlayedWithButton: overlaidWithButton.value,
      showGoToToday: props.showGoToToday,
      showWeekNumbers: props.showWeekNumbers,
    }))

    const onHeaderSelect = computed(() => _showMonthPickerAsOverlay.value
      ? () => {
          isMonthPickerVisible.value = !isMonthPickerVisible.value
          isDayPickerVisible.value = !isDayPickerVisible.value
        }
      : undefined)

    const slotProps = computed(() => asSlotProps({
      root: {
        class: css('ms-DatePicker', classNames.value.root, props.className, 'ms-slideDownIn10'),
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

        'onNavigateDate': (date, focus) => {
          // TODO
          navigatedMonth.value = date
          navigatedDate.value = date
        },
        'onUpdate:selectedDate': (date) => {
          selectedDate.value = date
          props['onUpdate:modelValue']?.(date)
        },
        onHeaderSelect: onHeaderSelect.value,

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

        'onNavigateDate': (date, focus) => {
          console.log('onNavigateDate', date, focus)
          // TODO
          navigatedMonth.value = date
          navigatedDate.value = date
          // console.log('onUpdate:navigatedDate', date, focus)
        },
        onHeaderSelect: onHeaderSelect.value,

      },
    }))

    const $renderGoToTodayButton = () => {
      return props.showGoToToday && h('button', {
        ...slotProps.value.goTodayButton,
        onClick: () => {
          navigatedMonth.value = props.today
          navigatedDate.value = props.today
        },
      }, props.strings.goToToday)
    }

    useRender(() => h('div', slotProps.value.root, [
      h('div', slotProps.value.liveRegion, [
        h('span', selectedDateString.value),
      ]),
      isDayPickerVisible.value && h(CalendarDay, slotProps.value.calendarDay),
      isDayPickerVisible.value && isMonthPickerVisible.value && h('div', slotProps.value.divider),
      isMonthPickerVisible.value
        ? h('div', slotProps.value.monthPickerWrapper, [
          h(CalendarMonth, slotProps.value.calendarMonth),
          $renderGoToTodayButton(),
        ])
        : $renderGoToTodayButton(),
    ]))
  },
})
