import { styled } from '../styled'
import { ContextualMenuItemBase } from './ContextualMenuItem.base'
import { getItemStyles } from './ContextualMenu.classNames'

/**
 * ContextualMenuItem description
 */
export const ContextualMenuItem = styled(
  ContextualMenuItemBase,
  getItemStyles,
)
