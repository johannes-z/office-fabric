import { DEFAULT_CALENDAR_STRINGS, DEFAULT_DATE_FORMATTING, DateRangeType, DayOfWeek, type ICalendarStrings, type IDateFormatting } from '@fluentui/date-time-utilities'
import type { PropType } from 'vue'

export function makeCalendarProps() {
  return {
    firstDayOfWeek: { type: Number as PropType<DayOfWeek>, default: DayOfWeek.Sunday },
    dateRangeType: { type: Number as PropType<DateRangeType>, default: DateRangeType.Day },

    strings: { type: Object as PropType<ICalendarStrings>, default: DEFAULT_CALENDAR_STRINGS },
    dateTimeFormatter: { type: Object as PropType<IDateFormatting>, default: DEFAULT_DATE_FORMATTING },

    isMonthPickerVisible: { type: Boolean, default: true },
    isDayPickerVisible: { type: Boolean, default: true },
    showMonthPickerAsOverlay: { type: Boolean, default: false },
    showGoToToday: { type: Boolean, default: false },
    showWeekNumbers: { type: Boolean, default: false },
  }
}
