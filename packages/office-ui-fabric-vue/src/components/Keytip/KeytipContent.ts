import { IKeytipProps, IKeytipStyleProps, IKeytipStyles } from './Keytip.types'
import { KeytipContentBase } from './KeytipContent.base'
import { getStyles } from './Keytip.styles'
import { styled } from '../styled'

export const KeytipContent = styled<
IKeytipProps,
IKeytipStyleProps,
IKeytipStyles
>(KeytipContentBase, getStyles, undefined, {
  scope: 'KeytipContent',
})
