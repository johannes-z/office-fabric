import { Vue, Component, Prop } from 'vue-property-decorator'
import { notifyHostChanged } from './Layer.notification'
import { ILayerHostProps, ILayerHostStyles } from './LayerHost.types'
import BaseComponent from '../BaseComponent'

@Component({
  components: {},
})
export class LayerHost extends BaseComponent<ILayerHostProps, ILayerHostStyles> {
  @Prop({ type: String, default: null }) layerId!: string

  render () {
    return (
      <div id={this.layerId} class="LayerHost" />
    )
  }

  mounted () {
    notifyHostChanged(this.layerId!)
  }

  beforeDestroy () {
    notifyHostChanged(this.layerId!)
  }
}
