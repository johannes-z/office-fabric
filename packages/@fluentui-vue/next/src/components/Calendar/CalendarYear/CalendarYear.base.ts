import { classNamesFunction } from '@fluentui-vue/utilities'
import { defineComponent, h } from 'vue'
import type { ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

const CELL_COUNT = 12
const CELLS_PER_ROW = 4

export const CalendarYearBase = defineComponent({
  name: 'CalendarYearBase',

  props: {

  },

  setup(props, { attrs, slots }) {
    return () => h('button', 'test')
  },
})
