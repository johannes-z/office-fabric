import { LayerBase } from './Layer.base'
import { getStyles } from './Layer.styles'
import { styled } from '../styled'

export const Layer = styled(
  LayerBase,
  getStyles,
  undefined,
  {
    scope: 'Layer',
    fields: ['hostId', 'theme', 'styles'],
  },
)
