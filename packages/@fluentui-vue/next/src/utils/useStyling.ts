import type { ITheme } from '@fluentui-vue/style-utilities'
import { getTheme } from '@fluentui-vue/style-utilities'
import type { IStyleFunctionOrObject, IStyleSet } from '@fluentui/merge-styles'
import { type PropType, ref } from 'vue'
import { propsFactory } from './props'

// export function makeStylingProps<TStyleProps = any, TStyle extends IStyleSet = any>() {
//   return propsFactory({
//     /**
//      * test
//      */
//     styles: { type: [Object, Function] as PropType<IStyleFunctionOrObject<TStyleProps, TStyle> | undefined>, default: () => ({}) },
//     theme: { type: Object as PropType<ITheme>, default: () => getTheme() },
//     className: { type: String, default: undefined },
//   }, 'styled')()
//   // return {
//   //   /**
//   //    * test
//   //    */
//   //   styles: { type: [Object, Function] as PropType<IStyleFunctionOrObject<TStyleProps, TStyle> | undefined>, default: () => ({}) },
//   //   theme: { type: Object as PropType<ITheme>, default: () => getTheme() },
//   //   className: { type: String, default: undefined },
//   // }
// }

export const makeStylingProps = propsFactory({
  /**
   * test
   */
  styles: { type: [Object, Function] as PropType<IStyleFunctionOrObject<any, any> | undefined>, default: () => ({}) },
  theme: { type: Object as PropType<ITheme>, default: () => getTheme() },
  className: { type: String, default: undefined },
}, 'styled')

export const StylingPropKeys = Object.keys(makeStylingProps())
