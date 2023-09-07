<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { getHighlighter, setWasm } from 'shiki'

const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, default: 'vue' },
})

const highlightPromise = fetch('/public/onig.wasm').then((wasm) => {
  setWasm(wasm)
  return getHighlighter({
    theme: 'light-plus',
    langs: ['vue'],
  })
})
const highlightedCode = computedAsync(async () => {
  const highlighter = await highlightPromise
  return highlighter.codeToHtml(props.code, {
    lang: props.language,
  })
}, '')
</script>

<template>
  <div class="code-block" v-html="highlightedCode" />
</template>

<style lang="scss">
.code-block {
  font-size: 14px;
  line-height: 20px;
  font-family: 'Consolas', 'Courier New', monospace;
  overflow: auto;

  pre span.line {
    counter-increment: line;

    &:before {
      content: counter(line);
      opacity: 0.3;
      display: inline-block;
      text-align: right;
      width: 2rem;
      margin-right: 1rem;
    }
  }
}
</style>
