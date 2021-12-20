import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ICalendarYearProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
import { CalendarYearHeader } from './CalendarYearHeader'
import { withCalendarYearProps } from './useCalendarYear'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

const CELL_COUNT = 12
const CELLS_PER_ROW = 4

export const CalendarYearBase = Vue.extend({
  name: 'CalendarYearBase',

  props: {
    ...withCalendarYearProps(),
  } as MappedType<ICalendarYearProps>,

  computed: {
    classNames (): IProcessedStyleSet<ICalendarYearStyles> {
      const { styles, theme, className } = this
      return getClassNames(styles, {
        theme: theme!,
        className: className,
      })
    },
  },

  render (h): VNode {
    const {
      classNames,
    } = this
    return h('div', {
      class: classNames.root,
    }, [
      h(CalendarYearHeader, {
        props: {
          ...this.$props,
        },
      }),
    ])
  },
})
