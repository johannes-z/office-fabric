<template>
  <MountingPortal
    v-if="hasTarget"
    :mount-to="hostId ? `#${hostId}` : 'body'"
    :append="append">
    <div :class="classNames.root">
      <div :class="classNames.content">
        <slot />
      </div>
    </div>
  </MountingPortal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { MountingPortal } from 'portal-vue'
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification'
import { ILayerProps, ILayerStyles } from './Layer.types'
import BaseComponent from '../BaseComponent'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Layer.styles'

@Component({
  components: { MountingPortal },
})
export default class Layer extends BaseComponent<ILayerProps, ILayerStyles> {
  @Prop({ type: String, default: null }) hostId!: string
  @Prop({ type: Boolean, default: true }) append!: boolean

  marker!: HTMLDivElement
  hasTarget: boolean = false

  get classNames () {
    const { className, theme } = this
    return getClassNames(getStyles, {
      theme,
      className,
      isNotHost: !this.hostId,
    })
  }

  mounted () {
    this.createElement()

    if (this.hostId) {
      registerLayer(this.hostId, this.createElement)
    }
  }

  beforeDestroy () {
    const { hostId } = this

    if (this.hostId) {
      unregisterLayer(this.hostId, this.createElement)
    }
  }

  createElement () {
    const doc = this.$el.ownerDocument
    const host = this.getHost()

    if (!doc || !host) {
      this.hasTarget = false
      return
    }

    this.hasTarget = true
  }

  private getHost (): Node | undefined {
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
  }
}
</script>
