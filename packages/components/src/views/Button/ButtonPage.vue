<script setup lang="ts">
import { h, ref } from 'vue'
import DocPage from '../components/DocPage.vue'
import MetaToggle from './Meta.Toggle.vue'
import ButtonDefaultExample from './Button.Default.Example.vue'
import ButtonDefaultExampleCode from './Button.Default.Example.vue?raw'
import ButtonCompoundExample from './Button.Compound.Example.vue'
import ButtonCompoundExampleCode from './Button.Compound.Example.vue?raw'
import ButtonCommandBarExample from './Button.CommandBar.Example.vue'
import ButtonCommandBarExampleCode from './Button.CommandBar.Example.vue?raw'
import ButtonIconExample from './Button.Icon.Example.vue'
import ButtonIconExampleCode from './Button.Icon.Example.vue?raw'
import ButtonActionExample from './Button.Action.Example.vue'
import ButtonActionExampleCode from './Button.Action.Example.vue?raw'

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
    {
      view: () => h(MetaToggle, {
        checked: checked.value,
        disabled: disabled.value,
        onChecked: (value) => { checked.value = value },
        onDisabled: (value) => { disabled.value = value },
      }),
    },
    {
      title: 'Default Button',
      code: ButtonDefaultExampleCode,
      view: wrapComponent(ButtonDefaultExample),
    },
    {
      title: 'Compound Button',
      code: ButtonCompoundExampleCode,
      view: wrapComponent(ButtonCompoundExample),
    },
    {
      title: 'CommandBar Button',
      code: ButtonCommandBarExampleCode,
      view: wrapComponent(ButtonCommandBarExample),
    },
    {
      title: 'Icon Button',
      code: ButtonIconExampleCode,
      view: wrapComponent(ButtonIconExample),
    },
    {
      title: 'Action Button',
      code: ButtonActionExampleCode,
      view: wrapComponent(ButtonActionExample),
    },
  ],
  overview: import('./docs/ButtonOverview.md'),
  bestPractices: import('./docs/ButtonBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="ButtonPageProps" />
</template>
