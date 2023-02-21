<script setup lang="ts">
import { ref } from 'vue'
import { Spinner } from '../components'
</script>

<template>
  <h2>Spinner</h2>

  <Spinner size="12">
    Extra small spinner
  </Spinner>
  <Spinner size="16">
    Small spinner
  </Spinner>
  <Spinner size="20">
    Medium spinner
  </Spinner>
  <Spinner size="28">
    Large spinner
  </Spinner>

  <Spinner label="Example title" />
  <Spinner label="Example title" label-position="top" />
  <Spinner label="Example title" label-position="right" />
  <Spinner label="Example title" label-position="left" />
</template>
