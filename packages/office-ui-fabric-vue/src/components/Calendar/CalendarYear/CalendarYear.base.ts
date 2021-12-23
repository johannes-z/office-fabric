import { MappedType } from '@/types'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ICalendarYearProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
import { CalendarYearGrid } from './CalendarYearGrid'
import { CalendarYearHeader } from './CalendarYearHeader'
import { withCalendarYearProps } from './useCalendarYear'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

const CELL_COUNT = 12

export const CalendarYearBase = Vue.extend({
  name: 'CalendarYearBase',

  props: {
    ...withCalendarYearProps(),
  } as MappedType<ICalendarYearProps>,

  data () {
    return {
      fromYear: 0,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ICalendarYearStyles> {
      const { styles, theme, className } = this.$props
      return getClassNames(styles, {
        theme: theme!,
        className: className,
      })
    },
    rangeYear (): number {
      return this.selectedYear || this.navigatedYear || new Date().getFullYear()
    },
    toYear (): number {
      return this.fromYear + CELL_COUNT - 1
    },
  },

  created () {
    this.fromYear = Math.floor(this.rangeYear / 10) * 10
  },

  render (h): VNode {
    const { classNames, fromYear, toYear } = this
    // TODO useAnimateBackwards
    const animateBackwards = false

    return h('div', {
      class: classNames.root,
    }, [
      h(CalendarYearHeader, {
        props: {
          ...this.$props,
          fromYear: fromYear,
          toYear: toYear,
          animateBackwards: animateBackwards,
        },
        on: {
          onHeaderSelect: () => {
            this.$emit('onHeaderSelect')
          },
          onSelectPrev: () => {
            this.fromYear -= CELL_COUNT
          },
          onSelectNext: () => {
            this.fromYear += CELL_COUNT
          },
        },
      }),
      h(CalendarYearGrid, {
        props: {
          ...this.$props,
          fromYear: fromYear,
          toYear: toYear,
          animateBackwards: animateBackwards,
        },
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
      }),
    ])
  },
})
