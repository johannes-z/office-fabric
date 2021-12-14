import { CalendarDayGrid } from '@/components/CalendarDayGrid/CalendarDayGrid'
import { withThemeableProps } from '@/useThemeable'
import { DateRangeType, DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, IDateFormatting } from '@fluentui/date-time-utilities'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { computed, defineComponent, h, PropType, toRefs } from '@vue/composition-api'
import { AnimationDirection, ICalendarNavigationIcons, ICalendarStrings } from '..'
import { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types'

import { useId } from '@fluentui-vue/vue-hooks'
import { defaultCalendarNavigationIcons } from '../defaults'

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>()

export const CalendarDayBase = defineComponent({
  props: {
    ...withThemeableProps(),

    showWeekNumbers: { type: Boolean, default: false },
    showSixWeeksByDefault: { type: Boolean, default: false },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: undefined },

    strings: { type: Object as PropType<ICalendarStrings>, default: () => DEFAULT_CALENDAR_STRINGS },

    navigatedDate: { type: Date, required: true },
    minDate: { type: Date, default: undefined },
    maxDate: { type: Date, default: undefined },
    restrictedDates: { type: Array as PropType<Date[]>, default: undefined },

    dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: () => DEFAULT_DATE_FORMATTING },

    dateRangeType: { type: Number as PropType<DateRangeType>, default: DateRangeType.Day },

    navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
  },

  setup (props, ctx) {
    const {
      strings,
      navigatedDate,
      dateTimeFormatter,
      styles,
      theme,
      className,
      // onHeaderSelect,
      showSixWeeksByDefault,
      minDate,
      maxDate,
      restrictedDates,
      // onNavigateDate,
      showWeekNumbers,
      dateRangeType,
      animationDirection,
      navigationIcons,
    } = toRefs(props)
    const monthAndYearId = useId()

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      headerIsClickable: false, // !!onHeaderSelect.value,
      showWeekNumbers: showWeekNumbers.value,
      animationDirection: animationDirection.value,
    }))
    const onHeaderSelect = true

    const monthAndYear = dateTimeFormatter.value.formatMonthYear(navigatedDate.value, strings.value)
    const HeaderButtonComponentType = onHeaderSelect ? 'button' : 'div'

    // const leftNavigationIcon = navigationIcons.value.leftNavigation
    // const rightNavigationIcon = navigationIcons.value.rightNavigation
    // const closeNavigationIcon = navigationIcons.value.closeIcon

    return () => h('div', { class: classNames.value.root }, [
      h('div', { class: classNames.value.header }, [
        h(HeaderButtonComponentType, {
          class: classNames.value.monthAndYear,
          attrs: {
            type: 'button',
          },
        }, [
          h('span', { attrs: { id: monthAndYearId } }, monthAndYear),
        ]),
      ]),
      h(CalendarDayGrid, {
        props: {
          strings: strings.value,
          navigatedDate: navigatedDate.value,
          weeksToShow: showSixWeeksByDefault.value ? 6 : undefined,
          dateTimeFormatter: dateTimeFormatter.value,
          minDate: minDate.value,
          maxDate: maxDate.value,
          restrictedDates: restrictedDates.value,
          // onNavigateDate: onNavigateDate.value,
          labelledBy: monthAndYearId,
          dateRangeType: dateRangeType.value,
        },
      }),
    ])
  },
})
