import type { VNode } from 'vue'
import { defineComponent, getCurrentInstance, h, onBeforeUnmount, onMounted, toRefs } from 'vue'
import { css } from '@fluentui-vue/utilities'
import { notifyHostChanged, registerLayerHost, unregisterLayerHost } from './Layer.notification'
import { makeStylingProps } from '@/utils'

export const LayerHost = defineComponent({
  name: 'LayerHost',

  props: {
    hostId: { type: String, default: null },
  },

  setup(props, { attrs, slots }) {
    const { hostId } = toRefs(props)

    onMounted(() => {
      registerLayerHost(hostId.value, getCurrentInstance())
      notifyHostChanged(hostId.value)
    })
    onBeforeUnmount(() => {
      unregisterLayerHost(hostId.value, getCurrentInstance())
      notifyHostChanged(hostId.value)
    })

    return () => h('div', {
      ...props,
      ref: 'layerHostRef',
      class: css('ms-LayerHost', attrs.class!),
      id: hostId,
    }, slots)
  },
})
