import { styled } from '../styled'
import { ContextualMenuItemBase } from './ContextualMenuItem.base'
import { getItemStyles } from './ContextualMenu.classNames'

// export * from './ContextualMenuItem.types'

export const ContextualMenuItem = styled(
  ContextualMenuItemBase,
  getItemStyles,
  undefined,
  { scope: 'ContextualMenuItem' },
)
