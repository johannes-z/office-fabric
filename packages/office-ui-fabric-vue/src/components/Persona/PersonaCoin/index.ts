import { PersonaCoinBase } from './PersonaCoin.base'
import { getStyles } from './PersonaCoin.styles'
import { styled } from '../../styled'

export const PersonaCoin = styled(
  PersonaCoinBase,
  getStyles,
  undefined,
  { scope: 'PersonaCoin' },
)
