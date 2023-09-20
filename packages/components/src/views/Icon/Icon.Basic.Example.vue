<script setup lang="ts">
import { FontIcon, mergeStyles } from '@fluentui-vue/components'

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
})
</script>

<template>
  <div>
    <FontIcon aria-label="Compass" icon-name="CompassNW" :class="iconClass" />
    <FontIcon aria-label="Dictionary" icon-name="Dictionary" :class="iconClass" />
    <FontIcon aria-label="Train" icon-name="TrainSolid" :class="iconClass" />
  </div>
</template>
