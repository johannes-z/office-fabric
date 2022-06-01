import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { css } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { notifyHostChanged, registerLayerHost, unregisterLayerHost } from './Layer.notification'
import { ILayerHost, ILayerHostProps } from './LayerHost.types'

export const LayerHost = Vue.extend({
  name: 'LayerHost',

  props: {
    ...withThemeableProps(),

    hostId: { type: String, default: null },
  } as MappedType<ILayerHostProps>,

  mounted (): void {
    registerLayerHost(this.hostId!, this as ILayerHost)
    notifyHostChanged(this.hostId!)
  },

  beforeDestroy (): void {
    unregisterLayerHost(this.hostId!, this as ILayerHost)
    notifyHostChanged(this.hostId!)
  },

  methods: {
    notifyLayersChanged () {
      // Nothing, since the default implementation of Layer Host does not need to react to layer changes.
    },
  },

  render (h): VNode {
    return h('div', {
      ref: 'layerHostRef',
      class: css('LayerHost', this.className),
      attrs: {
        id: this.hostId,
      },
    })
  },
})
