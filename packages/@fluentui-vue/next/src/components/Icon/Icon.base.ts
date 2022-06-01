import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, PropType, VNode } from 'vue'
import { useStylingProps } from '@/utils/'
import { getIconContent } from './FontIcon'
import { IIconStyleProps, IIconStyles } from './Icon.types'

const getClassNames = classNamesFunction<IIconStyleProps, IIconStyles>({
  // Icon is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Icon.
  // Therefore setting a larger cache size.
  cacheSize: 100,
})

type IconContentChildren = string | undefined | VNode | VNode[] | ((h: CreateElement) => JSX.Element)

export const IconBase = Vue.extend({
  name: 'IconBase',

  functional: true,

  props: {
    ...useStylingProps(),

    iconName: { type: String, default: '' },
    imageProps: { type: Object as PropType<any>, default: undefined },
  },

  render (h: CreateElement, ctx): VNode {
    const { className, iconName, theme, styles } = ctx.props

    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0
    const isImage = !!ctx.props.imageProps
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
      ...ctx.data,
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
  },
})
