import { classNamesFunction } from '@fluentui-vue/utilities'
import type { PropType, VNode } from 'vue'
import { h } from 'vue'
import { getIconContent } from './FontIcon'
import type { IIconStyleProps, IIconStyles, IImageIconProps } from './Icon.types'
import { StylingPropKeys, defineFunctionalComponent, useStylingProps } from '@/utils/'

const getClassNames = classNamesFunction<IIconStyleProps, IIconStyles>({
  // Icon is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Icon.
  // Therefore setting a larger cache size.
  cacheSize: 100,
})

type IconContentChildren = string | undefined | VNode | VNode[] | typeof h

export const IconBase = defineFunctionalComponent({
  name: 'IconBase',

  props: {
    ...useStylingProps(),

    iconName: { type: String, default: '' },
    imageProps: { type: Object as PropType<IImageIconProps>, default: undefined },
  },

  render(props, { attrs }) {
    const { className, iconName, theme, styles, imageProps } = props

    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0
    const isImage = !!imageProps
    const iconContent = getIconContent(iconName) || {}
    const children = iconContent.children as IconContentChildren
    const { iconClassName } = iconContent

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      iconClassName,
      isImage,
      isPlaceholder,
    })

    const RootType = isImage ? 'span' : 'i'

    return h(RootType, {
      ...attrs,
      'class': classNames.root,
      'aria-hidden': 'true',
      'data-icon-name': iconName,
    }, typeof children === 'function'
      ? [children(h)]
      : (Array.isArray(children))
          ? children
          : [children])
  },
})
