<template>
  <div :class="$style.content">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification'

const DATA_PORTAL_ATTRIBUTE = 'data-portal-element'
function setPortalAttribute (element: any): void {
  element.setAttribute(DATA_PORTAL_ATTRIBUTE, 'true')
}

function setVirtualParent (child: any, parent: any): void {
  let virtualChild = child as any
  let virtualParent = parent as any
  if (!virtualChild._virtual) {
    virtualChild._virtual = {
      children: [],
    }
  }
  let oldParent = virtualChild._virtual.parent
  if (oldParent && oldParent !== parent) {
    // Remove the child from its old parent.
    let index = oldParent._virtual.children.indexOf(virtualChild)
    if (index > -1) {
      oldParent._virtual.children.splice(index, 1)
    }
  }
  virtualChild._virtual.parent = virtualParent || undefined
  if (virtualParent) {
    if (!virtualParent._virtual) {
      virtualParent._virtual = {
        children: [],
      }
    }
    virtualParent._virtual.children.push(virtualChild)
  }
}

@Component({
  components: {},
})
export default class Layer extends Vue {
  @Prop({ default: null }) hostId!: string
  @Prop({ default: false }) insertFirst!: boolean

  private node: any = {}
  private layerElement: any = {}
  private internalHostId = this.hostId

  mounted () {
    const { hostId } = this

    this.createLayerElement()

    if (hostId) {
      registerLayer(hostId, this.createLayerElement)
    }
    if (this.layerElement.appendChild) {
      this.layerElement.appendChild(this.$el)
    }
  }

  updated () {
    if (this.hostId !== this.internalHostId) {
      this.createLayerElement()
    }
  }

  beforeDestroy () {
    const { hostId } = this

    this.removeLayerElement()
    if (hostId) {
      unregisterLayer(hostId, this.createLayerElement)
    }
  }

  private createLayerElement () {
    const { hostId } = this

    const doc = this.$el.ownerDocument
    const host = this.getHost()

    if (!doc || !host) {
      return
    }

    // If one was already existing, remove.
    this.removeLayerElement()

    const layerElement = doc.createElement('div')
    layerElement.className = [
      'ms-Layer',
      // @ts-ignore
      this.$style.root,
      // @ts-ignore
      !this.hostId && this.$style.isNotHost,
    ].join(' ')

    setPortalAttribute(layerElement)
    setVirtualParent(layerElement, this.$el)

    this.insertFirst
      ? host.insertBefore(layerElement, host.firstChild)
      : host.appendChild(layerElement)

    this.layerElement = layerElement
    this.internalHostId = hostId
  };

  private removeLayerElement (): void {
    const { layerElement } = this

    if (layerElement && layerElement.parentNode) {
      const parentNode = layerElement.parentNode
      if (parentNode) {
        parentNode.removeChild(layerElement)
      }
    }
  }

  private getHost (): Node | undefined {
    const { hostId } = this
    const doc = this.$el.ownerDocument
    if (!doc) {
      return undefined
    }

    if (hostId) {
      return doc.getElementById(hostId) as Node
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
