import { computed, defineComponent, h, ref, toRefs } from 'vue'
import { asSlotProps } from '../../utils/types'
import { Layer } from '../Layer'
import { CalloutContent } from './CalloutContent'

export const Callout = defineComponent({
  name: 'Callout',

  props: {
    layerProps: { type: Object, default: () => ({}) },
    doNotLayer: { type: Boolean, default: false },
  },

  setup(props, { attrs, slots, expose }) {
    const { layerProps, doNotLayer } = toRefs(props)
    const calloutContentRef = ref(null)
    const layerRef = ref(null)

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        ...layerProps,
        ref: layerRef,
      },
      content: {
        ...props,
        ...attrs,
        donNotLayer: doNotLayer.value,
        ref: calloutContentRef,
      },
    }))

    expose({
      calloutContentRef,
      layerRef
    })

    const content = () => h(CalloutContent, slotProps.value.content, slots)
    return () => doNotLayer.value ? content() : h(Layer, slotProps.value.root, content)
  }
})