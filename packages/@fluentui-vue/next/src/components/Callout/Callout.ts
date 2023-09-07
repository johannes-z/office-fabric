import { DirectionalHint } from '@fluentui-vue/utilities'
import { h } from 'vue'
import { asSlotProps } from '../../utils/types'
import { Layer } from '../Layer'
import { CalloutContent } from './CalloutContent'

export function Callout(props, { attrs, slots }) {
  const { layerProps, doNotLayer, directionalHint = DirectionalHint.bottomAutoEdge, ...rest } = props

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      ...layerProps,
    },
    content: {
      ...rest,
      directionalHint,
      ...props,
      ...attrs,
    },
  })

  const content = () => h(CalloutContent, slotProps.content, slots)
  return doNotLayer ? content() : h(Layer, slotProps.root, content)
}

Callout.props = ['layerProps', 'doNotLayer', 'directionalHint']
