import type { VNode } from 'vue'
import { Teleport, defineComponent, h } from 'vue'

import { classNamesFunction } from '@fluentui-vue/utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import type { SlotProps } from '../../utils/types'
import { createDefaultLayerHost, getDefaultTarget, registerLayer, unregisterLayer } from './Layer.notification'
import type { ILayerStyleProps, ILayerStyles } from './Layer.types'
import { useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>()

export const LayerBase = defineComponent({
  name: 'LayerBase',

  props: {
    ...useStylingProps(),

    hostId: { type: String, default: null },
  },

  data() {
    return {
      marker: null,
      hasTarget: false,
    }
  },

  computed: {
    classNames(): IProcessedStyleSet<ILayerStyles> {
      const { className, theme, styles, hostId } = this
      return getClassNames(styles, {
        theme: theme!,
        className,
        isNotHost: !hostId,
      })
    },
    slotProps(): SlotProps<any> {
      return {
        root: {
          class: this.classNames.root,
        },
        content: {
          class: this.classNames.content,
        },
        portal: {
          to: this.hostId ? `#${this.hostId}` : getDefaultTarget(),
        },
      }
    },
  },

  mounted() {
    this.createElement()

    if (this.hostId)
      registerLayer(this.hostId, this.createElement)
  },

  beforeUnmount() {
    if (this.hostId)
      unregisterLayer(this.hostId, this.createElement)
  },

  methods: {
    createElement(): void {
      const doc = this.$el.ownerDocument
      const host = this.getHost()

      if (!doc || !host) {
        this.hasTarget = false
        return
      }

      this.hasTarget = true
    },

    getHost(): Node | null {
      const doc = this.$el.ownerDocument
      if (!doc)
        return null

      if (this.hostId) {
        return doc.getElementById(this.hostId) as Node
      }
      else {
        const defaultHostSelector = getDefaultTarget()
        // Find the host.
        let host: Node | null = defaultHostSelector ? (doc?.querySelector(defaultHostSelector) as Node) : null

        // If no host is available, create a container for injecting layers in.
        // Having a container scopes layout computation.
        if (!host && doc)
          host = createDefaultLayerHost(doc)

        return host
      }
    },
  },

  render(): VNode {
    if (!this.hasTarget)
      return

    const { hostId, slotProps } = this

    return h('span', { class: 'ms-layer' }, [
      h(Teleport, slotProps.portal, [
        h('div', slotProps.root, [
          h('div', slotProps.content, this.$slots.default?.({})),
        ]),
      ]),
    ])
  },
})
