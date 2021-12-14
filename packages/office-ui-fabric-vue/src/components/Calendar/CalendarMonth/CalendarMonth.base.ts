import { Icon } from '@/components'
import { DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, ICalendarStrings } from '@fluentui/date-time-utilities'
import { getTheme, ITheme } from '@fluentui/style-utilities'
import { classNamesFunction, getRTL } from '@uifabric-vue/utilities'
import { computed, defineComponent, h, PropType, toRefs } from '@vue/composition-api'
import { AnimationDirection, ICalendarMonthStyleProps, ICalendarMonthStyles, ICalendarNavigationIcons, IDateFormatting } from '..'
import { defaultCalendarNavigationIcons } from '../defaults'

const MONTHS_PER_ROW = 4

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>()

export default defineComponent({
  props: {
    className: { type: String, default: '' },
    styles: { type: [Object, Function] as PropType<any>, default: undefined },
    theme: { type: Object as PropType<ITheme>, default: () => getTheme() },

    strings: { type: Object as PropType<ICalendarStrings>, default: () => DEFAULT_CALENDAR_STRINGS },

    navigatedDate: { type: Date, required: true },

    highlightCurrentMonth: { type: Boolean, default: false },
    highlightSelectedMonth: { type: Boolean, default: false },
    animateBackwards: { type: Boolean, default: undefined },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: undefined },

    dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: () => DEFAULT_DATE_FORMATTING },

    navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
  },

  setup (props) {
    const {
      className,
      styles,
      theme,

      strings,

      navigatedDate,

      highlightCurrentMonth,
      highlightSelectedMonth,
      animateBackwards,
      animationDirection,

      dateTimeFormatter,
      navigationIcons,
    } = toRefs(props)

    const leftNavigationIcon = navigationIcons.value.leftNavigation
    const rightNavigationIcon = navigationIcons.value.rightNavigation

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      hasHeaderClickCallback: false, //! !props.onHeaderSelect || !yearPickerHidden,
      highlightCurrent: highlightCurrentMonth.value,
      highlightSelected: highlightSelectedMonth.value,
      animateBackwards: animateBackwards.value,
      animationDirection: animationDirection.value,
    }))

    const rowIndexes: number[] = []
    for (let i = 0; i < strings.value.shortMonths.length / MONTHS_PER_ROW; i++) {
      rowIndexes.push(i)
    }

    const yearString = dateTimeFormatter.value.formatYear(navigatedDate.value)

    return () => h('div', { class: classNames.value.root }, [
      h('div', { class: classNames.value.headerContainer }, [
        h('button', { class: classNames.value.currentItemButton }, yearString),
        h('div', { class: classNames.value.navigationButtonsContainer }, [
          h('button', { class: classNames.value.navigationButton }, [
            h(Icon, { props: { iconName: getRTL() ? rightNavigationIcon : leftNavigationIcon } }),
          ]),
          h('button', { class: classNames.value.navigationButton }, [
            h(Icon, { props: { iconName: getRTL() ? leftNavigationIcon : rightNavigationIcon } }),
          ]),
        ]),
      ]),
      h('div', { class: classNames.value.gridContainer }, rowIndexes.map((rowNum: number) => {
        const monthsForRow = strings.value.shortMonths.slice(rowNum * MONTHS_PER_ROW, (rowNum + 1) * MONTHS_PER_ROW)

        return h('div', { class: classNames.value.buttonRow }, monthsForRow.map((month: string, index: number) => {
          return h('button', { class: classNames.value.itemButton }, month)
        }))
      })),
    ])
  },
})
