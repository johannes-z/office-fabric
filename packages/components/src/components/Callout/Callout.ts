import { computed, defineComponent, getCurrentInstance, h, ref, toRefs } from 'vue'
import { asSlotProps } from '../../utils/types'
import { Layer } from '../Layer'
import { CalloutContent } from './CalloutContent'
import { useForwardRef } from '@/composables'

export const Callout = defineComponent({
  name: 'Callout',

  props: {
    layerProps: { type: Object, default: () => ({}) },
    doNotLayer: { type: Boolean, default: false },
  },

  setup(props, { attrs, slots, expose }) {
    const { layerProps, doNotLayer } = toRefs(props)
    const handleRef = useForwardRef()

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...layerProps,
      },
      content: {
        ...props,
        ...attrs,
        ref: handleRef,
        doNotLayer: doNotLayer.value,
      },
    }))

    const content = () => h(CalloutContent, slotProps.value.content, slots)
    return () => doNotLayer.value
      ? content()
      : h(Layer, slotProps.value.root, content)
  },
})
