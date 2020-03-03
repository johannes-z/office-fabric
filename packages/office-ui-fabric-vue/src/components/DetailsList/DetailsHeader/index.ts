// import { IDetailsHeaderProps, IDetailsHeaderBaseProps, IDetailsHeaderStyleProps, IDetailsHeaderStyles } from './DetailsHeader.types'
import DetailsHeaderBase from './DetailsHeader.vue'
import { getStyles } from './DetailsHeader.styles'
import { VueConstructor } from 'vue'
import { styled } from '../../styled'

export const DetailsHeader: VueConstructor = styled(
  DetailsHeaderBase,
  getStyles,
  undefined,
  { scope: 'DetailsHeader' }
)
