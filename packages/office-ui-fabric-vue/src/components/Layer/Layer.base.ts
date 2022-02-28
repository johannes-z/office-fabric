import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { MountingPortal } from 'portal-vue'
import Vue, { VNode } from 'vue'
import { getDefaultTarget, registerLayer, unregisterLayer } from './Layer.notification'
import { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types'

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>()

export const LayerBase = Vue.extend({
  name: 'LayerBase',

  props: {
    ...withThemeableProps(),

    hostId: { type: String, default: null },
  } as MappedType<ILayerProps>,

  data () {
    return {
      marker: null,
      hasTarget: false,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ILayerStyles> {
      const { className, theme, styles } = this
      return getClassNames(styles, {
        theme: theme!,
        className,
        isNotHost: !this.hostId,
      })
    },
  },

  mounted () {
    this.createElement()

    if (this.hostId) {
      registerLayer(this.hostId, this.createElement)
    }
  },

  beforeDestroy () {
    if (this.hostId) {
      unregisterLayer(this.hostId, this.createElement)
    }
  },

  methods: {
    createElement (): void {
      const doc = this.$el.ownerDocument
      const host = this.getHost()

      if (!doc || !host) {
        this.hasTarget = false
        return
      }

      this.hasTarget = true
    },
    getHost (): Node | undefined {
      const doc = this.$el.ownerDocument
      if (!doc) {
        return undefined
      }

      if (this.hostId) {
        return doc.getElementById(this.hostId) as Node
      } else {
        const defaultHostSelector = getDefaultTarget()
        return defaultHostSelector
          ? (doc.querySelector(defaultHostSelector) as Node)
          : doc.body
      }
    },
  },

  render (h): VNode {
    // @ts-ignore
    if (!this.hasTarget) return

    const { classNames, hostId } = this

    return h(MountingPortal, {
      props: {
        mountTo: hostId ? `#${hostId}` : 'body',
        append: true,
      },
    }, [
      h('div', { class: classNames.root }, [
        h('div', { class: classNames.content }, [
          this.$scopedSlots.default?.({}),
        ]),
      ]),
    ])
  },
})
