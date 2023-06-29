import { addMonths, compareDatePart, getMonthEnd, getMonthStart } from '@fluentui/date-time-utilities'
import { h } from 'vue'
import { css } from '@fluentui-vue/utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { makeCalendarDayProps } from '../makeProps'
import { type ICalendarDayProps, type ICalendarDayStyles, Icon } from '@/components'
import { defineFunctionalComponent, propsFactoryFromInterface } from '@/utils'

interface ICalendarDayNavigationButtonsProps extends ICalendarDayProps {
  classNames: IProcessedStyleSet<ICalendarDayStyles>
}

export const makeCalendarDayNavigationButtonsProps = propsFactoryFromInterface<ICalendarDayNavigationButtonsProps>()({
  ...makeCalendarDayProps(),
  classNames: { type: Object, required: true },
}, 'CalendarDayNavigationButtons')

export const CalendarDayNavigationButtons = defineFunctionalComponent({
  name: 'CalendarDayNavigationButtons',

  props: makeCalendarDayNavigationButtonsProps(),

  render(props, { attrs, emit, slots }) {
    const {
      minDate,
      maxDate,
      navigatedDate,
      allFocusable,
      strings,
      navigationIcons,
      showCloseButton,
      classNames,
      onNavigateDate,
      onDismiss,
    } = props

    const onSelectNextMonth = (): void => {
      onNavigateDate(addMonths(navigatedDate, 1), false)
    }

    const onSelectPrevMonth = (): void => {
      onNavigateDate(addMonths(navigatedDate, -1), false)
    }
    const leftNavigationIcon = navigationIcons.leftNavigation
    const rightNavigationIcon = navigationIcons.rightNavigation
    const closeNavigationIcon = navigationIcons.closeIcon

    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? +compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true
    const nextMonthInBounds = maxDate ? +compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true

    // use aria-disabled instead of disabled so focus is not lost
    // when a prev/next button becomes disabled after being clicked
    const slotProps = {
      monthComponents: {
        class: classNames.monthComponents,
      },
      prevButton: {
        class: css(classNames.headerIconButton, {
          [classNames.disabledStyle]: !prevMonthInBounds,
        }),
        tabIndex: prevMonthInBounds ? undefined : allFocusable ? 0 : -1,
        'aria-disabled': !prevMonthInBounds,
        onClick: prevMonthInBounds ? onSelectPrevMonth : undefined,
        title: strings.prevMonthAriaLabel
          ? `${strings.prevMonthAriaLabel} ${strings.months[addMonths(navigatedDate, -1).getMonth()]}`
          : undefined,
        type: 'button',
      },
      nextButton: {
        class: css(classNames.headerIconButton, {
          [classNames.disabledStyle]: !prevMonthInBounds,
        }),
        tabIndex: nextMonthInBounds ? undefined : allFocusable ? 0 : -1,
        'aria-disabled': !nextMonthInBounds,
        onClick: nextMonthInBounds ? onSelectNextMonth : undefined,
        title: strings.nextMonthAriaLabel
          ? `${strings.nextMonthAriaLabel} ${strings.months[addMonths(navigatedDate, 1).getMonth()]}`
          : undefined,
        type: 'button',
      },
      closeButton: {
        class: css(classNames.headerIconButton),
        onClick: onDismiss,
        title: strings.closeButtonAriaLabel,
        type: 'button',
      },
      leftNavigationIcon: {
        iconName: leftNavigationIcon,
      },
      rightNavigationIcon: {
        iconName: rightNavigationIcon,
      },
      closeIcon: {
        iconName: closeNavigationIcon,
      },
    }

    return h('div', slotProps.monthComponents, [
      h('button', slotProps.prevButton, [
        h(Icon, slotProps.leftNavigationIcon),
      ]),
      h('button', slotProps.nextButton, [
        h(Icon, slotProps.rightNavigationIcon),
      ]),
      showCloseButton && h('button', slotProps.closeButton, [
        h(Icon, slotProps.closeIcon),
      ]),
    ])
  },
})
