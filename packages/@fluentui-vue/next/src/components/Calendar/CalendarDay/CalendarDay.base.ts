import { classNamesFunction, css, format } from '@fluentui-vue/utilities'
import { addMonths, compareDatePart, getMonthEnd, getMonthStart } from '@fluentui/date-time-utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { type ExtractPropTypes, type PropType, computed, defineComponent, h, toRefs } from 'vue'
import { useId } from '@fluentui-vue/hooks'
import { makeCalendarDayProps } from '../makeProps'
import type { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types'
import { asSlotProps, defineFunctionalComponent, propsFactory } from '@/utils'
import { CalendarDayGrid } from '@/components/CalendarDayGrid/CalendarDayGrid'
import { Icon } from '@/components'
import { useRender } from '@/composables'

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>()

export const CalendarDayBase = defineComponent({
  name: 'CalendarDayBase',

  emits: [
    'update:navigatedDate',
    'update:selectedDate',
  ],

  props: makeCalendarDayProps(),

  setup(props, { attrs, emit, slots }) {
    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme,
      className: props.className,
      headerIsClickable: !!props.onHeaderSelect,
      showWeekNumbers: props.showWeekNumbers,
      animationDirection: props.animationDirection,
    }))

    const monthAndYearId = useId()
    const monthAndYear = computed(() => props.dateTimeFormatter?.formatMonthYear(props.navigatedDate, props.strings))
    const HeaderButtonComponentType = computed(() => props.onHeaderSelect ? 'button' : 'div')
    const headerAriaLabel = computed(() => props.strings.yearPickerHeaderAriaLabel
      ? format(props.strings.yearPickerHeaderAriaLabel, monthAndYear.value)
      : monthAndYear.value)

    const slotProps = computed(() => asSlotProps({
      root: {
        class: classNames.value.root,
      },
      header: {
        class: classNames.value.header,
      },
      monthAndYear: {
        'aria-label': props.onHeaderSelect ? headerAriaLabel.value : undefined,
        class: classNames.value.monthAndYear,
        onClick: props.onHeaderSelect,
        'data-is-focusable': !!props.onHeaderSelect,
        'tab-index': props.onHeaderSelect ? 0 : -1,
        type: 'button',
      },
      monthAndYearText: {
        id: monthAndYearId,
        'aria-live': 'polite',
        'aria-atomic': true,
      },
      navButtons: {
        ...props,
        classNames: classNames.value,
      },
      grid: {
        ...props,
        'onUpdate:selectedDate': (...args) => emit('update:selectedDate', ...args),
      },
    }))

    useRender(() => h('div', slotProps.value.root, [
      h('div', slotProps.value.header, [
        h(HeaderButtonComponentType.value, slotProps.value.monthAndYear, [
          h('span', slotProps.value.monthAndYearText, monthAndYear.value),
        ]),
        h(CalendarDayNavigationButtons, slotProps.value.navButtons),
      ]),
      h(CalendarDayGrid, slotProps.value.grid),
    ]))
  },
})

export const makeCalendarDayNavigationButtonsProps = propsFactory({
  ...makeCalendarDayProps(),
  classNames: { type: Object, required: true },
}, 'CalendarDayNavigationButtons')

const CalendarDayNavigationButtons = defineFunctionalComponent({
  name: 'CalendarDayNavigationButtons',

  props: makeCalendarDayNavigationButtonsProps(),

  render(props, { attrs, emit, slots }) {
    const {
      minDate,
      maxDate,
      navigatedDate,
      allFocusable,
      strings,
      navigationIcons,
      showCloseButton,
      classNames,
      onNavigateDate,
      onDismiss,
    } = props

    const onSelectNextMonth = (): void => {
      onNavigateDate(addMonths(navigatedDate, 1), false)
    }

    const onSelectPrevMonth = (): void => {
      onNavigateDate(addMonths(navigatedDate, -1), false)
    }
    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? +compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true
    const nextMonthInBounds = maxDate ? +compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true

    // use aria-disabled instead of disabled so focus is not lost
    // when a prev/next button becomes disabled after being clicked
    const slotProps = {
      monthComponents: {
        class: classNames.monthComponents,
      },
      prevButton: {
        class: css(classNames.headerIconButton, {
          [classNames.disabledStyle]: !prevMonthInBounds,
        }),
        tabIndex: prevMonthInBounds ? undefined : allFocusable ? 0 : -1,
        'aria-disabled': !prevMonthInBounds,
        onClick: onSelectPrevMonth,
        title: strings.prevMonthAriaLabel
          ? `${strings.prevMonthAriaLabel} ${strings.months[addMonths(navigatedDate, -1).getMonth()]}`
          : undefined,
        type: 'button',
      },
      nextButton: {
        class: css(classNames.headerIconButton, {
          [classNames.disabledStyle]: !prevMonthInBounds,
        }),
        tabIndex: nextMonthInBounds ? undefined : allFocusable ? 0 : -1,
        'aria-disabled': !nextMonthInBounds,
        onClick: onSelectNextMonth,
        title: strings.nextMonthAriaLabel
          ? `${strings.nextMonthAriaLabel} ${strings.months[addMonths(navigatedDate, 1).getMonth()]}`
          : undefined,
        type: 'button',
      },
      closeButton: {
        class: css(classNames.headerIconButton),
        title: strings.closeButtonAriaLabel,
        type: 'button',
      },
      leftNavigationIcon: {
        iconName: navigationIcons.leftNavigation,
      },
      rightNavigationIcon: {
        iconName: navigationIcons.rightNavigation,
      },
      closeIcon: {
        iconName: navigationIcons.closeIcon,
      },
    }

    return h('div', slotProps.monthComponents, [
      h('button', slotProps.prevButton, [
        h(Icon, slotProps.leftNavigationIcon),
      ]),
      h('button', slotProps.nextButton, [
        h(Icon, slotProps.rightNavigationIcon),
      ]),
      showCloseButton && h('button', slotProps.closeButton, [
        h(Icon, slotProps.closeIcon),
      ]),
    ])
  },
})
