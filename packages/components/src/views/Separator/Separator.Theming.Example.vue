<script setup lang="ts">
import { mergeStyles } from '@fluentui/merge-styles'
import { type ITheme, createTheme } from '@fluentui-vue/style-utilities'
import { type IStackTokens, Icon, Separator, Stack, Text } from '@fluentui-vue/components'

const stackTokens: IStackTokens = { childrenGap: 12 }

const theme: ITheme = createTheme({
  fonts: {
    medium: {
      fontFamily: 'Monaco, Menlo, Consolas',
      fontSize: '30px',
    },
  },
})
</script>

<template>
  <Stack :tokens="stackTokens">
    <Text>Horizontal center aligned with custom theme</Text>
    <Separator :theme="theme">
      Today
    </Separator>
  </Stack>
</template>
