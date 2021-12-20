import { DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, ICalendarStrings, IDateFormatting } from '@fluentui/date-time-utilities'
import { PropType } from 'vue'

export const withCalendarProps = () => ({
  strings: { type: Object as () => ICalendarStrings, default: () => DEFAULT_CALENDAR_STRINGS },
  dateTimeFormatter: { type: Object as () => IDateFormatting, default: () => DEFAULT_DATE_FORMATTING },

})
