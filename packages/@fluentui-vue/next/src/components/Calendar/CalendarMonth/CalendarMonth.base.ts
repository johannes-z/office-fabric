import { classNamesFunction, css, getRTL } from '@fluentui-vue/utilities'
import { addYears, compareDatePart, getMonthEnd, getMonthStart, getYearEnd, getYearStart, setMonth } from '@fluentui/date-time-utilities'
import { usePrevious } from '@vueuse/core'
import { type Ref, computed, defineComponent, h, ref, toRefs } from 'vue'
import { watch } from 'vue'
import { makeCalendarMonthProps } from '../makeProps'
import { CalendarYear } from '../CalendarYear/CalendarYear'
import type { ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types'
import { Icon } from '@/index'
import { useRender } from '@/composables'

const MONTHS_PER_ROW = 4

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>()

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

    const isYearPickerVisible = ref(false)

    const selectMonthCallback = (newMonth: number): (() => void) => {
      return () => onSelectMonth(newMonth)
    }
    const onSelectNextYear = () => {
      props.onNavigateDate(addYears(navigatedDate.value, 1), false)
    }
    const onSelectPrevYear = () => {
      props.onNavigateDate(addYears(navigatedDate.value, -1), false)
    }
    const onSelectMonth = (newMonth: number): void => {
      // If header is clickable the calendars are overlayed, switch back to day picker when month is clicked
      props.onHeaderSelect?.()
      props.onNavigateDate(setMonth(navigatedDate.value, newMonth), true)
    }
    const onYearPickerHeaderSelect = (focus: boolean): void => {
      // focusOnNextUpdate();
      isYearPickerVisible.value = false
    }
    const onHeaderSelect = () => {
      if (!props.yearPickerHidden)
        isYearPickerVisible.value = true

      else
        props.onHeaderSelect?.()
    }
    const onSelectYear = (selectedYear: number) => {
      // focusOnNextUpdate();
      const navYear = navigatedDate.value.getFullYear()
      if (navYear !== selectedYear) {
        let newNavigationDate = new Date(navigatedDate.value.getTime())
        newNavigationDate.setFullYear(selectedYear)
        // for min and max dates, adjust the new navigation date - perhaps this should be
        // checked on the master navigation date handler (i.e. in Calendar)
        if (props.maxDate && newNavigationDate > props.maxDate)
          newNavigationDate = setMonth(newNavigationDate, props.maxDate.getMonth())

        else if (props.minDate && newNavigationDate < props.minDate)
          newNavigationDate = setMonth(newNavigationDate, props.minDate.getMonth())

        props.onNavigateDate(newNavigationDate, true)
      }
      isYearPickerVisible.value = false
    }

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

    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme!,
      className: props.className,
      hasHeaderClickCallback: !!onHeaderSelect || !props.yearPickerHidden,
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
        onClick: onHeaderSelect,
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
        role: 'row',
      },
      itemButton: (rowNum: number, month: string, index: number) => {
        const monthIndex = rowNum * MONTHS_PER_ROW + index
        const indexedMonth = setMonth(navigatedDate.value, monthIndex)
        const isNavigatedMonth = navigatedDate.value.getMonth() === monthIndex
        const isSelectedMonth = props.selectedDate.getMonth() === monthIndex
        const isSelectedYear = props.selectedDate.getFullYear() === navigatedDate.value.getFullYear()
        const isInBounds
          = (props.minDate ? +compareDatePart(props.minDate, getMonthEnd(indexedMonth)) < 1 : true)
          && (props.maxDate ? +compareDatePart(getMonthStart(indexedMonth), props.maxDate) < 1 : true)

        return [{
          type: 'button',
          role: 'gridcell',
          onClick: isInBounds ? selectMonthCallback(monthIndex) : undefined,
          class: css(classNames.value.itemButton, {
            [classNames.value.current]:
            props.highlightCurrentMonth && isCurrentMonth(monthIndex, navigatedDate.value.getFullYear(), props.today),
            [classNames.value.selected]: props.highlightSelectedMonth && isSelectedMonth && isSelectedYear,
            [classNames.value.disabled]: !isInBounds,
          }),
          disabled: !props.allFocusable && !isInBounds,
          key: monthIndex,
          'aria-label': props.dateTimeFormatter.formatMonth(indexedMonth, props.strings),
          'aria-selected': isNavigatedMonth,
          'data-is-focusable': isInBounds ? true : undefined,
        }, month] as const
      },
      year: {
        strings: {
          rangeAriaLabel: '',
          prevRangeAriaLabel: '',
          nextRangeAriaLabel: '',
          headerAriaLabelFormatString: '',
        },
        minYear: props.minDate?.getFullYear() ?? undefined,
        maxYear: props.maxDate?.getFullYear() ?? undefined,
        styles: props.styles,
        highlightCurrentYear: props.highlightCurrentMonth,
        highlightSelectedYear: props.highlightSelectedMonth,
        animationDirection: props.animationDirection,
        selectedYear: props.selectedDate?.getFullYear() ?? props.navigatedDate?.getFullYear() ?? undefined,
        onHeaderSelect: onYearPickerHeaderSelect,
        onSelectYear,
      },
    }))

    useRender(() => {
      if (isYearPickerVisible.value)
        return h(CalendarYear, slotProps.value.year, slots)

      // Month Picker
      return h('div', slotProps.value.root, [
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
            }, monthsForRow.map((month, index) => h('button', ...slotProps.value.itemButton(rowNum, month, index))))
          }),
        ),
      ])
    })
  },
})

function isCurrentMonth(month: number, year: number, today: Date): boolean {
  return today.getFullYear() === year && today.getMonth() === month
}
