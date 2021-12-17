import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { CreateElement, PropType, VNode } from 'vue'
import { IIconStyleProps, IIconStyles } from '.'
import { IImageProps } from '../Image'
import { getIconContent } from './FontIcon'
import { IIconProps } from './Icon.types'

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
    ...withThemeableProps(),

    iconName: { type: String, default: '' },
    imageProps: { type: Object as PropType<IImageProps>, default: undefined },
  } as MappedType<IIconProps>,

  render (h, ctx): VNode {
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
