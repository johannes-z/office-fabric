import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction, format, KeyCodes } from '@uifabric-vue/utilities'
import Vue, { PropType, VNode } from 'vue'
import { AnimationDirection } from '../Calendar.types'
import { withCalendarProps } from '../useCalendar'
import { ICalendarYearHeaderProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
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

    const onHeaderSelect = () => {
      (ctx.listeners.onHeaderSelect as Function | undefined)?.(true)
    }

    const onHeaderKeyDown = (ev: KeyboardEvent) => {
      if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
        onHeaderSelect()
      }
    }

    const onRenderYear = (value: number) => {
      return ctx.scopedSlots.default?.({ year: value }) ?? `${value}`
    }

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: !!ctx.listeners.onHeaderSelect,
      animateBackwards: animateBackwards,
      animationDirection: animationDirection,
    })

    if (ctx.listeners.onHeaderSelect) {
      const rangeAriaLabel = strings!.rangeAriaLabel
      const headerAriaLabelFormatString = strings!.headerAriaLabelFormatString
      const currentDateRange = rangeAriaLabel
        ? typeof rangeAriaLabel === 'string'
          ? rangeAriaLabel
          : rangeAriaLabel(ctx.props)
        : undefined

      const ariaLabel = headerAriaLabelFormatString
        ? format(headerAriaLabelFormatString, currentDateRange)
        : currentDateRange

      return h('button', {
        class: classNames.currentItemButton,
        attrs: {
          'aria-label': ariaLabel,
          role: 'button',
          type: 'button',
          'aria-atomic': true,
          'aria-live': 'polite',
        },
        on: {
          click: onHeaderSelect,
          keydown: onHeaderKeyDown,
        },
      }, [onRenderYear(fromYear), ' - ', onRenderYear(toYear)])
    }

    return h('div', {
      class: classNames.current,
    }, [onRenderYear(fromYear), ' - ', onRenderYear(toYear)])
  },
})
