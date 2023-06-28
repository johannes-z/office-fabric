<script setup lang="ts">
import type { IStackProps } from '@fluentui-vue/components'
import { Label, Spinner, Stack } from '@fluentui-vue/components'
import { SpinnerSize } from '@/components/Spinner/Spinner.types'

const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' }

const tokens = {
  sectionStack: {
    childrenGap: 10,
  },
  spinnerStack: {
    childrenGap: 20,
  },
}
</script>

<template>
  <Stack :tokens="tokens.sectionStack">
    <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
      <Label>Extra small spinner</Label>
      <Spinner :size="SpinnerSize.xSmall" />
    </Stack>

    <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
      <Label>Small spinner</Label>
      <Spinner :size="SpinnerSize.small" />
    </Stack>

    <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
      <Label>Medium spinner</Label>
      <Spinner :size="SpinnerSize.medium" />
    </Stack>

    <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
      <Label>Large spinner</Label>
      <Spinner :size="SpinnerSize.large" />
    </Stack>
  </Stack>
</template>
