<script setup lang="ts">
import { useId } from '@fluentui-vue/vue-hooks'
import { ref } from 'vue'
import type { IStackTokens } from '../components'
import { Separator } from '../components'
import DocumentCard from './components/DocumentCard.vue'
import { TextField } from '@/components/TextField'

const stackTokens: IStackTokens = { childrenGap: 12 }
</script>

<template>
  <h1>Separator</h1>
  <DocumentCard>
    <Separator>Today</Separator>
    <Separator align-content="start">
      Today
    </Separator>
    <Separator align-content="end">
      Today
    </Separator>
    <Separator />

    <Separator vertical>
      Today
    </Separator>
    <Separator vertical align-content="start">
      Today
    </Separator>
    <Separator vertical align-content="end">
      Today
    </Separator>
    <Separator vertical />
  </DocumentCard>
</template>
