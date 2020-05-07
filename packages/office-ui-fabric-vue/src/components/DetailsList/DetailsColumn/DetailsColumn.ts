import { styled } from '../../styled'
import { getStyles } from './DetailsColumn.styles'
import { IDetailsColumnProps, IDetailsColumnStyleProps, IDetailsColumnStyles } from './DetailsColumn.types'
import { DetailsColumnBase } from './DetailsColumn.base'

export const DetailsColumn = styled<IDetailsColumnProps, IDetailsColumnStyleProps, IDetailsColumnStyles>(
  DetailsColumnBase,
  getStyles,
  undefined,
  { scope: 'DetailsColumn' },
)
