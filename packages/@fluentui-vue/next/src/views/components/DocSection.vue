<script setup lang="ts">
import { DefaultEffects } from '@fluentui-vue/style-utilities'

defineProps({
  title: { type: String, default: '' },
})

const elevation = DefaultEffects.elevation4
</script>

<template>
  <div :style="{ boxShadow: elevation, padding: '28px', margin: '4px', background: 'var(--fluentui-white)' }">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>
