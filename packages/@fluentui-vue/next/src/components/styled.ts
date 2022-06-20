import { getTheme } from '@fluentui-vue/style-utilities'
import { concatStyleSetsWithProps } from '@fluentui/merge-styles'
import Vue, { CreateElement, RenderContext, VNode } from 'vue'

export function styled (
  Component: any,
  baseStyles?: any,
) {
  let _styles: any

  return Vue.extend({
    name: `Styled${Component?.extendOptions?.name || Component.displayName || Component.name}`,

    functional: true,

    model: Component?.options?.model,

    props: {
      ...typeof Component === 'function'
        ? Component.options.props
        : Component.props,

      styles: { type: [Object, Function], default: undefined },
      theme: { type: Object, default: () => getTheme() },
      className: { type: String, default: '' },
    },

    render (h: CreateElement, ctx: RenderContext): VNode {
      if (!_styles || ctx.props.styles !== _styles.__cachedInputs__[1] || !!ctx.props.styles) {
        _styles = (styleProps: any) => concatStyleSetsWithProps(styleProps, baseStyles, ctx.props.styles)
        _styles.__cachedInputs__ = [baseStyles, ctx.props.styles]
      }

      return h(Component, {
        ...ctx.data,
        props: {
          ...ctx.props,
          className: ctx.props.className || ctx.data.class,
          styles: _styles,
        },
      }, ctx.children)
    },
  })
}
