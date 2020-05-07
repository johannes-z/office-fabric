import { styled } from '../styled'
import { getStyles } from './DetailsList.styles'
import { IDetailsListProps, IDetailsListStyleProps, IDetailsListStyles } from './DetailsList.types'
import { DetailsListBase } from './DetailsList.base'

export const DetailsList = styled<IDetailsListProps, IDetailsListStyleProps, IDetailsListStyles>(
  DetailsListBase,
  getStyles,
  undefined,
  { scope: 'DetailsList' },
)
