import { MappedType } from '@/types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ICalendarYearProps, ICalendarYearRange, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
import { CalendarYearGridCell } from './CalendarYearGridCell'
import { withCalendarYearProps, withCalendarYearRangeProps } from './useCalendarYear'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

interface ICalendarYearGridProps extends ICalendarYearProps, ICalendarYearRange {
  selectedYear?: number;
  animateBackwards?: boolean;
  // componentRef?: IRefObject<ICalendarYearGridCell>;
}

const CELLS_PER_ROW = 4

export const CalendarYearGrid = Vue.extend({
  name: 'CalendarYearGrid',

  functional: true,

  props: {
    ...withCalendarYearProps(),
    ...withCalendarYearRangeProps(),

  } as MappedType<ICalendarYearGridProps>,

  render (h, ctx): VNode {
    const {
      styles,
      theme,
      className,
      animateBackwards,
      animationDirection,
      fromYear,
      toYear,
      selectedYear,
      minYear,
      maxYear,
    } = ctx.props

    const renderCell = (yearToRender: number): VNode => {
      const selected = yearToRender === selectedYear
      const disabled = (minYear !== undefined && yearToRender < minYear) ||
        (maxYear !== undefined && yearToRender > maxYear)
      const current = yearToRender === new Date().getFullYear()

      return h(CalendarYearGridCell, {
        key: yearToRender,
        ...ctx.data,
        props: {
          ...ctx.props,
          year: yearToRender,
          selected,
          current,
          disabled,
        },
      })
    }

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      animateBackwards: animateBackwards,
      animationDirection: animationDirection,
    })

    const onRenderYear = (value: number) => {
      return ctx.scopedSlots.onRenderYear?.(value) ?? `${value}`
    }

    const gridAriaLabel = `${onRenderYear(fromYear)} - ${onRenderYear(toYear)}`

    let year = fromYear
    const cells: VNode[][] = []

    for (let i = 0; i < (toYear - fromYear + 1) / CELLS_PER_ROW; i++) {
      cells.push([])
      for (let j = 0; j < CELLS_PER_ROW; j++) {
        cells[i].push(renderCell(year))
        year++
      }
    }

    // TODO FocusZone
    return h('div', {
      class: classNames.gridContainer,
      attrs: {
        role: 'grid',
        'aria-label': gridAriaLabel,
      },
    }, cells.map((cellRow, index: number) =>
      h('div', {
        key: 'yearPickerRow_' + index + '_' + fromYear,
        class: classNames.buttonRow,
        attrs: {
          role: 'row',
        },
      }, cellRow),
    ))
  },
})
