import { styled } from '../../styled'
import { getStyles } from './DetailsRow.styles'
import { IDetailsRowProps, IDetailsRowStyleProps, IDetailsRowStyles } from './DetailsRow.types'
import { DetailsRowBase } from './DetailsRow.base'

export const DetailsRow = styled<IDetailsRowProps, IDetailsRowStyleProps, IDetailsRowStyles>(
  DetailsRowBase,
  getStyles,
  undefined,
  { scope: 'DetailsRow' },
)
