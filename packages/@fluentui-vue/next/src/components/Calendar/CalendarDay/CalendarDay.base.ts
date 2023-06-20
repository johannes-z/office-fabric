import { classNamesFunction, css } from '@fluentui-vue/utilities'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import { addMonths, compareDatePart, getMonthEnd, getMonthStart } from '@fluentui/date-time-utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { defaultCalendarStrings } from '../defaults'
import type { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types'
import { asSlotProps, makeStylingProps } from '@/utils'
import { CalendarDayGrid } from '@/components/CalendarDayGrid/CalendarDayGrid'
import { makeCalendarDayGridProps } from '@/components/CalendarDayGrid/makeProps'
import { type ICalendarNavigationIcons, Icon } from '@/components'

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>()

export function makeCalendarDayProps() {
  return {
    ...makeStylingProps(),
    ...makeCalendarDayGridProps(),
    navigatedDate: { type: Date, required: true },
    selectedDate: { type: Date, required: true },
    minDate: { type: Date, default: undefined },
    maxDate: { type: Date, default: undefined },
    navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, required: true },
    showCloseButton: { type: Boolean, default: false },
  }
}

export const CalendarDayBase = defineComponent({
  name: 'CalendarDayBase',

  emits: [
    'update:navigatedDate',
    'update:selectedDate',
  ],

  props: {
    ...makeCalendarDayProps(),
  },

  setup(props, { attrs, emit, slots }) {
    const {
      styles,
      theme,
      className,
      showWeekNumbers,
      animationDirection,
      dateTimeFormatter,
      strings,
      navigatedDate,
    } = toRefs(props)

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      // TODO headerIsClickable: !!onHeaderSelect,
      showWeekNumbers: showWeekNumbers.value,
      animationDirection: animationDirection.value,
    }))

    const monthAndYear = computed(() => dateTimeFormatter.value.formatMonthYear(navigatedDate.value, strings.value))
    const HeaderButtonComponentType = 'div'

    const slotProps = computed(() => asSlotProps({
      root: {
        class: classNames.value.root,
      },
      header: {
        class: classNames.value.header,
      },
      monthAndYear: {
        class: classNames.value.monthAndYear,
      },
    }))

    return () => h('div', slotProps.value.root, [
      h('div', slotProps.value.header, [
        h(HeaderButtonComponentType, slotProps.value.monthAndYear, [
          h('span', monthAndYear.value),
        ]),
        h(CalendarDayNavigationButtons, {
          ...props,
          'classNames': classNames.value,
          'onUpdate:navigatedDate': (date, focus) => {
            // TODO bubble up
            console.log('onUpdate:navigatedDate', date, focus)
            emit('update:navigatedDate', date, focus)
          },
        }),
      ]),
      h(CalendarDayGrid, { ...props, 'onUpdate:selectedDate': (...args) => emit('update:selectedDate', ...args) }),
    ])
  },
})

const CalendarDayNavigationButtons = defineComponent({
  name: 'CalendarDayNavigationButtons',

  emits: [
    'update:navigatedDate',
  ],

  props: {
    ...makeCalendarDayProps(),
    classNames: { type: Object as PropType<IProcessedStyleSet<ICalendarDayStyles>>, default: () => ({}) },
  },

  setup(props, { attrs, emit, slots }) {
    const {
      minDate,
      maxDate,
      navigatedDate,
      classNames,
      allFocusable,
      navigationIcons,
      showCloseButton,
      strings,
    } = toRefs(props)

    const onSelectPrevMonth = () => {
      emit('update:navigatedDate', addMonths(navigatedDate.value, -1), false)
    }
    const onSelectNextMonth = () => {
      emit('update:navigatedDate', addMonths(navigatedDate.value, 1), false)
    }

    const prevMonthInBounds = computed(() => minDate.value
      ? +compareDatePart(minDate.value, getMonthStart(navigatedDate.value)) < 0
      : true)
    const nextMonthInBounds = computed(() => maxDate.value
      ? +compareDatePart(getMonthEnd(navigatedDate.value), maxDate.value) < 0
      : true)

    const slotProps = computed(() => {
      const headerIconButton = {
        type: 'button',
      }
      return asSlotProps({
        monthComponents: {
          class: classNames.value.monthComponents,
        },
        prevButton: {
          ...headerIconButton,
          class: css(classNames.value.headerIconButton, {
            [classNames.value.disabledStyle]: !prevMonthInBounds.value,
          }),
          tabIndex: prevMonthInBounds.value ? undefined : allFocusable.value ? 0 : -1,
          ariaDisabled: !prevMonthInBounds.value,
          type: 'button',
          onClick: onSelectPrevMonth,
        },
        nextButton: {
          ...headerIconButton,
          class: css(classNames.value.headerIconButton, {
            [classNames.value.disabledStyle]: !prevMonthInBounds.value,
          }),
          tabIndex: nextMonthInBounds.value ? undefined : allFocusable.value ? 0 : -1,
          ariaDisabled: !nextMonthInBounds.value,
          type: 'button',
          onClick: onSelectNextMonth,
        },
        closeButton: {
          ...headerIconButton,
          class: css(classNames.value.headerIconButton),
          title: strings.value.closeButtonAriaLabel,
          type: 'button',
        },
        leftNavigationIcon: {
          iconName: navigationIcons.value.leftNavigation,
        },
        rightNavigationIcon: {
          iconName: navigationIcons.value.rightNavigation,
        },
        closeNavigationIcon: {
          iconName: navigationIcons.value.closeNavigationIcon,
        },
      })
    })

    return () => h('div', slotProps.value.monthComponents, [
      h('button', slotProps.value.prevButton, [
        h(Icon, slotProps.value.leftNavigationIcon),
      ]),
      h('button', slotProps.value.nextButton, [
        h(Icon, slotProps.value.rightNavigationIcon),
      ]),
      showCloseButton.value && h('button', slotProps.value.closeButton, [
        h(Icon, slotProps.value.closeNavigationIcon),
      ]),
    ])
  },
})
