import type { ITheme } from '@fluentui-vue/style-utilities'
import { getTheme } from '@fluentui-vue/style-utilities'
import type { IStyleFunctionOrObject, IStyleSet } from '@fluentui/merge-styles'
import type { PropType } from 'vue'

export function useStylingProps<TStyleProps = any, TStyle extends IStyleSet<TStyle> = any>() {
  return {
    /**
     * test
     */
    styles: { type: [Object, Function] as PropType<IStyleFunctionOrObject<TStyleProps, TStyle> | undefined>, default: () => ({}) },
    theme: { type: Object as PropType<ITheme>, default: () => getTheme() },
    className: { type: String, default: undefined },
  }
}

export const StylingPropKeys = ['styles', 'theme', 'className']
