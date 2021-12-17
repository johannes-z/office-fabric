import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { css, memoizeFunction } from '@uifabric-vue/utilities'
import { getIcon } from '@uifabric/styling'
import Vue, { CreateElement, RenderContext, VNode } from 'vue'
import { IFontIconProps } from './Icon.types'
import { classNames, MS_ICON } from './Icon.styles'

export interface IIconContent {
  children?: string;
  iconClassName?: string;
  fontFamily?: string;
  mergeImageProps?: boolean;
}

export const getIconContent = memoizeFunction(
  (iconName?: string): IIconContent | null => {
    const { code, subset }: Pick<any, 'code'> & { subset: Partial<any> } = getIcon(iconName) || {
      subset: {},
      code: undefined,
    }

    if (!code) {
      return null
    }

    return {
      children: code,
      iconClassName: subset.className,
      fontFamily: subset.fontFace && subset.fontFace.fontFamily,
      mergeImageProps: subset.mergeImageProps,
    }
  },
  undefined,
  true,
)

export const FontIcon = Vue.extend({
  functional: true,

  props: {
    ...withThemeableProps(),

    iconName: { type: String, default: '' },
  } as MappedType<IFontIconProps>,

  render (h: CreateElement, ctx: RenderContext): VNode {
    const { iconName, className, style = {} } = ctx.props
    const iconContent = getIconContent(iconName) || {}
    const { iconClassName, children, fontFamily } = iconContent

    return h('i', {
      attrs: {
        'data-icon-name': iconName,
      },
      class: css(MS_ICON, classNames.root, iconClassName, !iconName && classNames.placeholder, className),
      style: { fontFamily, ...style },
    }, children)
  },
})
