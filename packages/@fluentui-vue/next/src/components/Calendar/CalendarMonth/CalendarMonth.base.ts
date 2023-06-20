import { type PropType, type Ref, computed, defineComponent, h, toRefs } from 'vue'
import { DEFAULT_DATE_FORMATTING, addYears, compareDatePart, getMonthEnd, getMonthStart, getYearEnd, getYearStart, setMonth } from '@fluentui/date-time-utilities'
import { classNamesFunction, css, getRTL } from '@fluentui-vue/utilities'
import type { ICalendarStrings, IDateFormatting } from '@fluentui/date-time-utilities'
import { usePrevious } from '@vueuse/core'
import type { IStyleFunctionOrObject } from '@fluentui/merge-styles'
import { defaultCalendarNavigationIcons } from '../defaults'
import type { AnimationDirection, ICalendarNavigationIcons } from '../Calendar.types'
import { getStyles } from './CalendarMonth.styles'
import type { ICalendarMonthProps, ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types'
import { makeStylingProps, propsFactoryFromInterface } from '@/utils'
import { Icon } from '@/index'

const MONTHS_PER_ROW = 4

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>()

export const makeCalendarMonthProps = propsFactoryFromInterface<ICalendarMonthProps>()({
  ...makeStylingProps(),
  styles: { type: [Object, Function] as PropType<IStyleFunctionOrObject<any, any> | undefined>, default: () => getStyles },
  strings: { type: Object as PropType<ICalendarStrings>, required: true },
  selectedDate: { type: Date, required: true },
  navigatedDate: { type: Date, required: true },

  navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
  dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: () => DEFAULT_DATE_FORMATTING },
  today: { type: Date, default: new Date() },
  minDate: { type: Date, default: undefined },
  maxDate: { type: Date, default: undefined },
  highlightCurrentMonth: { type: Boolean, default: false },
  highlightSelectedMonth: { type: Boolean, default: false },
  allFocusable: { type: Boolean, default: false },
  yearPickerHidden: { type: Boolean, default: false },

  animationDirection: { type: Number as PropType<AnimationDirection>, default: undefined },
}, 'CalendarMonth')

function useAnimateBackwards(navigatedDate: Ref<Date>) {
  const currentYear = computed(() => navigatedDate.value.getFullYear())
  const previousYear = usePrevious(currentYear)

  return computed(() => {
    if (previousYear.value === undefined || previousYear.value === currentYear.value)
      return undefined

    else
      return previousYear.value > currentYear.value
  })
}

export const CalendarMonthBase = defineComponent({
  name: 'CalendarMonthBase',

  emits: [
    'update:navigatedDate',
  ],

  props: makeCalendarMonthProps(),

  setup(props, { attrs, emit, slots }) {
    const {
      navigatedDate,
    } = toRefs(props)

    const animateBackwards = useAnimateBackwards(navigatedDate)

    const yearString = computed(() => props.dateTimeFormatter?.formatYear(navigatedDate.value))

    const isPrevYearInBounds = computed(() => props.minDate
      ? +compareDatePart(props.minDate, getYearStart(navigatedDate.value)) < 0
      : true)
    const isNextYearInBounds = computed(() => props.maxDate
      ? +compareDatePart(getYearEnd(navigatedDate.value), props.maxDate) < 0
      : true)

    const rowIndices = computed(() => {
      const value: number[] = []
      for (let i = 0; i < props.strings.shortMonths.length / MONTHS_PER_ROW; i++)
        value.push(i)

      return value
    })

    const onSelectNextYear = () => {
      emit('update:navigatedDate', addYears(navigatedDate.value, 1), false)
    }
    const onSelectPrevYear = () => {
      emit('update:navigatedDate', addYears(navigatedDate.value, -1), false)
    }

    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme!,
      className: props.className,
      // hasHeaderClickCallback: !!props.onHeaderSelect || !yearPickerHidden,
      highlightCurrent: props.highlightCurrentMonth,
      highlightSelected: props.highlightSelectedMonth,
      animateBackwards: animateBackwards.value,
      animationDirection: props.animationDirection,
    }))

    const slotProps = computed(() => ({
      root: {
        class: classNames.value.root,
      },
      headerContainer: {
        class: classNames.value.headerContainer,
      },
      currentItemButton: {
        class: classNames.value.currentItemButton,
        type: 'button',
      },
      yearString: {
        ariaLive: 'polite',
        ariaAtomic: true,
      },
      navigationButtonsContainer: {
        class: classNames.value.navigationButtonsContainer,
      },
      prevYearNavigationButton: {
        type: 'button',
        class: css(classNames.value.navigationButton, {
          [classNames.value.disabled]: !isPrevYearInBounds.value,
        }),
        ariaDisabled: !isPrevYearInBounds.value,
        onClick: onSelectPrevYear,
      },
      prevYearIcon: {
        iconName: getRTL()
          ? props.navigationIcons!.rightNavigation
          : props.navigationIcons!.leftNavigation,
      },
      nextYearNavigationButton: {
        type: 'button',
        class: css(classNames.value.navigationButton, {
          [classNames.value.disabled]: !isNextYearInBounds.value,
        }),
        ariaDisabled: !isNextYearInBounds.value,
        onClick: onSelectNextYear,
      },
      nextYearIcon: {
        iconName: getRTL()
          ? props.navigationIcons!.leftNavigation
          : props.navigationIcons!.rightNavigation,
      },
      gridContainer: {
        class: classNames.value.gridContainer,
        role: 'grid',
        ariaLabel: yearString.value,
      },
      buttonRow: {
        class: classNames.value.buttonRow,
      },
      itemButton: {
        type: 'button',
      },
    }))

    return () => h('div', slotProps.value.root, [
      h('div', slotProps.value.headerContainer, [
        h('button', slotProps.value.currentItemButton, [
          h('span', slotProps.value.yearString, yearString.value),
        ]),

        h('div', slotProps.value.navigationButtonsContainer, [
          h('button', slotProps.value.prevYearNavigationButton, [
            h(Icon, slotProps.value.prevYearIcon),
          ]),
          h('button', slotProps.value.nextYearNavigationButton, [
            h(Icon, slotProps.value.nextYearIcon),
          ]),
        ]),
      ]),

      h('div', slotProps.value.gridContainer,
        rowIndices.value.map((rowNum) => {
          const monthsForRow = props.strings.shortMonths.slice(rowNum * MONTHS_PER_ROW, (rowNum + 1) * MONTHS_PER_ROW)

          return h('div', {
            ...slotProps.value.buttonRow,
          }, monthsForRow.map((month, index) => {
            const monthIndex = rowNum * MONTHS_PER_ROW + index
            const indexedMonth = setMonth(navigatedDate.value, monthIndex)
            const isNavigatedMonth = navigatedDate.value.getMonth() === monthIndex
            const isSelectedMonth = props.selectedDate.getMonth() === monthIndex
            const isSelectedYear = props.selectedDate.getFullYear() === navigatedDate.value.getFullYear()
            const isInBounds
              = (props.minDate ? +compareDatePart(props.minDate, getMonthEnd(indexedMonth)) < 1 : true)
              && (props.maxDate ? +compareDatePart(getMonthStart(indexedMonth), props.maxDate) < 1 : true)

            return h('button', {
              ...slotProps.value.itemButton,
              class: css(classNames.value.itemButton, {
                [classNames.value.current]:
                props.highlightCurrentMonth && isCurrentMonth(monthIndex, navigatedDate.value.getFullYear(), props.today),
                [classNames.value.selected]: props.highlightSelectedMonth && isSelectedMonth && isSelectedYear,
                [classNames.value.disabled]: !isInBounds,
              }),
              disabled: !props.allFocusable && !isInBounds,
              key: monthIndex,
              ariaLabel: props.dateTimeFormatter.formatMonth(indexedMonth, props.strings),
              ariaSelected: isNavigatedMonth,
              dataIsFocusable: isInBounds ? true : undefined,
              onClick: () => {
                emit('update:navigatedDate', setMonth(navigatedDate.value, monthIndex), true)
              },
            }, month)
          }))
        }),
      ),
    ])
  },
})

function isCurrentMonth(month: number, year: number, today: Date): boolean {
  return today.getFullYear() === year && today.getMonth() === month
}
