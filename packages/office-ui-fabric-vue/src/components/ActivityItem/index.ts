import ActivityItemBase from './ActivityItem.vue'
import { getStyles } from './ActivityItem.styles'
import { VueConstructor } from 'vue'
import { styled } from '../styled'

export const ActivityItem: VueConstructor = styled(
  ActivityItemBase,
  getStyles,
  undefined,
  { scope: 'ActivityItem' },
)
