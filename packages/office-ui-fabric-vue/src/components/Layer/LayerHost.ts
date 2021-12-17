import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { css } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { notifyHostChanged } from './Layer.notification'
import { ILayerHostProps } from './LayerHost.types'

export const LayerHost = Vue.extend({
  name: 'LayerHost',

  props: {
    ...withThemeableProps(),

    hostId: { type: String, default: null },
  } as MappedType<ILayerHostProps>,

  mounted (): void {
    notifyHostChanged(this.hostId!)
  },

  beforeDestroy (): void {
    notifyHostChanged(this.hostId!)
  },

  render (h): VNode {
    return h('div', {
      class: css('LayerHost', this.className),
      attrs: {
        id: this.hostId,
      },
    })
  },
})
