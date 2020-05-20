import { memoizeFunction, css } from '@uifabric-vue/utilities'
import { getIcon } from '@uifabric/styling'
import Vue, { RenderContext, VNode, CreateElement } from 'vue'
import StatelessComponent from '../StatelessComponent'
import { Component, Prop } from 'vue-property-decorator'
import { MS_ICON, classNames } from './Icon.styles'
import { IIconProps } from './Icon.types'

export interface IIconContent {
  children?: string;
  iconClassName?: string;
  fontFamily?: string;
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
    }
  },
  undefined,
  // @ts-ignore
  true,
)

@Component
export class FontIcon extends StatelessComponent<IIconProps> {
  @Prop({ type: String, default: '' }) iconName!: string

  render (h: CreateElement, ctx: RenderContext): VNode {
    const className = ctx.props.className || ctx.data.class
    const { iconName, style = {} } = ctx.props
    const iconContent = getIconContent(iconName) || {}
    const children = iconContent.children as unknown as ((h: CreateElement) => JSX.Element) | string
    const { iconClassName, fontFamily } = iconContent

    return (
      <i class={css(MS_ICON, classNames.root, iconClassName, !iconName && classNames.placeholder, className)}
        style={{ fontFamily, ...style }}>
        {typeof children === 'function' ? children(h) : children}
      </i>
    )
  }
}
