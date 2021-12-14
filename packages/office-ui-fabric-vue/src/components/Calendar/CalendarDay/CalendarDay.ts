import { styled } from '@/components/styled'
import { CalendarDayBase } from './CalendarDay.base'
import { styles } from './CalendarDay.styles'

export const CalendarDay = styled(CalendarDayBase, styles, undefined, {
  scope: 'CalendarDay',
})
