import { styled } from '../styled'
import { SearchBoxBase } from './SearchBox.base'
import { getStyles } from './SearchBox.styles'

export const SearchBox = styled(
  SearchBoxBase,
  getStyles,
  undefined,
  { scope: 'SearchBox' },
)
