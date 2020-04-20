import { styled } from '../styled'
import ContextualMenuItemBase from './ContextualMenuItem.base'
import { getItemStyles } from './ContextualMenu.classNames'
import { VueConstructor } from 'vue'

// export * from './ContextualMenuItem.types'

export const ContextualMenuItem: VueConstructor = styled(
  ContextualMenuItemBase,
  getItemStyles,
  undefined,
  { scope: 'ContextualMenuItem' },
)
