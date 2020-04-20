import { styled } from '../styled'
import SearchBoxBase from './SearchBox.vue'
import { getStyles } from './SearchBox.styles'
import { VueConstructor } from 'vue'

export * from './SearchBox.types'

export const SearchBox: VueConstructor = styled(
  SearchBoxBase,
  getStyles,
  undefined,
  { scope: 'SearchBox' },
)
