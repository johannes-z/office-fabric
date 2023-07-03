import { type PropType, computed, defineComponent, h } from 'vue'
import { classNamesFunction, css, format, getRTL } from '@fluentui-vue/utilities'
import { AnimationDirection, type ICalendarNavigationIcons, type ICalendarYearHeaderProps, type ICalendarYearStrings, type ICalendarYearStyleProps, type ICalendarYearStyles, defaultCalendarNavigationIcons } from '..'
import { asSlotProps, defineFunctionalComponent, makeStylingProps, propsFactory, propsFactoryFromInterface } from '@/utils'
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

interface ICalendarYearNavArrowProps extends ICalendarYearHeaderProps {
  direction: CalendarYearNavDirection
}

function makeCalendarYearHeaderProps() {
  return {
    fromYear: { type: Number, required: true },
    toYear: { type: Number, required: true },
    minYear: { type: Number, default: undefined },
    maxYear: { type: Number, default: undefined },
    navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
    strings: { type: Object, default: undefined },
    animateBackwards: { type: Boolean, default: false },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: AnimationDirection.Horizontal },

    selectedYear: { type: Date, default: undefined },
    navigatedYear: { type: Date, default: undefined },
    highlightCurrentYear: { type: Boolean, default: false },
    highlightSelectedYear: { type: Boolean, default: false },

    onSelectYear: { type: Function, default: undefined },
    onHeaderSelect: { type: Function, default: undefined },
    onSelectPrev: { type: Function, default: undefined },
    onSelectNext: { type: Function, default: undefined },
  }
}

const CalendarYearNavArrow = defineFunctionalComponent({
  name: 'CalendarYearNavArrow',

  props: propsFactoryFromInterface<ICalendarYearNavArrowProps>()({
    ...makeStylingProps(),
    ...makeCalendarYearHeaderProps(),

    direction: { type: Number as PropType<CalendarYearNavDirection>, default: CalendarYearNavDirection.Next },
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
      strings = DefaultCalendarYearStrings,
      onSelectPrev,
      onSelectNext,
    } = props
    console.log('render CalendarYearNavArrow')

    const onNavigate = () => {
      direction === CalendarYearNavDirection.Previous ? onSelectPrev?.() : onSelectNext?.()
    }

    const ariaLabel = direction === CalendarYearNavDirection.Previous ? strings.prevRangeAriaLabel : strings.nextRangeAriaLabel
    const newRangeOffset = direction === CalendarYearNavDirection.Previous ? -CELL_COUNT : CELL_COUNT
    const newRange = { fromYear: fromYear + newRangeOffset, toYear: toYear + newRangeOffset }
    const ariaLabelString = ariaLabel ? (typeof ariaLabel === 'string' ? ariaLabel : ariaLabel(newRange)) : undefined

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
        onClick: !disabled ? onNavigate : undefined,
        type: 'button',
        title: ariaLabelString,
        disabled,
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

  props: propsFactoryFromInterface<ICalendarYearHeaderProps>()({
    ...makeStylingProps(),
    ...makeCalendarYearHeaderProps(),
  }, 'CalendarYearNav')(),

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

  props: propsFactoryFromInterface<ICalendarYearHeaderProps>()({
    ...makeStylingProps(),
    ...makeCalendarYearHeaderProps(),
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

  props: propsFactoryFromInterface<ICalendarYearHeaderProps>()({
    ...makeStylingProps(),
    ...makeCalendarYearHeaderProps(),
  }, 'CalendarYearHeader')(),

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
