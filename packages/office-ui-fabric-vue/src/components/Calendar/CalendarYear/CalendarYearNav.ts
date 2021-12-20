import { withThemeableProps } from '@/useThemeable'
import Vue, { PropType, VNode } from 'vue'
import { AnimationDirection } from '../Calendar.types'
import { withCalendarProps } from '../useCalendar'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { ICalendarYearHeaderProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
import { MappedType } from '@/types'
import { withCalendarYearProps, withCalendarYearRangeProps } from './useCalendarYear'
import { CalendarYearNavArrow, CalendarYearNavDirection } from './CalendarYearNavArrow'

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

    return h('div', {
      class: classNames.navigationButtonsContainer,
    }, [
      h(CalendarYearNavArrow, {
        props: { ...ctx.props, direction: CalendarYearNavDirection.Previous },
        on: {
          click: () => console.log('click', CalendarYearNavDirection.Previous),
        },
      }),
      h(CalendarYearNavArrow, {
        props: { ...ctx.props, direction: CalendarYearNavDirection.Next },
        on: {
          click: () => console.log('click', CalendarYearNavDirection.Next),
        },
      }),
    ])
  },
})
