import { IStyleFunctionOrObject, IStyleSet, concatStyleSetsWithProps } from '@uifabric/merge-styles'
import Vue, { CreateElement, RenderContext, VNode } from 'vue'

import { Customizations, useCustomizationSettings } from '@uifabric-vue/utilities'
import { getTheme, registerOnThemeChangeCallback } from '@uifabric/styling'
import { computed, ref } from '@vue/composition-api'

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

const theme = ref(getTheme())
registerOnThemeChangeCallback(value => {
  console.log('registerOnThemeChangeCallback')
  theme.value = value
})

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
    name: `Styled${Component?.prototype?.constructor?.extendOptions?.name || Component.displayName || Component.name}`,

    functional: true,

    model: Component?.prototype?.constructor?.options?.model,

    render (h: CreateElement, context: RenderContext<TComponentProps>): VNode {
      const settings = Customizations.getSettings(fields, scope)
      const { styles: customizedStyles, dir, ...rest } = settings
      const additionalProps = getProps ? getProps(this) : undefined

      if (!_styles || customizedStyles !== _styles.__cachedInputs__[1] || !!context.props.styles) {
        _styles = (styleProps: any) => concatStyleSetsWithProps(styleProps, baseStyles, context.props.styles)
        _styles.__cachedInputs__ = [baseStyles, context.props.styles]
      }

      return h(Component, {
        ...context.data,
        props: {
          ...rest,
          ...additionalProps,
          ...context.props,
          theme: theme.value,
          className: context.props.className || context.data.class,
          styles: _styles,
        },
        scopedSlots: context.scopedSlots,
      }, context.children)
    },
  })
}
