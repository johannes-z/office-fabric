import type { VNode } from 'vue'
import { defineComponent } from 'vue'
import { notifyHostChanged, registerLayerHost, unregisterLayerHost } from './Layer.notification'

export const LayerHost = defineComponent({
  name: 'LayerHost',

  props: {
    styles: { type: Object as () => any, default: () => {} },

    hostId: { type: String, default: null },
  },

  mounted(): void {
    registerLayerHost(this.hostId!, this)
    notifyHostChanged(this.hostId!)
  },

  beforeUnmount(): void {
    unregisterLayerHost(this.hostId!, this)
    notifyHostChanged(this.hostId!)
  },

  methods: {
    notifyLayersChanged() {
      // Nothing, since the default implementation of Layer Host does not need to react to layer changes.
    },
  },

  render(h): VNode {
    return h('div', {
      ref: 'layerHostRef',
      class: 'LayerHost',
      attrs: {
        id: this.hostId,
      },
    })
  },
})
