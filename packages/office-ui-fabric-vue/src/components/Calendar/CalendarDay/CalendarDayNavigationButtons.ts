import { withCalendarDayGridProps } from '@/components/CalendarDayGrid/useCalendarDayGrid'
import { Icon } from '@/components/Icon'
import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { addMonths, compareDatePart, getMonthEnd, getMonthStart } from '@fluentui/date-time-utilities'
import { css } from '@uifabric-vue/utilities'
import { IProcessedStyleSet } from '@uifabric/styling'
import Vue, { VNode } from 'vue'
import { ICalendarNavigationIcons } from '../Calendar.types'
import { defaultCalendarNavigationIcons } from '../defaults'
import { onButtonKeyDown } from '../helpers'
import { withCalendarProps } from '../useCalendar'
import { ICalendarDayProps, ICalendarDayStyles } from './CalendarDay.types'

interface ICalendarDayNavigationButtonsProps extends ICalendarDayProps {
  classNames: IProcessedStyleSet<ICalendarDayStyles>;
}

export const CalendarDayNavigationButtons = Vue.extend({
  name: 'CalendarDayNavigationButtons',

  functional: true,

  props: {
    ...withThemeableProps(),
    ...withCalendarProps(),
    ...withCalendarDayGridProps(),

    navigationIcons: { type: Object as () => ICalendarNavigationIcons, default: () => defaultCalendarNavigationIcons },
    classNames: { type: Object as () => IProcessedStyleSet<ICalendarDayStyles>, required: true },
  } as MappedType<ICalendarDayNavigationButtonsProps>,

  render (h, ctx): VNode {
    const {
      minDate,
      maxDate,
      navigatedDate,
      navigationIcons,
      classNames,
      allFocusable,
      strings,
      showCloseButton,
    } = ctx.props

    const onSelectNextMonth = (): void => {
      (ctx.listeners.onNavigateDate as Function | undefined)?.(addMonths(navigatedDate, 1), false)
    }

    const onSelectPrevMonth = (): void => {
      (ctx.listeners.onNavigateDate as Function | undefined)?.(addMonths(navigatedDate, -1), false)
    }

    const onDismiss = (): void => {
      (ctx.listeners.onDismiss as Function | undefined)?.()
    }

    const leftNavigationIcon = navigationIcons.leftNavigation
    const rightNavigationIcon = navigationIcons.rightNavigation
    const closeNavigationIcon = navigationIcons.closeIcon

    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true
    const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true

    return h('div', {
      class: classNames.monthComponents,
    }, [
      h('button', {
        class: css(classNames.headerIconButton, {
          [classNames.disabledStyle]: !prevMonthInBounds,
        }),
        attrs: {
          'aria-disabled': !prevMonthInBounds,
          tabIndex: prevMonthInBounds ? undefined : allFocusable ? 0 : -1,
          title: strings.prevMonthAriaLabel
            ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()]
            : undefined,
        },
        on: {
          ...prevMonthInBounds && {
            click: onSelectPrevMonth,
            keydown: onButtonKeyDown(onSelectPrevMonth),
          },
        },
      }, [
        h(Icon, { props: { iconName: leftNavigationIcon } }),
      ]),

      h('button', {
        class: css(classNames.headerIconButton, {
          [classNames.disabledStyle]: !nextMonthInBounds,
        }),
        attrs: {
          'aria-disabled': !nextMonthInBounds,
          tabIndex: nextMonthInBounds ? undefined : allFocusable ? 0 : -1,
          title: strings.nextMonthAriaLabel
            ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()]
            : undefined,
        },
        on: {
          ...nextMonthInBounds && {
            click: onSelectNextMonth,
            keydown: onButtonKeyDown(onSelectNextMonth),
          },
        },
      }, [
        h(Icon, { props: { iconName: rightNavigationIcon } }),
      ]),

      showCloseButton && h('button', {
        class: css(classNames.headerIconButton),
        attrs: {
          title: strings.closeButtonAriaLabel,
          type: 'button',
        },
        on: {
          click: onDismiss,
          keydown: onButtonKeyDown(onDismiss),
        },
      }, [
        h(Icon, { props: { iconName: closeNavigationIcon } }),
      ]),
    ])
  },
})
