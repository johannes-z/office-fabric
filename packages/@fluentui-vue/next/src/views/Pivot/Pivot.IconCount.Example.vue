<script setup lang="ts">
import { type IStyleSet } from '@fluentui/merge-styles'
import type { ILabelStyles } from '@fluentui-vue/components'
import { Label, Pivot, PivotItem } from '@fluentui-vue/components'

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
}
</script>

<template>
  <Pivot aria-label="Count and Icon Pivot Example">
    <PivotItem header-text="My Files" :item-count="42" item-icon="Emoji2">
      <Label :styles="labelStyles">Pivot #1</Label>
    </PivotItem>
    <PivotItem :item-count="23" item-icon="Recent">
      <Label :styles="labelStyles">Pivot #2</Label>
    </PivotItem>
    <PivotItem header-text="Placeholder" item-icon="Globe">
      <Label :styles="labelStyles">Pivot #3</Label>
    </PivotItem>
    <PivotItem header-text="Shared with me" item-icon="Ringer" :item-count="1">
      <Label :styles="labelStyles">Pivot #4</Label>
    </PivotItem>
    <PivotItem header-text="Customized Rendering" item-icon="Globe" :item-count="10" on-render-item-link="{_customRenderer}">
      <Label :styles="labelStyles">Customized Rendering</Label>
    </PivotItem>
  </Pivot>
</template>
