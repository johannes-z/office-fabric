import { defineComponent, h } from 'vue'
import { DEFAULT_DATE_FORMATTING } from '@fluentui/date-time-utilities'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { defaultCalendarNavigationIcons } from '../defaults'
import { getStyles } from './CalendarMonth.styles'
import type { ICalendarMonthProps, ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types'

const MONTHS_PER_ROW = 4

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>()

const DEFAULT_PROPS: Readonly<Partial<ICalendarMonthProps>> = {
  styles: getStyles,
  strings: undefined,
  navigationIcons: defaultCalendarNavigationIcons,
  dateTimeFormatter: DEFAULT_DATE_FORMATTING,
  yearPickerHidden: false,
}

export const CalendarMonthBase = defineComponent({
  name: 'CalendarMonthBase',

  props: {

  },

  setup(props, { attrs, slots }) {
    return () => h('div', 'CalendarMonthBase')
  },
})
