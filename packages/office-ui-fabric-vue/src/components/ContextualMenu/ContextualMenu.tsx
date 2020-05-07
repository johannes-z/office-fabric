import { styled } from '../styled'
import { getStyles } from './ContextualMenu.styles'
import { IContextualMenuProps, IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types'
import { ContextualMenuBase } from './ContextualMenu.base'

export const ContextualMenu = styled<IContextualMenuProps, IContextualMenuStyleProps, IContextualMenuStyles>(
  ContextualMenuBase,
  getStyles,
  undefined,
  { scope: 'ContextualMenu' },
)
