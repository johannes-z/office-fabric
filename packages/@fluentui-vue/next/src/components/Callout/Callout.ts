import { DirectionalHint } from '@fluentui-vue/utilities'
import Vue, { h } from 'vue'
import { Layer } from '../Layer'
import { asSlotProps } from '../../utils/types'
import { CalloutContent } from './CalloutContent'

export const Callout = (props, { attrs, slots }) => {
  const { layerProps, doNotLayer, directionalHint = DirectionalHint.bottomAutoEdge, ...rest } = props

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      props: layerProps,
    },
    content: {
      ...rest,
      directionalHint,
      ...props,
      ...attrs,
    },
  })

  const content = h(CalloutContent, slotProps.content, slots)
  return doNotLayer ? content : h(Layer, slotProps.root, [content])
}
