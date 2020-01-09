import { Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'

import { getIconContent } from './FontIcon'

const getClassNames = classNamesFunction({ disableCaching: true })

@Component
export default class Icon extends StatelessComponent {
  @Prop({ type: String, default: '' }) iconName!: string
  @Prop({ type: Object, default: null }) imageProps!: any

  render (h: CreateElement, context: RenderContext) {
    const { className, iconName, theme, styles } = context.props

    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0
    const isImage = !!context.props.imageProps
    const iconContent = getIconContent(iconName) || {}
    const { iconClassName, children } = iconContent

    const classNames = getClassNames(styles, {
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
    }, children)
  }
}
