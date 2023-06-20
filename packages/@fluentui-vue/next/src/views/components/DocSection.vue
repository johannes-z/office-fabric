<script setup lang="ts">
import { DefaultEffects } from '@fluentui-vue/style-utilities'

defineProps({
  title: { type: String, default: '' },
})

const elevation = DefaultEffects.elevation4
</script>

<template>
  <div class="DocSection" :style="{ boxShadow: elevation }">
    <h2 v-if="title">
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

<style>
.DocSection {
  padding: 28px;
  margin: 4px;
  margin-bottom: 28px;
  background: var(--fluentui-white);
}
</style>
