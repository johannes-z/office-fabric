import { styled } from '../styled'
import { ContextualMenuBase } from './ContextualMenu.base'
import { getStyles } from './ContextualMenu.styles'
import type { IContextualMenuProps, IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types'

/**
 * ContextualMenu description
 */
export const ContextualMenu = styled(
  ContextualMenuBase,
  getStyles,
)
