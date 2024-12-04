<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { type Highlighter, codeToHtml, createHighlighter } from 'shiki'


const props = defineProps({
  code: { type: [String, Function], required: true },
  language: { type: String, default: 'vue' },
})

const highlightedCode = computedAsync(async () => {
  const code = typeof props.code === 'function' ? (await props.code()).default : props.code

  return code
}, '')
</script>

<template>
  <pre class="code-block" v-text="highlightedCode" />
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
