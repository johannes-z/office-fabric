<script setup lang="ts">
import { ref } from 'vue'
import { Layer, Toggle } from '../components'
import { AnimationClassNames, getTheme, mergeStyles } from '..'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'

const showLayer = ref(false)
function toggleShowLayer(value) {
  showLayer.value = value
}

const theme = getTheme()
const contentClass = mergeStyles([
  {
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.white,
    lineHeight: '50px',
    padding: '0 20px',
  },
  AnimationClassNames.scaleUpIn100,
])
</script>

<template>
  <h1>Layer</h1>

  <DocSection title="Usage">
    <ExampleCard title="Layer">
      <Toggle
        label="Wrap the content box below in a Layer"
        inline-label
        :checked="showLayer"
        @change="toggleShowLayer"
      />

      <Layer v-if="showLayer">
        <div :class="contentClass">
          Hello world
        </div>
      </Layer>
      <div v-else :class="contentClass">
        Hello world
      </div>
    </ExampleCard>
  </DocSection>
</template>
