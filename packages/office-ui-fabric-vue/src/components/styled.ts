import { IStyleFunctionOrObject, IStyleSet, concatStyleSetsWithProps } from '@uifabric/merge-styles'
import Vue, { VueConstructor } from 'vue'
import { CreateElement, RenderContext, VNode } from 'vue/types/umd'
import { Customizations } from '@uifabric-vue/utilities'

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

export function styled (
  Component: VueConstructor<Vue>,
  baseStyles: IStyleFunctionOrObject<any, any>,
  getProps?: (props: any) => Partial<any>,
  customizable?: ICustomizableProps,
  pure?: boolean
): VueConstructor<Vue> {
  customizable = customizable || { scope: '', fields: undefined }

  const { scope, fields = DefaultFields } = customizable

  let _styles: any

  return Vue.extend({
    functional: true,
    render (h: CreateElement, context: RenderContext<any>): VNode {
      if (!_styles || context.props.styles !== _styles.__cachedInputs__[1] || !!context.props.styles) {
        _styles = (styleProps: any) => concatStyleSetsWithProps(styleProps, baseStyles, context.props.styles)
        _styles.__cachedInputs__ = [baseStyles, context.props.styles]
      }

      const additionalProps = getProps ? getProps(this) : undefined

      // const settings = Customizations.getSettings(fields, scope)
      // const { styles: customizedStyles, dir, ...rest } = settings
      // console.log(customizedStyles, dir, rest)

      return h(Component, {
        ...context.data,
        props: {
          ...additionalProps,
          ...context.props,
          className: context.props.className || context.data.class,
          styles: _styles,
        },
      }, context.children)
    },
  })
}
