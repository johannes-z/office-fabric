
import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { PropType, VNode } from 'vue'
import { AnimationDirection } from '../Calendar.types'
import { ICalendarYearHeaderProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'

import { CalendarYearTitle } from './CalendarYearTitle'
import { CalendarYearNav } from './CalendarYearNav'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

export const CalendarYearHeader = Vue.extend({
  name: 'CalendarYearHeader',

  functional: true,

  props: {
    ...withThemeableProps(),
    animateBackwards: { type: Boolean, default: false },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: undefined },
    fromYear: { type: Number, required: true },
    toYear: { type: Number, required: true },
  } as MappedType<ICalendarYearHeaderProps>,

  render (h, ctx): VNode {
    const { styles, theme, className, animateBackwards, animationDirection } = ctx.props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: false, //! !props.onHeaderSelect,
      animateBackwards: animateBackwards,
      animationDirection: animationDirection,
    })
    return h('div', {
      class: classNames.headerContainer,
    }, [
      ctx.scopedSlots.title?.(ctx.props) || h(CalendarYearTitle, { props: ctx.props }),
      h(CalendarYearNav, { props: ctx.props }),
    ])
  },
})
