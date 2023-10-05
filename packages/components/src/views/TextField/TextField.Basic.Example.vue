<script setup lang="ts">
import { TextField } from '@fluentui-vue/components'
</script>

<template>
  <TextField label="Standard" />
  <TextField label="Disabled" disabled value="I am disabled" />
  <TextField label="Read-only" readonly value="I am read-only" />
  <TextField label="Required " required />
  <TextField aria-label="Required without visible label" required />
  <TextField label="With error message" error-message="Error message" />
</template>
