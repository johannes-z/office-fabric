import { getTheme } from '@fluentui-vue/style-utilities'
import type { IStyleFunctionOrObject, IStyleSet } from '@fluentui/merge-styles'
import { concatStyleSetsWithProps } from '@fluentui/merge-styles'
import { defineComponent, h, onMounted, ref } from 'vue'

export type StyleFunction<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>> = IStyleFunctionOrObject<TStyleProps, TStyleSet> & {
  /** Cache for all style functions. */
  __cachedInputs__: (IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined)[]

  /** True if no styles prop or styles from Customizer is passed to wrapped component. */
  __noStyleOverride__: boolean
}

export function styled<
// TComponentProps extends ComponentPropsOptions,
TStyleProps,
TStyleSet extends IStyleSet<TStyleSet>,
TRef = unknown,
>(
  Component: any,
  baseStyles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
) {
  const _theme = ref(getTheme())

  const StyledComponent = defineComponent({
    name: `Styled${Component.name}`,

    inheritAttrs: false,

    props: [...new Set([...Array.isArray(Component.props) ? Component.props : Object.keys(Component.props ?? {}), 'styles', 'theme', 'className', 'componentRef'])],

    setup(props, { attrs, slots }) {
      const styles = ref<StyleFunction<TStyleProps, TStyleSet>>()

      if (!styles.value || props.styles !== styles.value.__cachedInputs__[1] || !!props.styles) {
        const concatenatedStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> = (styleProps: TStyleProps) =>
          concatStyleSetsWithProps(styleProps, baseStyles, props.styles)

        ;(concatenatedStyles as StyleFunction<TStyleProps, TStyleSet>).__cachedInputs__ = [
          baseStyles,
          props.styles,
        ]
        ;(concatenatedStyles as StyleFunction<TStyleProps, TStyleSet>).__noStyleOverride__ = !props.styles

        styles.value = concatenatedStyles as StyleFunction<TStyleProps, TStyleSet>
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
        styles: styles.value,
      }, slots)
    },
  })

  // @ts-ignore
  return StyledComponent
}
