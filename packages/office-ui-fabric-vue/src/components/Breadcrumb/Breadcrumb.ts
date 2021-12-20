import { styled } from '../styled'
import { BreadcrumbBase } from './Breadcrumb.base'
import { getStyles } from './Breadcrumb.styles'
import { IBreadcrumbProps, IBreadcrumbStyleProps, IBreadcrumbStyles } from './Breadcrumb.types'

export const Breadcrumb = styled<
IBreadcrumbProps,
IBreadcrumbStyleProps,
IBreadcrumbStyles
>(
  BreadcrumbBase,
  getStyles,
  undefined,
  { scope: 'Breadcrumb' },
)
