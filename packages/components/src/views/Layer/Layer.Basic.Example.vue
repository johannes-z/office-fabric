<script setup lang="ts">
import { ref } from 'vue'
import { AnimationClassNames, Layer, Toggle, getTheme, mergeStyles } from '@fluentui-vue/components'

const showLayer = ref(false)

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
  <Toggle
    v-model="showLayer"
    label="Wrap the content box below in a Layer"
    inline-label
  />

  <Layer v-if="showLayer">
    <div :class="contentClass">
      Hello world
    </div>
  </Layer>
  <div v-else :class="contentClass">
    Hello world
  </div>
</template>
