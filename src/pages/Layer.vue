<template>
  <div>
    <h1>Layer</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <h2>Basic layered content</h2>

      <Toggle v-model="showLayer"
              inline-label
              label="Wrap the content box below in a Layer" />

      <!-- <div v-if="!showLayer"
           :class="$style.content">
        <div :class="$style.textContent">Hello World.</div>
        <div>{{ dateString }}</div>
      </div>

      <div v-else>
        <Layer>
          <div :class="$style.content">
            <div :class="$style.textContent">Hello World.</div>
            <div>{{ dateString }}</div>
          </div>
        </Layer>
      </div> -->

      <h2>Using LayerHost to control projection</h2>
      <Toggle v-model="showHost"
              inline-label
              label="Show host" />
      <LayerHost v-if="showHost"
                 :id="layerHostId"
                 :class="$style.layerHost" />

      <Toggle v-model="renderInLayer"
              inline-label
              :label="`Render the box below in a Layer and target it at hostId='${layerHostId}'`" />

      <div v-if="!renderInLayer" :class="$style.content">
        This is example layer content.
      </div>
      <div v-else>
        <Layer :host-id="layerHostId">
          <div :class="$style.content">This is example layer content.</div>
        </Layer>
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Layer from '../components/Layer/Layer.vue'
import LayerHost from '../components/Layer/LayerHost.vue'
import Toggle from '../components/Toggle/Toggle.vue'

@Component({
  components: {
    Toggle,
    Layer,
    LayerHost,
  },
})
export default class LayerPage extends Vue {
  showLayer: boolean = false
  showHost: boolean = true
  renderInLayer: boolean = false
  layerHostId: string = 'layerhost1'

  timer = -1
  date = new Date()

  created () {
    this.timer = setInterval(() => (this.date = new Date()), 1000)
  }
  beforeDestroy () {
    clearInterval(this.timer)
  }
  get dateString () {
    return this.date.toLocaleString()
  }
}
</script>

<style lang="scss" module>
.content {
  background-color: #0078d4;
  color: #fff;
  line-height: 50px;
  padding: 0 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.textContent {
  flex-grow: 1;
}
.layerHost {
  height: 100px;
  padding: 20px;
  background: #f003;
  border: 1px dashed #000;
  position: relative;
  box-sizing: border-box;

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    content: 'I am a LayerHost with id=layerhost1';
  }
}
</style>
