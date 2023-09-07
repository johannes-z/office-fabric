<script setup lang="ts">
import { type IStyleSet } from '@fluentui/merge-styles'
import type { ILabelStyles } from '@fluentui-vue/components'
import { Label, Pivot, PivotItem } from '@fluentui-vue/components'

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
}
</script>

<template>
  <Pivot aria-label="Basic Pivot Example">
    <PivotItem
      header-text="My Files"
      :header-button-props="{
        'data-order': 1,
        'data-title': 'My Files Title',
      }"
    >
      <Label :styles="labelStyles">Pivot #1</Label>
    </PivotItem>
    <PivotItem header-text="Recent">
      <Label :styles="labelStyles">Pivot #2</Label>
    </PivotItem>
    <PivotItem header-text="Shared with me">
      <Label :styles="labelStyles">Pivot #3</Label>
    </PivotItem>
  </Pivot>
</template>
