import { MappedType } from '@/types'
import { classNamesFunction, css, KeyCodes } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ICalendarYearProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
import { withCalendarYearProps } from './useCalendarYear'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

interface ICalendarYearGridCellProps extends ICalendarYearProps {
  year: number;
  current?: boolean;
  selected?: boolean;
  disabled?: boolean;
  // onSelectYear?: (year: number) => void;
  // onRenderYear?: (year: number) => React.ReactNode;
}

export const CalendarYearGridCell = Vue.extend({
  name: 'CalendarYearGridCell',

  functional: true,

  props: {
    ...withCalendarYearProps(),

    year: { type: Number, default: undefined },
    current: { type: Boolean, default: undefined },
    selected: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
  } as MappedType<ICalendarYearGridCellProps>,

  render (h, ctx): VNode {
    const {
      styles,
      theme,
      className,
      highlightCurrentYear,
      highlightSelectedYear,
      selected,
      disabled,
      year,
    } = ctx.props

    const onClick = () => {
      (ctx.listeners.onSelectYear as Function | undefined)?.(year)
    }

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.which === KeyCodes.enter) {
        (ctx.listeners.onSelectYear as Function | undefined)?.(year)
      }
    }

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      highlightCurrent: highlightCurrentYear,
      highlightSelected: highlightSelectedYear,
    })

    const onRenderYear = (value: number) => {
      return ctx.scopedSlots.onRenderYear?.(value) ?? `${value}`
    }

    return h('button', {
      class: css(classNames.itemButton, {
        [classNames.selected]: selected,
        [classNames.disabled]: disabled,
      }),
      attrs: {
        type: 'button',
        role: 'gridcell',
        disabled,
        'aria-selected': selected,
      },
      on: {
        ...!disabled && {
          // @ts-ignore
          click: onClick,
          keydown: onKeyDown,
        },
      },
    }, onRenderYear(year))
  },
})
