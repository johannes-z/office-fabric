<script setup lang="ts">
import { DefaultPalette } from '@fluentui-vue/theme'
import { useId } from '@fluentui-vue/vue-hooks'
import { Stack, StackItem } from '../components'
import DocumentCard from './components/DocumentCard.vue'
import type { IStackStyles, IStackTokens } from '@/components/Stack'

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
}
const stackItemStyles: IStackItemStyles = {
  root: {
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    padding: 5,
  },
}

// Tokens definition
const containerStackTokens: IStackTokens = { childrenGap: 5 }
const verticalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
}
const itemAlignmentsStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10,
}
const clickableStackTokens: IStackTokens = {
  padding: 10,
}
</script>

<template>
  <h1>Stack</h1>
  <DocumentCard>
    <h2>Basic Vertical Stack </h2>

    <Stack enable-scoped-selectors :tokens="containerStackTokens">
      <span>Default vertical stack</span>
      <Stack enable-scoped-selectors :styles="stackStyles">
        <span>Item One:</span>
        <span>Item Two</span>
        <span>Item Three</span>
      </Stack>

      <span>Ordered stack</span>
      <Stack enable-scoped-selectors :styles="stackStyles">
        <StackItem :order="2">
          <span>Item One</span>
        </StackItem>
        <StackItem :order="3">
          <span>Item Two</span>
        </StackItem>
        <StackItem :order="1">
          <span>Item Three</span>
        </StackItem>
      </Stack>

      <span>Vertical gap between items</span>
      <Stack enable-scoped-selectors :styles="stackStyles" :tokens="verticalGapStackTokens">
        <span>Item One</span>
        <span>Item Two</span>
        <span>Item Three</span>
      </Stack>

      <span>Item alignments</span>
      <Stack enable-scoped-selectors :styles="stackStyles" :tokens="itemAlignmentsStackTokens">
        <StackItem align="auto" :styles="stackItemStyles">
          <span>Auto-aligned item</span>
        </StackItem>
        <StackItem align="stretch" :styles="stackItemStyles">
          <span>Stretch-aligned item</span>
        </StackItem>
        <StackItem align="baseline" :styles="stackItemStyles">
          <span>Baseline-aligned item</span>
        </StackItem>
        <StackItem align="start" :styles="stackItemStyles">
          <span>Start-aligned item</span>
        </StackItem>
        <StackItem align="center" :styles="stackItemStyles">
          <span>Center-aligned item</span>
        </StackItem>
        <StackItem align="end" :styles="stackItemStyles">
          <span>End-aligned item</span>
        </StackItem>
      </Stack>

      <span>Clickable vertical stack</span>
      <Stack enable-scoped-selectors :styles="stackStyles" :tokens="clickableStackTokens">
        <span>Click inside this box</span>
      </Stack>
    </Stack>

    <h2>Reversed Basic Vertical Stack</h2>
  </DocumentCard>
</template>
