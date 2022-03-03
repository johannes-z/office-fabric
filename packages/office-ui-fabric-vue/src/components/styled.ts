import { Customizations } from '@uifabric-vue/utilities'
import { concatStyleSetsWithProps, IStyleFunctionOrObject, IStyleSet } from '@uifabric/merge-styles'
import { getTheme, registerOnThemeChangeCallback } from '@uifabric/styling'
import Vue, { CreateElement, VNode } from 'vue'

export interface IPropsWithStyles<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>> {
  styles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
  className?: string
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
    name: `Styled${Component?.extendOptions?.name || Component.displayName || Component.name}`,

    inheritAttrs: false,

    model: Component?.options?.model,

    props: typeof Component === 'function'
      ? Component.options.props
      : Component.props,

    data () {
      return {
        $theme: getTheme(),
      }
    },

    created () {
      registerOnThemeChangeCallback(theme => {
        this.$data.$theme = theme
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
        props: {
          ...rest,
          ...additionalProps,
          ...this.$attrs,
          ...this.$props,
          className: this.className || this.$attrs.class || this.$vnode.data.class,
          theme: this.$data.$theme,
          styles: _styles,
        },
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    },
  })
}
