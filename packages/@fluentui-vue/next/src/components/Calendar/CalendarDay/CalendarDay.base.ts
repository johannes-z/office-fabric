import { useId } from '@fluentui-vue/hooks'
import { classNamesFunction, format } from '@fluentui-vue/utilities'
import { computed, defineComponent, h } from 'vue'
import { makeCalendarDayProps } from '../makeProps'
import type { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types'
import { CalendarDayNavigationButtons } from './CalendarDayNavigationButtons'
import { asSlotProps } from '@/utils'
import { useRender } from '@/composables'
import { CalendarDayGrid } from '@/components/CalendarDayGrid/CalendarDayGrid'

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>()

export const CalendarDayBase = defineComponent({
  name: 'CalendarDayBase',

  props: makeCalendarDayProps(),

  setup(props) {
    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme!,
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
