import { IStyleFunctionOrObject, IStyleSet, concatStyleSetsWithProps } from '@uifabric/merge-styles'
import Vue, { VueConstructor } from 'vue'
import { CreateElement, RenderContext, VNode } from 'vue/types/umd'

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

export function styled (
  Component: VueConstructor<Vue>,
  baseStyles: IStyleFunctionOrObject<any, any>,
  getProps?: (props: any) => Partial<any>,
  customizable?: ICustomizableProps,
  pure?: boolean
): VueConstructor<Vue> {
  return Vue.extend({
    functional: true,
    render: (h: CreateElement, context: RenderContext<any>): VNode => {
      const styles = (styleProps: any) => concatStyleSetsWithProps(styleProps, baseStyles, context.props.styles)
      const additionalProps = getProps ? getProps(context.props) : undefined

      return h(Component, {
        ...context.data,
        props: {
          ...additionalProps,
          ...context.props,
          styles: styles,
        },
      }, context.children)
    },
  })
}
