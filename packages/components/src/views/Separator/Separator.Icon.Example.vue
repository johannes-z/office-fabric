<script setup lang="ts">
import { mergeStyles } from '@fluentui/merge-styles'
import { type IIconStyles, type IStackTokens, Icon, Separator, Stack, Text } from '@fluentui-vue/components'

const stackTokens: IStackTokens = { childrenGap: 12 }

const iconStyles: IIconStyles = {
  root: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  },
}
</script>

<template>
  <Stack :tokens="stackTokens">
    <Text>Horizontal center aligned with an icon as content</Text>
    <Separator>
      <Icon icon-name="Clock" :styles="iconStyles" />
    </Separator>
  </Stack>
</template>
