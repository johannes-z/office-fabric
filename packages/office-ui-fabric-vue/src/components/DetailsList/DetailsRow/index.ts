// import { IDetailsRowProps, IDetailsRowBaseProps, IDetailsRowStyleProps, IDetailsRowStyles } from './DetailsRow.types'
import DetailsRowBase from './DetailsRow.vue'
import { getStyles } from './DetailsRow.styles'
import { VueConstructor } from 'vue'
import { styled } from '../../styled'

export const DetailsRow: VueConstructor = styled(
  DetailsRowBase,
  getStyles,
  undefined,
  { scope: 'DetailsRow' },
)
