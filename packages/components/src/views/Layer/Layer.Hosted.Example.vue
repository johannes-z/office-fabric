<script setup lang="ts">
import { ref } from 'vue'
import { AnimationClassNames, Layer, LayerHost, Toggle, getTheme, mergeStyleSets, mergeStyles } from '@fluentui-vue/components'
import { type IToggleStyles } from '@fluentui-vue/components'
import { useId } from '@fluentui-vue/hooks'

const showLayer = ref(false)
const showLayerNoId = ref(false)
const showHost = ref(true)

const layerHostId = useId('layerHost')

const logDidMount = () => console.log('layer did mount')
const logWillUnmount = () => console.log('layer will unmount')

const toggleStyles: Partial<IToggleStyles> = {
  root: { margin: '10px 0' },
}
const theme = getTheme()
const styles = {
  toggle: toggleStyles,
  ...mergeStyleSets({
    root: {
      selectors: { p: { marginTop: 30 } },
    },
    customHost: {
      height: 100,
      padding: 20,
      background: 'rgba(255, 0, 0, 0.2)',
      boxSizing: 'border-box',
      border: `1px dashed ${theme.palette.black}`,
      position: 'relative',
      selectors: {
        '&:before': {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
      },
    },
    content: [
      {
        backgroundColor: theme.palette.themePrimary,
        color: theme.palette.white,
        lineHeight: '50px',
        padding: '0 20px',
      },
      AnimationClassNames.scaleUpIn100,
    ],
    nonLayered: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      lineHeight: '50px',
      padding: '0 20px',
      margin: '8px 0',
    },
  }),
}
</script>

<template>
  <div :class="styles.root">
    <Toggle v-model="showHost" label="Show host" inline-label />

    <LayerHost v-if="showHost" :id="layerHostId" :class="styles.customHost">
      I am a LayerHost with id={{ layerHostId }}
    </LayerHost>

    <p>
      In some cases, you may need to contain layered content within an area. Create an instance of a LayerHost along
      with an id, and provide a hostId on the layer to render it within the specific host. (Note that it's important
      that you don't include children within the LayerHost. It's meant to contain Layered content only.)
    </p>

    <Toggle
      v-model="showLayer"
      :styles="styles.toggle"
      :label="`Render the box below in a Layer and target it at hostId=${layerHostId}`"
      inline-label
    />

    <Layer v-if="showLayer" :host-id="layerHostId" @layerDidMount="logDidMount" @layerWillUnmount="logWillUnmount">
      <div :class="styles.content">
        This is example layer content.
      </div>
    </Layer>
    <div v-else :class="styles.content">
      This is example layer content.
    </div>

    <div :class="styles.nonLayered">
      I am normally below the content.
    </div>

    <p>If you do not specify a hostId, the hosted layer will default to being fixed to the page by default.</p>

    <Toggle
      v-model="showLayerNoId"
      :styles="styles.toggle"
      label="Render the box below in a Layer without specifying a host, fixing it to the top of the page"
      inline-label
    />

    <Layer v-if="showLayerNoId" @layerDidMount="logDidMount" @layerWillUnmount="logWillUnmount">
      <div :class="styles.content">
        This is example layer content.
      </div>
    </Layer>
    <div v-else :class="styles.content">
      This is example layer content.
    </div>
  </div>
</template>
