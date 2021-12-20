import { withThemeableProps } from '@/useThemeable'
import Vue, { PropType, VNode } from 'vue'
import { AnimationDirection } from '../Calendar.types'
import { withCalendarProps } from '../useCalendar'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { ICalendarYearHeaderProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
import { MappedType } from '@/types'
import { withCalendarYearProps, withCalendarYearRangeProps } from './useCalendarYear'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

export const CalendarYearTitle = Vue.extend({
  name: 'CalendarYearTitle',

  functional: true,

  props: {
    ...withThemeableProps(),
    ...withCalendarProps(),

    ...withCalendarYearProps(),
    ...withCalendarYearRangeProps(),

    animateBackwards: { type: Boolean, default: false },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: undefined },
  } as MappedType<ICalendarYearHeaderProps>,

  render (h, ctx): VNode {
    const {
      styles,
      theme,
      className,
      fromYear,
      toYear,
      strings,
      animateBackwards,
      animationDirection,
    } = ctx.props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: false, //! !props.onHeaderSelect,
      animateBackwards: animateBackwards,
      animationDirection: animationDirection,
    })

    console.log(ctx.listeners)
    if (ctx.listeners.select) {
      return h('button', {
        class: classNames.currentItemButton,
        attrs: {
          // 'aria-label': ariaLabel,
          role: 'button',
          type: 'button',
          'aria-atomic': true,
          'aria-live': 'polite',
        },
      }, ctx.scopedSlots.default?.({ year: fromYear }) ?? `${fromYear}`)
    }

    return h('div', {
      class: classNames.current,
    }, ctx.scopedSlots.default?.({ year: fromYear }) ?? `${fromYear}`)
  },
})
