import { Vue, Component, Prop } from 'vue-property-decorator'
import { notifyHostChanged } from './Layer.notification'
import { ILayerHostProps, ILayerHostStyles } from './LayerHost.types'
import BaseComponent from '../BaseComponent'
import { CreateElement } from 'vue'

@Component({
  components: {},
})
export class LayerHost extends BaseComponent<ILayerHostProps, ILayerHostStyles> {
  @Prop({ type: String, default: null }) hostId!: string

  render (h: CreateElement) {
    return h('div', {
      class: 'LayerHost',
      attrs: {
        id: this.hostId,
      },
    })
  }

  mounted () {
    notifyHostChanged(this.hostId!)
  }

  beforeDestroy () {
    notifyHostChanged(this.hostId!)
  }
}
