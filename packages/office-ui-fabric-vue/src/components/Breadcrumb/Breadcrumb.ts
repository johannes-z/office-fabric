import { styled } from '../styled'
import { BreadcrumbBase } from './Breadcrumb.base'
import { getStyles } from './Breadcrumb.styles'

export const Breadcrumb = styled(
  BreadcrumbBase,
  getStyles,
  undefined,
  { scope: 'Breadcrumb' },
)
