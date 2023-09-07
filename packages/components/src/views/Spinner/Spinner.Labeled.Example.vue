<script setup lang="ts">
import type { IStackTokens } from '@fluentui-vue/components'
import { Label, Spinner, Stack } from '@fluentui-vue/components'

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 250,
}
</script>

<template>
  <Stack :tokens="stackTokens">
    <div>
      <Label>Spinner with label positioned below</Label>
      <Spinner label="I am definitely loading..." />
    </div>

    <div>
      <Label>Spinner with label positioned above</Label>
      <Spinner label="Seriously, still loading..." aria-live="assertive" label-position="top" />
    </div>

    <div>
      <Label>Spinner with label positioned to right</Label>
      <Spinner label="Wait, wait..." aria-live="assertive" label-position="right" />
    </div>

    <div>
      <Label>Spinner with label positioned to left</Label>
      <Spinner label="Nope, still loading..." aria-live="assertive" label-position="left" />
    </div>
  </Stack>
</template>
