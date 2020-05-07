import { ComboBoxBase } from './ComboBox.base'
import { getStyles } from './ComboBox.styles'
import { styled } from '../styled'

export const ComboBox = styled(
  ComboBoxBase,
  getStyles,
  undefined,
  {
    scope: 'ComboBox',
    fields: ['hostId', 'theme', 'styles'],
  },
)
