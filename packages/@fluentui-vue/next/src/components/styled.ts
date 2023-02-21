import { getTheme } from '@fluentui-vue/style-utilities'
import { concatStyleSetsWithProps } from '@fluentui/merge-styles'
import { h } from 'vue'

export function styled(
  Component: any,
  baseStyles?: any,
) {
  let _styles: any
  const _theme = getTheme()

  const StyledComponent = (props, { slots, emit, attrs }) => {
    if (!_styles || props.styles !== _styles.__cachedInputs__[1] || !!props.styles) {
      _styles = (styleProps: any) => concatStyleSetsWithProps(styleProps, baseStyles, props.styles)
      _styles.__cachedInputs__ = [baseStyles, props.styles]
    }

    return h(Component, {
      ...attrs,
      ...props,
      theme: _theme,
      className: props.className || attrs.class,
      styles: _styles,
    }, slots)
  }
  /*
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
 */

  // StyledComponent.name = `Styled${Component?.extendOptions?.name || Component.displayName || Component.name}`

  StyledComponent.props = [...new Set([...Array.isArray(Component.props) ? Component.props : Object.keys(Component.props ?? {}), 'styles', 'theme', 'className'])]

  return StyledComponent

  // return Vue.extend({
  //   name: `Styled${Component?.extendOptions?.name || Component.displayName || Component.name}`,

  //   functional: true,

  //   model: Component?.options?.model,

  //   props: {
  //     ...typeof Component === 'function'
  //       ? Component.options.props
  //       : Component.props,

  //     styles: { type: [Object, Function], default: undefined },
  //     theme: { type: Object, default: () => getTheme() },
  //     className: { type: String, default: '' },
  //   },

  //   render(h: CreateElement, ctx: RenderContext): VNode {
  //     if (!_styles || ctx.props.styles !== _styles.__cachedInputs__[1] || !!ctx.props.styles) {
  //       _styles = (styleProps: any) => concatStyleSetsWithProps(styleProps, baseStyles, ctx.props.styles)
  //       _styles.__cachedInputs__ = [baseStyles, ctx.props.styles]
  //     }

  //     return h(Component, {
  //       ...ctx.data,
  //       props: {
  //         ...ctx.props,
  //         className: ctx.props.className || ctx.data.class,
  //         styles: _styles,
  //       },
  //     }, ctx.children)
  //   },
  // })
}
