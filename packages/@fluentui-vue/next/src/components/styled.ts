import { getTheme } from '@fluentui-vue/style-utilities'
import type { IStyleFunctionOrObject, IStyleSet } from '@fluentui/merge-styles'
import { concatStyleSetsWithProps } from '@fluentui/merge-styles'
import { defineComponent, h, onMounted, ref } from 'vue'

export function styled<
// TComponentProps extends ComponentPropsOptions,
TStyleProps,
TStyleSet extends IStyleSet<TStyleSet>,
TRef = unknown,
>(
  Component: any,
  baseStyles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
) {
  let _styles: any

  const _theme = ref(getTheme())

  const StyledComponent = defineComponent({
    name: `Styled${Component.name}`,

    inheritAttrs: false,

    props: [...new Set([...Array.isArray(Component.props) ? Component.props : Object.keys(Component.props ?? {}), 'styles', 'theme', 'className', 'componentRef'])],

    setup(props, { attrs, slots }) {
      if (!_styles || props.styles !== _styles.__cachedInputs__[1] || !!props.styles) {
        _styles = (styleProps: any) => concatStyleSetsWithProps(styleProps, baseStyles, props.styles)
        _styles.__cachedInputs__ = [baseStyles, props.styles]
      }

      const componentRef = ref(null)
      onMounted(() => {
        props.componentRef?.(componentRef.value)
      })

      return () => h(Component, {
        ref: componentRef,
        ...attrs,
        ...props,
        theme: props.theme ?? _theme.value,
        className: props.className || attrs.class,
        styles: _styles,
      }, slots)
    },
  })

  // @ts-ignore
  return StyledComponent
}
