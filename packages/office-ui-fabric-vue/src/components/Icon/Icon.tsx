import { Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'

import { getIconContent } from './FontIcon'
import { IIconProps } from './Icon.types'

const getClassNames = classNamesFunction({ disableCaching: true })

type IconContentChildren = string | undefined | ((h: CreateElement) => JSX.Element)

@Component
export default class Icon extends StatelessComponent<IIconProps> {
  @Prop({ type: String, default: '' }) iconName!: string
  @Prop({ type: Object, default: null }) imageProps!: any

  render (h: CreateElement, context: RenderContext) {
    const { className, iconName, theme, styles } = context.props

    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0
    const isImage = !!context.props.imageProps
    const iconContent = getIconContent(iconName) || {}
    const children = iconContent.children as IconContentChildren
    const { iconClassName } = iconContent

    const classNames: any = getClassNames(styles, {
      theme,
      className,
      iconClassName,
      isImage,
      isPlaceholder,
    })

    const RootType = isImage ? 'span' : 'i'

    return h(RootType, {
      ...context.data,
      class: classNames.root,
      attrs: {
        'aria-hidden': 'true',
        'data-icon-name': iconName,
      },
    }, typeof children === 'function' ? [children(h)] : children)
  }
}
