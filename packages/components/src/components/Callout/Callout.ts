import { DirectionalHint } from '@fluentui-vue/utilities'
import { h } from 'vue'
import { asSlotProps } from '../../utils/types'
import { Layer } from '../Layer'
import { CalloutContent } from './CalloutContent'
import { useForwardRef } from '@/composables'

export function Callout(props, { attrs, slots }) {
  const { layerProps, doNotLayer, directionalHint = DirectionalHint.bottomAutoEdge, ...rest } = props

  const calloutRef = useForwardRef()

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
      ref: calloutRef,
    },
  })

  const content = () => h(CalloutContent, slotProps.content, slots)
  return doNotLayer ? content() : h(Layer, slotProps.root, content)
}

Callout.props = ['layerProps', 'doNotLayer', 'directionalHint']
