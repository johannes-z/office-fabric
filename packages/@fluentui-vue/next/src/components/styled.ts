import { getTheme } from '@fluentui-vue/style-utilities'
import type { IStyleFunctionOrObject, IStyleSet } from '@fluentui/merge-styles'
import { concatStyleSetsWithProps } from '@fluentui/merge-styles'
import { type DefineComponent, defineComponent, h, ref } from 'vue'
import type { FunctionalComponentDefinition } from '..'
import { useForwardRef } from '@/composables'

export interface IPropsWithStyles<TStyleProps, TStyleSet extends IStyleSet> {
  styles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>
}

export type StyleFunction<TStyleProps, TStyleSet extends IStyleSet> = IStyleFunctionOrObject<TStyleProps, TStyleSet> & {
  /** Cache for all style functions. */
  __cachedInputs__: (IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined)[]

  /** True if no styles prop or styles from Customizer is passed to wrapped component. */
  __noStyleOverride__: boolean
}

export function styled<
TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet>,
TStyleProps,
TStyleSet extends IStyleSet,
TRef = unknown,
>(
  Component: any,
  baseStyles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
) {
  const _theme = ref(getTheme())

  const StyledComponent = defineComponent<TComponentProps>({
    name: `Styled${Component.name}`,

    inheritAttrs: false,

    props: [
      ...new Set([
        ...Array.isArray(Component.props)
          ? Component.props
          : Object.keys(Component.props ?? {}),
        'styles',
        'theme',
        'className',
      ]),
    ] as any,

    setup(props, { attrs, emit, slots }) {
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

      const handleRef = useForwardRef()

      return () => h(Component, {
        ref: handleRef,
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
