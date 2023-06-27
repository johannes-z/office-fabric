import { classNamesFunction, css } from '@fluentui-vue/utilities'
import { addMonths, compareDatePart, getMonthEnd, getMonthStart } from '@fluentui/date-time-utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import { makeCalendarDayProps } from '../makeProps'
import type { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types'
import { asSlotProps, propsFactory } from '@/utils'
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

    const monthAndYear = computed(() => props.dateTimeFormatter?.formatMonthYear(props.navigatedDate, props.strings))
    const HeaderButtonComponentType = computed(() => props.onHeaderSelect ? 'button' : 'div')

    const slotProps = computed(() => asSlotProps({
      root: {
        class: classNames.value.root,
      },
      header: {
        class: classNames.value.header,
      },
      monthAndYear: {
        class: classNames.value.monthAndYear,
        onClick: props.onHeaderSelect,
      },
    }))

    useRender(() => h('div', slotProps.value.root, [
      h('div', slotProps.value.header, [
        h(HeaderButtonComponentType.value, slotProps.value.monthAndYear, [
          h('span', monthAndYear.value),
        ]),
        h(CalendarDayNavigationButtons, {
          ...props,
          classNames: classNames.value,
        }),
      ]),
      h(CalendarDayGrid, { ...props, 'onUpdate:selectedDate': (...args) => emit('update:selectedDate', ...args) }),
    ]))
  },
})

export const makeCalendarDayNavigationButtonsProps = propsFactory({
  ...makeCalendarDayProps(),
  classNames: { type: Object as PropType<IProcessedStyleSet<ICalendarDayStyles>>, default: () => ({}) },
}, 'CalendarDayNavigationButtons')

const CalendarDayNavigationButtons = defineComponent({
  name: 'CalendarDayNavigationButtons',

  props: makeCalendarDayNavigationButtonsProps(),

  setup(props, { attrs, emit, slots }) {
    const onSelectPrevMonth = () => {
      props.onNavigateDate(addMonths(props.navigatedDate, -1), false)
    }
    const onSelectNextMonth = () => {
      props.onNavigateDate(addMonths(props.navigatedDate, 1), false)
    }

    const prevMonthInBounds = computed(() => props.minDate
      ? +compareDatePart(props.minDate, getMonthStart(props.navigatedDate)) < 0
      : true)
    const nextMonthInBounds = computed(() => props.maxDate
      ? +compareDatePart(getMonthEnd(props.navigatedDate), props.maxDate) < 0
      : true)

    const slotProps = computed(() => {
      const headerIconButton = {
        type: 'button',
      }
      return asSlotProps({
        monthComponents: {
          class: props.classNames.monthComponents,
        },
        prevButton: {
          ...headerIconButton,
          class: css(props.classNames.headerIconButton, {
            [props.classNames.disabledStyle]: !prevMonthInBounds.value,
          }),
          tabIndex: prevMonthInBounds.value ? undefined : props.allFocusable ? 0 : -1,
          ariaDisabled: !prevMonthInBounds.value,
          type: 'button',
          onClick: onSelectPrevMonth,
        },
        nextButton: {
          ...headerIconButton,
          class: css(props.classNames.headerIconButton, {
            [props.classNames.disabledStyle]: !prevMonthInBounds.value,
          }),
          tabIndex: nextMonthInBounds.value ? undefined : props.allFocusable ? 0 : -1,
          ariaDisabled: !nextMonthInBounds.value,
          type: 'button',
          onClick: onSelectNextMonth,
        },
        closeButton: {
          ...headerIconButton,
          class: css(props.classNames.headerIconButton),
          title: props.strings.closeButtonAriaLabel,
          type: 'button',
        },
        leftNavigationIcon: {
          iconName: props.navigationIcons.leftNavigation,
        },
        rightNavigationIcon: {
          iconName: props.navigationIcons.rightNavigation,
        },
        closeIcon: {
          iconName: props.navigationIcons.closeIcon,
        },
      })
    })

    useRender(() => h('div', slotProps.value.monthComponents, [
      h('button', slotProps.value.prevButton, [
        h(Icon, slotProps.value.leftNavigationIcon),
      ]),
      h('button', slotProps.value.nextButton, [
        h(Icon, slotProps.value.rightNavigationIcon),
      ]),
      props.showCloseButton && h('button', slotProps.value.closeButton, [
        h(Icon, slotProps.value.closeIcon),
      ]),
    ]))
  },
})
