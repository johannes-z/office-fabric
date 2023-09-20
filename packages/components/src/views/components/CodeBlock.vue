<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { type Highlighter, getHighlighter, setWasm } from 'shiki'

const props = defineProps({
  code: { type: [String, Function], required: true },
  language: { type: String, default: 'vue' },
})

declare global {
  interface Window {
    __shiki_cache__?: Highlighter
  }
}

const highlightedCode = computedAsync(async () => {
  if (!window.__shiki_cache__) {
    const wasmResponse = await fetch('/onig.wasm')
    setWasm(wasmResponse)
    const highlighter = await getHighlighter({
      theme: 'light-plus',
      langs: ['vue'],
    })
    window.__shiki_cache__ = highlighter
  }

  const highlighter = window.__shiki_cache__

  const code = typeof props.code === 'function' ? (await props.code()).default : props.code

  return highlighter.codeToHtml(code, {
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
