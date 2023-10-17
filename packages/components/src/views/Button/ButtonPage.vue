<script setup lang="ts">
import { computed, defineAsyncComponent, h, ref } from 'vue'
import DocPage from '../components/DocPage.vue'
import MetaToggle from './Meta.Toggle.vue'

import type { IExamplePage } from '@/views/docs.types'

const checked = ref(false)
const disabled = ref(false)

function wrapComponent(factory) {
  const component = defineAsyncComponent(factory)
  return ({
    render: () => h(component, {
      checked: checked.value,
      disabled: disabled.value,
    }),
  })
}

const ButtonPageProps: IExamplePage = {
  title: 'Button',
  componentName: 'Button',
  componentUrl: '',
  examples: [
    {
      view: {
        render: () => h(MetaToggle, {
          checked: checked.value,
          disabled: disabled.value,
          onChecked: (value) => { checked.value = value },
          onDisabled: (value) => { disabled.value = value },
        }),
      },
    },
    {
      title: 'Default Button',
      code: () => import('./Button.Default.Example.vue?raw'),
      view: wrapComponent(() => import('./Button.Default.Example.vue')),
    },
    {
      title: 'Compound Button',
      code: () => import('./Button.Compound.Example.vue?raw'),
      view: wrapComponent(() => import('./Button.Compound.Example.vue')),
    },
    {
      title: 'CommandBar Button',
      code: () => import('./Button.CommandBar.Example.vue?raw'),
      view: wrapComponent(() => import('./Button.CommandBar.Example.vue')),
    },
    {
      title: 'Icon Button',
      code: () => import('./Button.Icon.Example.vue?raw'),
      view: wrapComponent(() => import('./Button.Icon.Example.vue')),
    },
    {
      title: 'Action Button',
      code: () => import('./Button.Action.Example.vue?raw'),
      view: wrapComponent(() => import('./Button.Action.Example.vue')),
    },
  ],
  overview: () => import('./docs/ButtonOverview.md'),
  bestPractices: () => import('./docs/ButtonBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="ButtonPageProps" />
</template>
