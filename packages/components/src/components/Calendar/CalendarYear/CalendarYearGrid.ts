import { type PropType, computed, defineComponent, h, ref, watchEffect } from 'vue'
import { classNamesFunction, css } from '@fluentui-vue/utilities'
import { AnimationDirection, type ICalendarYearProps, type ICalendarYearRange, type ICalendarYearStyleProps, type ICalendarYearStyles } from '..'
import { asSlotProps, makeStylingProps, propsFactoryFromInterface } from '@/utils'
import { useRender } from '@/composables'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

const CELL_COUNT = 12
const CELLS_PER_ROW = 4

interface ICalendarYearGridProps extends ICalendarYearProps, ICalendarYearRange {
  selectedYear?: number
  animateBackwards?: boolean
}

interface ICalendarYearGridCellProps extends ICalendarYearProps {
  year: number
  current?: boolean
  selected?: boolean
  disabled?: boolean
  onSelectYear?: (year: number) => void
  // onRenderYear?: (year: number) => React.ReactNode;
}

const CalendarYearGridCell = defineComponent({
  name: 'CalendarYearGridCell',

  props: propsFactoryFromInterface<ICalendarYearGridCellProps>()({
    ...makeStylingProps(),

    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    highlightCurrentYear: { type: Boolean, default: false },
    highlightSelectedYear: { type: Boolean, default: false },
    year: { type: Number, required: true },
    onSelectYear: { type: Function, default: undefined },
  }, 'CalendarYearGridCell')(),

  setup(props, { attrs, slots }) {
    const onClick = () => {
      props.onSelectYear?.(props.year)
    }

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter' || ev.key === ' ')
        props.onSelectYear?.(props.year)
    }

    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme!,
      className: props.className,
      highlightCurrent: props.highlightCurrentYear,
      highlightSelected: props.highlightSelectedYear,
    }))

    const slotProps = computed(() => ({
      itemButton: {
        class: css(classNames.value.itemButton, {
          [classNames.value.selected]: props.selected,
          [classNames.value.disabled]: props.disabled,
        }),
        type: 'button',
        role: 'gridcell',
        disabled: props.disabled,
        'aria-selected': props.selected,
        onClick: !props.disabled ? onClick : undefined,
        onKeyDown: !props.disabled ? onKeyDown : undefined,
      },
    }))

    useRender(() => h('button', slotProps.value.itemButton, slots.default?.(props.year) ?? props.year))
  },
})

export const CalendarYearGrid = defineComponent({
  name: 'CalendarYearGrid',

  props: propsFactoryFromInterface<ICalendarYearGridProps>()({
    ...makeStylingProps(),
    selectedYear: { type: Number, required: true },
    fromYear: { type: Number, required: true },
    toYear: { type: Number, required: true },
    minYear: { type: Number, default: undefined },
    maxYear: { type: Number, default: undefined },

    onSelectYear: { type: Function, default: undefined },
    animateBackwards: { type: Boolean, default: false },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: AnimationDirection.Horizontal },
  }, 'CalendarYearGrid')(),

  setup(props, { attrs, slots }) {
    const renderCell = (yearToRender: number) => {
      const {
        minYear,
        maxYear,
        selectedYear,
      } = props
      const selected = yearToRender === selectedYear
      const disabled
      = (minYear !== undefined && yearToRender < minYear) || (maxYear !== undefined && yearToRender > maxYear)
      const current = yearToRender === new Date().getFullYear()

      return h(CalendarYearGridCell, {
        ...props,
        year: yearToRender,
        selected,
        disabled,
        current,
        onSelectYear: props.onSelectYear,
        theme: props.theme,
      })
    }

    const onRenderYear = (value: number) => {
      return slots.year?.(value) ?? value
    }

    const gridAriaLabel = computed(() => `${onRenderYear(props.fromYear)} - ${onRenderYear(props.toYear)}`)

    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme!,
      className: props.className,
      animateBackwards: props.animateBackwards,
      animationDirection: props.animationDirection,
    }))

    const slotProps = computed(() => asSlotProps({
      gridContainer: {
        class: classNames.value.gridContainer,
        role: 'grid',
        'aria-label': gridAriaLabel.value,
      },
      buttonRow: {
        class: classNames.value.buttonRow,
        role: 'row',
      },
    }))

    // TODO FocusZone
    useRender(() => {
      const cells: any[][] = []
      let year = props.fromYear
      for (let i = 0; i < (props.toYear - props.fromYear + 1) / CELLS_PER_ROW; i++) {
        cells.push([])
        for (let j = 0; j < CELLS_PER_ROW; j++) {
          cells[i].push(renderCell(year))
          year++
        }
      }

      return h('div', slotProps.value.gridContainer, cells.map((cellRow, index) => {
        return h('div', {
          ...slotProps.value.buttonRow,
          key: `yearPickerRow_${index}_${props.fromYear}`,
        }, [cellRow])
      }))
    })
  },
})
