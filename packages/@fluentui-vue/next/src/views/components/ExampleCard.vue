<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
})
</script>

<template>
  <div class="ExampleCard">
    <h3 class="ExampleCard-title">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<style lang="scss">
.ExampleCard ~ .ExampleCard {
  margin-top: 2rem;
}
.ExampleCard-title {
  border-bottom: 1px solid var(--fluentui-neutralSecondary);
}
</style>
