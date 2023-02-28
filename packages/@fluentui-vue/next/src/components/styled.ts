import { getTheme } from '@fluentui-vue/style-utilities'
import type { IStyleFunctionOrObject, IStyleSet } from '@fluentui/merge-styles'
import { concatStyleSetsWithProps } from '@fluentui/merge-styles'
import { Component, DefineComponent, FunctionalComponent, h, mergeProps } from 'vue'

export function styled<
T, TStyleProps, TStyleSet extends IStyleSet<TStyleSet>,
>(
  Component: T,
  baseStyles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
): T {
  let _styles: any

  const StyledComponent = (props, { slots, emit, attrs }) => {
    if (!_styles || props.styles !== _styles.__cachedInputs__[1] || !!props.styles) {
      _styles = (styleProps: any) => concatStyleSetsWithProps(styleProps, baseStyles, props.styles)
      _styles.__cachedInputs__ = [baseStyles, props.styles]
    }

    // @ts-ignore
    return h(Component, {
      ...attrs,
      ...props,
      theme: props.theme ?? getTheme(),
      className: props.className || attrs.class,
      styles: _styles,
    }, slots)
  }

  Object.defineProperty(StyledComponent, 'name', {
    writable: true,
    // @ts-ignore
    value: `Styled${Component.name}`,
  })

  // @ts-ignore
  StyledComponent.props = [...new Set([...Array.isArray(Component.props) ? Component.props : Object.keys(Component.props ?? {}), 'styles', 'theme', 'className'])]

  // @ts-ignore
  return StyledComponent
}
