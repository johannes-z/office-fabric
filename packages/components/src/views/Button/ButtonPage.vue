<script setup lang="ts">
import { h, ref } from 'vue'
import DocPage from '../components/DocPage.vue'
import MetaToggle from './Meta.Toggle.vue'


const checked = ref(false)
const disabled = ref(false)

function wrapComponent(component) {
  return () => h(component, {
    checked: checked.value,
    disabled: disabled.value,
  })
}

const ButtonPageProps = {
  title: 'Button',
  componentName: 'Button',
  componentUrl: '',
  examples: [
    /*{
      view: () => h(MetaToggle, {
        checked: checked.value,
        disabled: disabled.value,
        onChecked: (value) => { checked.value = value },
        onDisabled: (value) => { disabled.value = value },
      }),
    },*/
    {
      title: 'Default Button',
      view: () => import('./Button.Default.Example.vue'),
      code: () => import('./Button.Default.Example.vue?raw'),
    },
    {
      title: 'Compound Button',
      view: () => import('./Button.Compound.Example.vue'),
      code: () => import('./Button.Compound.Example.vue?raw'),
    },
    {
      title: 'CommandBar Button',
      view: () => import('./Button.CommandBar.Example.vue'),
      code: () => import('./Button.CommandBar.Example.vue?raw'),
    },
    {
      title: 'Icon Button',
      view: () => import('./Button.Icon.Example.vue'),
      code: () => import('./Button.Icon.Example.vue?raw'),
    },
    {
      title: 'Action Button',
      view: () => import('./Button.Action.Example.vue'),
      code: () => import('./Button.Action.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/ButtonOverview.md'),
  bestPractices: () => import('./docs/ButtonBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="ButtonPageProps" />
</template>
