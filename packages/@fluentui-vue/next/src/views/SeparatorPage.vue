<script setup lang="ts">
import type { ITheme } from '@fluentui-vue/theme'
import { createTheme } from '@fluentui-vue/theme'
import { mergeStyles } from '@fluentui/merge-styles'
import type { IIconStyles, IStackTokens } from '../components'
import { Icon, Separator, Stack, StackItem, Text } from '../components'
import DocumentCard from './components/DocumentCard.vue'

const stackTokens: IStackTokens = { childrenGap: 12 }

const verticalStyle = mergeStyles({
  height: '200px',
})

const iconStyles: IIconStyles = {
  root: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  },
}

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
  <h1>Separator</h1>

  <DocumentCard>
    <h2>Usage</h2>

    <h3>Basic Separator with Text</h3>
    <Stack :tokens="stackTokens">
      <Separator>Today</Separator>
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

    <h3>Basic Themed Separator with Text</h3>
    <Stack :tokens="stackTokens">
      <Text>Horizontal center aligned with custom theme</Text>
      <Separator :theme="theme">
        Today
      </Separator>
    </Stack>

    <h3>Separator with Icon</h3>
    <Stack :tokens="stackTokens">
      <Text>Horizontal center aligned with an icon as content</Text>
      <Separator>
        <Icon icon-name="Clock" :styles="iconStyles" />
      </Separator>
    </Stack>
  </DocumentCard>
</template>
