import { LayerBase } from './Layer.base'
import { getStyles } from './Layer.styles'
import { styled } from '@/components/styled'

export const Layer = styled(
  LayerBase,
  getStyles,
)
