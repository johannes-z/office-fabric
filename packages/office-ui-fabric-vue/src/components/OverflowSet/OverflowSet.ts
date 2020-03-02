
import OverflowSetBase from './OverflowSet.base.vue'
import { getStyles } from './OverflowSet.styles'
import { IOverflowSetProps } from './OverflowSet.types'
import { styled } from '../styled'

export const OverflowSet: any = styled(OverflowSetBase, getStyles, undefined, {
  scope: 'OverflowSet',
})
