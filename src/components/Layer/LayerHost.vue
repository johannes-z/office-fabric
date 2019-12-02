<template>
  <div :id="id" class="LayerHost" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { notifyHostChanged } from './Layer.notification'
import { ILayerHostProps, ILayerHostStyles } from './LayerHost.types'
import BaseComponent from '../BaseComponent'

@Component({
  components: {},
})
export default class LayerHost extends BaseComponent<ILayerHostProps, ILayerHostStyles> {
  @Prop({ default: null }) id!: string

  mounted () {
    notifyHostChanged(this.id!)
  }

  beforeDestroy () {
    notifyHostChanged(this.id!)
  }
}
</script>
