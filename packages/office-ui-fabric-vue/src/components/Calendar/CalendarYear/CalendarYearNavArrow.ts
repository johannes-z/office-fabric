import { withThemeableProps } from '@/useThemeable'
import Vue, { PropType, VNode } from 'vue'
import { AnimationDirection } from '../Calendar.types'
import { withCalendarProps } from '../useCalendar'
import { classNamesFunction, css, getRTL } from '@uifabric-vue/utilities'
import { ICalendarYearHeaderProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
import { MappedType } from '@/types'
import { withCalendarYearProps, withCalendarYearRangeProps } from './useCalendarYear'
import { ICalendarNavigationIcons } from '..'
import { defaultCalendarNavigationIcons } from '../defaults'
import { Icon } from '@/components'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

export const enum CalendarYearNavDirection {
  Previous,
  Next,
}

interface ICalendarYearNavArrowProps extends ICalendarYearHeaderProps {
  direction: CalendarYearNavDirection;
}

const CELL_COUNT = 12
const CELLS_PER_ROW = 4

export const CalendarYearNavArrow = Vue.extend({
  name: 'CalendarYearNavArrow',

  functional: true,

  props: {
    ...withCalendarYearProps(),
    ...withCalendarYearRangeProps(),
    direction: { type: Number as PropType<CalendarYearNavDirection>, default: undefined },
    navigationIcons: { type: Object as PropType<ICalendarNavigationIcons>, default: () => defaultCalendarNavigationIcons },
  } as MappedType<ICalendarYearNavArrowProps>,

  render (h, ctx): VNode {
    const { styles, theme, className, navigationIcons, direction, minYear, maxYear, fromYear, toYear, strings } = ctx.props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
    })

    const ariaLabel = direction === CalendarYearNavDirection.Previous
      ? strings!.prevRangeAriaLabel
      : strings!.nextRangeAriaLabel
    const newRangeOffset = direction === CalendarYearNavDirection.Previous
      ? -CELL_COUNT
      : CELL_COUNT
    const newRange = {
      fromYear: fromYear + newRangeOffset,
      toYear: toYear + newRangeOffset,
    }

    const ariaLabelString = ariaLabel
      ? (typeof ariaLabel === 'string' ? ariaLabel : ariaLabel(newRange))
      : undefined

    const disabled = direction === CalendarYearNavDirection.Previous
      ? minYear !== undefined && fromYear < minYear
      : maxYear !== undefined && fromYear + CELL_COUNT > maxYear

    const isLeftNavigation = getRTL()
      ? direction === CalendarYearNavDirection.Next
      : direction === CalendarYearNavDirection.Previous

    return h('button', {
      class: css(classNames.navigationButton, {
        [classNames.disabled]: disabled,
      }),
      attrs: {
        type: 'button',
        title: ariaLabelString,
        disabled: disabled,
      },
      on: {
        ...!disabled && ctx.listeners.click && { click: ctx.listeners.click },
      },
    }, [
      h(Icon, {
        props: {
          iconName: isLeftNavigation ? navigationIcons!.leftNavigation : navigationIcons!.rightNavigation,
        },
      }),
    ])
  },
})
