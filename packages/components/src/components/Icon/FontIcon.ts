import { getIcon } from '@fluentui-vue/style-utilities'
import { memoizeFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import { MS_ICON, classNames } from './Icon.styles'

export interface IIconContent {
  children?: string | Function | any[]
  iconClassName?: string
  fontFamily?: string
  mergeImageProps?: boolean
}

export const getIconContent = memoizeFunction(
  (iconName?: string): IIconContent | null => {
    const { code, subset }: Pick<any, 'code'> & { subset: Partial<any> } = getIcon(iconName) || {
      subset: {},
      code: undefined,
    }

    if (!code)
      return null

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

export function FontIcon(props, { attrs }) {
  const { iconName, className = attrs.class, style = attrs.style || {} } = props
  const iconContent = getIconContent(iconName) || {}
  const { iconClassName, children, fontFamily } = iconContent

  return h('i', {
    ...attrs,
    'data-icon-name': iconName,
    class: [
      MS_ICON,
      classNames.root,
      iconClassName,
      !iconName && classNames.placeholder,
      className,
    ],
    style: { fontFamily, ...style },
  }, typeof children === 'function'
    ? [children(h)]
    : (Array.isArray(children))
        ? children
        : [children])
}

FontIcon.props = ['iconName', 'className']
