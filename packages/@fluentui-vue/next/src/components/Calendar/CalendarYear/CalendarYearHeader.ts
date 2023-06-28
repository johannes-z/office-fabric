import { type PropType, computed, defineComponent, h } from 'vue'
import { classNamesFunction, css, format, getRTL } from '@fluentui-vue/utilities'
import { AnimationDirection, type ICalendarNavigationIcons, type ICalendarYearStrings, type ICalendarYearStyleProps, type ICalendarYearStyles, defaultCalendarNavigationIcons } from '..'
import { asSlotProps, defineFunctionalComponent, makeStylingProps, propsFactory } from '@/utils'
import { useRender } from '@/composables'
import { Icon } from '@/components'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

const CELL_COUNT = 12

const DefaultCalendarYearStrings: ICalendarYearStrings = {
  prevRangeAriaLabel: undefined,
  nextRangeAriaLabel: undefined,
}

const enum CalendarYearNavDirection {
  Previous,
  Next,
}

const CalendarYearNavArrow = defineFunctionalComponent({
  name: 'CalendarYearNavArrow',

  props: propsFactory({
    ...makeStylingProps(),

    fromYear: { type: Number, required: true },
    toYear: { type: Number, required: true },
    minYear: { type: Number, default: undefined },
    maxYear: { type: Number, default: undefined },
    direction: { type: Number as PropType<CalendarYearNavDirection>, default: CalendarYearNavDirection.Next },
    navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
  }, 'CalendarYearNavArrow')(),

  render(props, { attrs, slots }) {
    const {
      styles,
      theme,
      className,
      navigationIcons = defaultCalendarNavigationIcons,
      direction,
      fromYear,
      toYear,
      maxYear,
      minYear,
    } = props

    const disabled = direction === CalendarYearNavDirection.Previous
      ? minYear !== undefined && fromYear < minYear
      : maxYear !== undefined && fromYear + CELL_COUNT > maxYear

    const isLeftNavigation = getRTL()
      ? direction === CalendarYearNavDirection.Next
      : direction === CalendarYearNavDirection.Previous

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
    })

    const slotProps = asSlotProps({

      navigationButton: {
        class: css(classNames.navigationButton, {
          [classNames.disabled]: disabled,
        }),
        type: 'button',
      },
      icon: {
        iconName: isLeftNavigation ? navigationIcons.leftNavigation : navigationIcons.rightNavigation,
      },
    })

    return h('button', slotProps.navigationButton, [
      h(Icon, slotProps.icon),
    ])
  },
})

const CalendarYearNav = defineFunctionalComponent({
  name: 'CalendarYearNav',

  props: {
    ...makeStylingProps(),

    fromYear: { type: Number, required: true },
    toYear: { type: Number, required: true },

    strings: { type: Object as PropType<ICalendarYearStrings>, default: () => DefaultCalendarYearStrings },

    animateBackwards: { type: Boolean, default: false },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: AnimationDirection.Horizontal },
    onHeaderSelect: { type: Function, default: undefined },
  },

  render(props, { attrs, slots }) {
    const { styles, theme, className } = props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
    })

    const slotProps = asSlotProps({
      navigationButtonsContainer: {
        class: classNames.navigationButtonsContainer,
      },
      previous: {
        ...props,
        direction: CalendarYearNavDirection.Previous,
      },
      next: {
        ...props,
        direction: CalendarYearNavDirection.Next,
      },
    })

    return h('div', slotProps.navigationButtonsContainer, [
      h(CalendarYearNavArrow, slotProps.previous),
      h(CalendarYearNavArrow, slotProps.next),
    ])
  },
})

const CalendarYearTitle = defineFunctionalComponent({
  name: 'CalendarYearTitle',

  props: propsFactory({
    ...makeStylingProps(),

    fromYear: { type: Number, required: true },
    toYear: { type: Number, required: true },

    strings: { type: Object as PropType<ICalendarYearStrings>, default: () => DefaultCalendarYearStrings },

    animateBackwards: { type: Boolean, default: false },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: AnimationDirection.Horizontal },
    onHeaderSelect: { type: Function, default: undefined },
  }, 'CalendarYearTitle')(),

  render(props, { attrs, slots }) {
    const {
      styles,
      theme,
      className,
      fromYear,
      toYear,
      strings,
      animateBackwards,
      animationDirection,
    } = props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      hasHeaderClickCallback: !!props.onHeaderSelect,
      animateBackwards,
      animationDirection,
    })

    const slotProps = asSlotProps({

      current: {
        class: classNames.current,
      },
      currentItemButton: {
        class: classNames.currentItemButton,
        onClick: props.onHeaderSelect,
        role: 'button',
        type: 'button',
      },
      currentItemButtonText: {
        'aria-live': 'assertive',
        'aria-atomic': true,
      },
    })

    const onRenderYear = (year: number) => {
      return slots.year?.(year) ?? year
    }

    if (props.onHeaderSelect) {
      const rangeAriaLabel = strings.rangeAriaLabel
      const headerAriaLabelFormatString = strings.headerAriaLabelFormatString
      const currentDateRange = rangeAriaLabel
        ? typeof rangeAriaLabel === 'string'
          ? rangeAriaLabel
          : rangeAriaLabel(props)
        : undefined

      const ariaLabel = headerAriaLabelFormatString
        ? format(headerAriaLabelFormatString, currentDateRange)
        : currentDateRange

      return h('button', {
        ...slotProps.currentItemButton,
        'aria-label': ariaLabel,
      }, [
        h('span', slotProps.currentItemButtonText, `${onRenderYear(fromYear)} - ${onRenderYear(toYear)}`),
      ])
    }

    return h('div', slotProps.current, `${onRenderYear(fromYear)} - ${onRenderYear(toYear)}`)
  },
})

export const CalendarYearHeader = defineFunctionalComponent({
  name: 'CalendarYearHeader',

  props: {
    ...makeStylingProps(),
    strings: { type: Object, default: () => ({}) },

    year: { type: Number, default: false },
    fromYear: { type: Number, required: true },
    toYear: { type: Number, required: true },
    animateBackwards: { type: Boolean, default: false },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: AnimationDirection.Horizontal },
    onHeaderSelect: { type: Function, default: undefined },
  },

  render(props, { attrs, slots }) {
    const { styles, theme, className, animateBackwards, animationDirection } = props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      hasHeaderClickCallback: !!props.onHeaderSelect,
      animateBackwards,
      animationDirection,
    })

    const slotProps = asSlotProps({
      headerContainer: {
        class: classNames.headerContainer,
      },
    })

    return h('div', slotProps.headerContainer, [
      slots.title?.(props) ?? h(CalendarYearTitle, props),
      h(CalendarYearNav, props),
    ])
  },
})
