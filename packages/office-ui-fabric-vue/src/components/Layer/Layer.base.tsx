import { Vue, Component, Prop } from 'vue-property-decorator'
import { MountingPortal } from 'portal-vue'
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification'
import { ILayerProps, ILayerStyles, ILayerStyleProps } from './Layer.types'
import BaseComponent from '../BaseComponent'
import { getStyles } from './Layer.styles'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>()

@Component
export class LayerBase extends BaseComponent {
  @Prop({ type: String, default: null }) hostId!: string
  @Prop({ type: Boolean, default: true }) append!: boolean

  marker!: HTMLDivElement
  hasTarget: boolean = false

  get classNames () {
    const { className, theme } = this
    return getClassNames(getStyles as any, {
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

  render () {
    if (!this.hasTarget) return

    const { classNames, hostId, append } = this
    return (
      <MountingPortal mount-to={hostId ? `#${hostId}` : 'body'} append={append}>
        <div class={classNames.root}>
          <div class={classNames.content}>
            {this.$slots.default}
          </div>
        </div>
      </MountingPortal>
    )
  }
}
