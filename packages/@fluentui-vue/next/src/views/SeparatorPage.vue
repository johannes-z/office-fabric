<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ITheme } from '@fluentui-vue/theme'
import { createTheme } from '@fluentui-vue/theme'
import { mergeStyles } from '@fluentui/merge-styles'
import type { IIconStyles, IStackTokens } from '../components'
import { Icon, Separator, Stack, StackItem, Text } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'

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

const myRef = ref(null)
watch(myRef, () => {
  console.log(myRef.value)
})
</script>

<template>
  <h1>Separator</h1>

  <DocSection title="Usage">
    <ExampleCard title="Basic Separator with Text">
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
          <Separator ref="myRef" vertical align-content="start">
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
    </ExampleCard>

    <ExampleCard title="Basic Themed Separator with Text">
      <Stack :tokens="stackTokens">
        <Text>Horizontal center aligned with custom theme</Text>
        <Separator :theme="theme">
          Today
        </Separator>
      </Stack>
    </ExampleCard>

    <ExampleCard title="Separator with Icon">
      <Stack :tokens="stackTokens">
        <Text>Horizontal center aligned with an icon as content</Text>
        <Separator>
          <Icon icon-name="Clock" :styles="iconStyles" />
        </Separator>
      </Stack>
    </ExampleCard>
  </DocSection>
</template>
