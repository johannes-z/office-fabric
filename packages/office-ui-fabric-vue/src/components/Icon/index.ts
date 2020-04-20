import { styled } from '../styled'
import IconBase from './Icon'
import { getStyles } from './Icon.styles'
import { VueConstructor } from 'vue'

export * from './Icon.types'

export const Icon: VueConstructor = styled(
  IconBase,
  getStyles,
  undefined,
  { scope: 'Icon' },
)

export * from './FontIcon'
