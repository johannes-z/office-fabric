import { Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext, VNode } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'

import { getIconContent } from './FontIcon'
import { IIconProps } from './Icon.types'

const getClassNames = classNamesFunction({
  // Icon is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Icon.
  // Therefore setting a larger cache size.
  cacheSize: 100,
})

type IconContentChildren = string | undefined | VNode | VNode[] | ((h: CreateElement) => JSX.Element)

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

    console.log(children)

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
    }, typeof children === 'function'
      ? [children(h)]
      : (children instanceof Array)
        ? children
        : [children])
  }
}
