// import { IDetailsListProps, IDetailsListBaseProps, IDetailsListStyleProps, IDetailsListStyles } from './DetailsList.types'
import DetailsListBase from './DetailsList.vue'
import { getStyles } from './DetailsList.styles'
import { VueConstructor } from 'vue'
import { styled } from '../styled'

export const DetailsList: VueConstructor = styled(
  DetailsListBase,
  getStyles,
  undefined,
  { scope: 'DetailsList' },
)
