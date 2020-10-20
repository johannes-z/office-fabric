import { styled } from '../../styled'
import { getStyles } from './DetailsHeader.styles'
import { IDetailsHeaderProps, IDetailsHeaderStyleProps, IDetailsHeaderStyles } from './DetailsHeader.types'
import { DetailsHeaderBase } from './DetailsHeader.base'

export const DetailsHeader = styled<IDetailsHeaderProps, IDetailsHeaderStyleProps, IDetailsHeaderStyles>(
  DetailsHeaderBase,
  getStyles,
  undefined,
  { scope: 'DetailsHeader' },
)
