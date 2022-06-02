import { DirectionalHint } from '@fluentui-vue/utilities'
import Vue from 'vue'
import { Layer } from '../Layer'
import { asSlotProps } from '../../utils/types'
import { CalloutContent } from './CalloutContent'

export const Callout = Vue.extend({
  name: 'CalloutBase',

  functional: true,

  props: {
    target: { type: [HTMLElement, Object], required: true },
    doNotLayer: { type: Boolean, default: false },
    directionalHint: { type: Number, default: DirectionalHint.bottomAutoEdge },

    layerProps: { type: Object, default: null },
  },

  render (h, ctx) {
    const { layerProps, doNotLayer, ...rest } = ctx.props

    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        props: layerProps,
      },
      content: {
        ...ctx.data,
        props: {
          ...rest,
          ...ctx.data.props,
          ...ctx.data.attrs,
        },
      },
    })

    const content = h(CalloutContent, slotProps.content, ctx.children)

    return doNotLayer ? content : h(Layer, slotProps.root, [content])
  },
})
