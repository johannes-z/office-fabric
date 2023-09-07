<script setup lang="ts">
import { mergeStyles } from '@fluentui/merge-styles'
import { type IStackTokens, Separator, Stack, StackItem } from '@fluentui-vue/components'

const stackTokens: IStackTokens = { childrenGap: 12 }

const verticalStyle = mergeStyles({
  height: '200px',
})
</script>

<template>
  <Stack :tokens="stackTokens">
    <Separator>
      Today
    </Separator>
    <Separator align-content="start">
      Today
    </Separator>
    <Separator align-content="end">
      Today
    </Separator>
    <Separator />
  </Stack>

  <Stack :tokens="stackTokens" horizontal horizontal-align="space-evenly">
    <StackItem :class-name="verticalStyle">
      <Separator vertical>
        Today
      </Separator>
    </StackItem>

    <StackItem :class-name="verticalStyle">
      <Separator vertical align-content="start">
        Today
      </Separator>
    </StackItem>

    <StackItem :class-name="verticalStyle">
      <Separator vertical align-content="end">
        Today
      </Separator>
    </StackItem>

    <StackItem :class-name="verticalStyle">
      <Separator vertical />
    </StackItem>
  </Stack>
</template>
