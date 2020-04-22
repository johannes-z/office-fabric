import { Vue, Component, Prop } from 'vue-property-decorator'
import { notifyHostChanged } from './Layer.notification'
import { ILayerHostProps, ILayerHostStyles } from './LayerHost.types'
import BaseComponent from '../BaseComponent'

@Component({
  components: {},
})
export class LayerHost extends BaseComponent<ILayerHostProps, ILayerHostStyles> {
  @Prop({ type: String, default: null }) hostId!: string

  render () {
    return (
      <div id={this.hostId} class="LayerHost" />
    )
  }

  mounted () {
    notifyHostChanged(this.hostId!)
  }

  beforeDestroy () {
    notifyHostChanged(this.hostId!)
  }
}
