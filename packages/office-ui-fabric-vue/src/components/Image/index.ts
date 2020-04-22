import { styled } from '../styled'
import { ImageBase } from './Image.base'
import { getStyles } from './Image.styles'
import { VueConstructor } from 'vue'

export * from './Image.types'

export const Image: VueConstructor = styled(
  ImageBase,
  getStyles,
  undefined,
  { scope: 'Image' },
)
