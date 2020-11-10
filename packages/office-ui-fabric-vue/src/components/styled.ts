import { IStyleFunctionOrObject, IStyleSet, concatStyleSetsWithProps } from '@uifabric/merge-styles'
import Vue, { CreateElement, RenderContext, VNode } from 'vue'

import { Customizations } from '@uifabric-vue/utilities'
import { getTheme, registerOnThemeChangeCallback } from '@uifabric/styling'

export interface IPropsWithStyles<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>> {
  styles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
}

export interface ICustomizableProps {
  /**
   * Name of scope, which can be targeted using the Customizer.
   */
  scope: string;

  /**
   * List of fields which can be customized.
   * @defaultvalue [ 'theme', 'styles' ]
   */
  fields?: string[];
}

const DefaultFields = ['theme', 'styles']

export function styled<
  TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet>,
  TStyleProps,
  TStyleSet extends IStyleSet<TStyleSet>
> (
  Component: any,
  baseStyles: IStyleFunctionOrObject<any, any>,
  getProps?: (props: any) => Partial<any>,
  customizable?: ICustomizableProps,
  pure?: boolean,
) {
  customizable = customizable || { scope: '', fields: undefined }

  const { scope, fields = DefaultFields } = customizable

  let _styles: any

  return Vue.extend({
    name: `Styled${(Component as any).displayName || (Component as any).name}`,
    inheritAttrs: false,
    props: typeof Component === 'function'
      ? Component.options.props
      : Component.props,
    data () {
      return {
        internalTheme: getTheme(),
      }
    },
    created () {
      registerOnThemeChangeCallback(theme => {
        this.internalTheme = theme
      })
    },
    render (this: any, h: CreateElement): VNode {
      const settings = Customizations.getSettings(fields, scope)
      const { styles: customizedStyles, dir, ...rest } = settings
      const additionalProps = getProps ? getProps(this) : undefined

      if (!_styles || customizedStyles !== _styles.__cachedInputs__[1] || !!this.styles) {
        _styles = (styleProps: any) => concatStyleSetsWithProps(styleProps, baseStyles, this.styles)
        _styles.__cachedInputs__ = [baseStyles, this.styles]
      }

      return h(Component, {
        on: this.$listeners,
        attrs: this.$attrs,
        class: this.className || this.$attrs.class || this.$vnode.data.class,
        props: {
          ...rest,
          ...additionalProps,
          ...this.$attrs,
          ...this.$props,
          theme: this.internalTheme,
          // className: this.className || this.$attrs.class,
          styles: _styles,
        },
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    },
  })
}
