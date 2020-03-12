import { styled } from '../styled'
import ContextualMenuBase from './ContextualMenu.vue'
import { getStyles } from './ContextualMenu.styles'
import { VueConstructor } from 'vue'

// export * from './ContextualMenu.types'

export const ContextualMenu: VueConstructor = styled(
  ContextualMenuBase,
  getStyles,
  undefined,
  { scope: 'ContextualMenu' }
)
