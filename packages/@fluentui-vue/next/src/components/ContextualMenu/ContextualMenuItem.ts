import { ContextualMenuItemBase } from './ContextualMenuItem.base'
import { getItemStyles } from './ContextualMenu.classNames'
import { styled } from '../styled'

/**
 * ContextualMenuItem description
 */
export const ContextualMenuItem = styled(
  ContextualMenuItemBase,
  getItemStyles,
)
