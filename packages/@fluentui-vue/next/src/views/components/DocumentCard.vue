<script setup>
import { DefaultEffects } from '@fluentui-vue/style-utilities'
const elevation = DefaultEffects.elevation4
</script>

<template>
  <div :style="{ boxShadow: elevation, padding: '28px', margin: '4px', background: 'var(--fluentui-white)' }">
    <slot />
  </div>
</template>
