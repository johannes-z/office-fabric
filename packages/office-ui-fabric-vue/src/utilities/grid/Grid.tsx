import { styled } from '../../components/styled'
import { getStyles } from './Grid.styles'
import { IGridProps, IGridStyleProps, IGridStyles } from './Grid.types'
import { GridBase } from './Grid.base'

export const Grid = styled<IGridProps, IGridStyleProps, IGridStyles>(
  GridBase,
  getStyles,
  undefined,
  { scope: 'Grid' },
)
