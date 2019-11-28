<template>
  <MountingPortal v-if="hasTarget"
                  :mount-to="hostId ? `#${hostId}` : 'body'"
                  :append="append">
    <div v-bind="css.root">
      <div v-bind="css.content">
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

@Component({
  components: { MountingPortal },
})
export default class Layer extends BaseComponent<ILayerProps, ILayerStyles> {
  @Prop({ default: null }) hostId!: string
  @Prop({ default: true }) append!: boolean

  marker!: HTMLDivElement
  hasTarget: boolean = false

  get baseStyles (): ILayerStyles {
    const { $style, hostId } = this
    return {
      root: [
        'ms-Layer',
        $style.root,
        !hostId && $style.isNotHost,
      ],
      content: [
        'ms-Fabric',
        'ms-Layer-content',
        $style.content,
      ],
    }
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

<style lang="scss" module>
.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  position: relative;
}
.isNotHost {
  position: fixed;
  z-index: 1000000;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  visibility: hidden;
}
.content {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  color: rgb(50, 49, 48);
  visibility: visible;
}
</style>
