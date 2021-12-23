import { MappedType } from '@/types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ICalendarYearHeaderProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
import { CalendarYearNavArrow, CalendarYearNavDirection } from './CalendarYearNavArrow'
import { withCalendarYearProps, withCalendarYearRangeProps } from './useCalendarYear'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

export const CalendarYearNav = Vue.extend({
  name: 'CalendarYearNav',

  functional: true,

  props: {
    ...withCalendarYearProps(),
    ...withCalendarYearRangeProps(),
  } as MappedType<ICalendarYearHeaderProps>,

  render (h, ctx): VNode {
    const { styles, theme, className } = ctx.props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
    })

    return h('div', { class: classNames.navigationButtonsContainer }, [
      h(CalendarYearNavArrow, { ...ctx.data, props: { ...ctx.props, direction: CalendarYearNavDirection.Previous } }),
      h(CalendarYearNavArrow, { ...ctx.data, props: { ...ctx.props, direction: CalendarYearNavDirection.Next } }),
    ])
  },
})
