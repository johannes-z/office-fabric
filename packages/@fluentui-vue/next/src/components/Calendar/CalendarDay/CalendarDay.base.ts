import { classNamesFunction } from '@fluentui-vue/utilities'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import type { ICalendarStrings, IDateFormatting } from '@fluentui/date-time-utilities'
import { defaultCalendarStrings } from '../defaults'
import type { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types'
import { asSlotProps, makeStylingProps } from '@/utils'
import { CalendarDayGrid } from '@/components/CalendarDayGrid/CalendarDayGrid'

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>()

export const CalendarDayBase = defineComponent({
  name: 'CalendarDayBase',

  props: {
    ...makeStylingProps(),

    showWeekNumbers: { type: Boolean, default: false },
    animationDirection: { type: Number, default: 0 },
    dateTimeFormatter: { type: Object as PropType<IDateFormatting>, required: true },
    navigatedDate: { type: Date, required: true },
    strings: { type: Object as PropType<ICalendarStrings>, default: defaultCalendarStrings },
  },

  setup(props, { attrs, slots }) {
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
        // CalendarDayNavigationButtons
      ]),
      h(CalendarDayGrid, { ...props }),
    ])
  },
})
