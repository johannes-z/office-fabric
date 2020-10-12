<template>
  <BasePage>
    Icon

    <template #overview>
      <div v-html="docs.Overview" />
    </template>

    <template #dos>
      <div v-html="docs.Dos" />
    </template>

    <template #donts>
      <div v-html="docs.Donts" />
    </template>

    <template #usage>
      <h2>Default Spinner</h2>

      <Stack :tokens="tokens.sectionStack">
        <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
          <f-label>Extra small spinner</f-label>
          <f-spinner :size="12" />
        </Stack>

        <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
          <f-label>Small spinner</f-label>
          <f-spinner :size="16" />
        </Stack>

        <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
          <f-label>Medium spinner</f-label>
          <f-spinner :size="20" />
        </Stack>

        <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
          <f-label>Large spinner</f-label>
          <f-spinner :size="28" />
        </Stack>
      </Stack>

      <h2>Spinner label positioning</h2>
      <Stack :tokens="stackTokens">
        <div>
          <f-label>Spinner with label positioned below</f-label>
          <f-spinner>I am definitely loading...</f-spinner>
        </div>

        <div>
          <f-label>Spinner with label positioned above</f-label>
          <f-spinner label="Seriously, still loading..." label-position="top" />
        </div>

        <div>
          <f-label>Spinner with label positioned to right</f-label>
          <f-spinner label="Wait, wait..." label-position="right" />
        </div>

        <div>
          <f-label>Spinner with label positioned to left</f-label>
          <f-spinner label="Nope, still loading..." label-position="left" />
        </div>
      </Stack>
    </template>

    <template #implementation>
      WIP
    </template>
  </BasePage>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Stack, IStackProps, IStackTokens } from '@uifabric-vue/office-ui-fabric-vue'

import Dos from './docs/SpinnerDos.md'
import Donts from './docs/SpinnerDonts.md'
import Overview from './docs/SpinnerOverview.md'

@Component({
  components: {
    Stack,
  },
})
export default class SpinnerPage extends Vue {
  rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' };

  docs = {
    Dos,
    Donts,
    Overview,
  }

  tokens = {
    sectionStack: {
      childrenGap: 10,
    },
    spinnerStack: {
      childrenGap: 20,
    },
  };

  stackTokens: IStackTokens = {
    childrenGap: 20,
    maxWidth: 250,
  };
}
</script>

<style lang="scss" module>
</style>
