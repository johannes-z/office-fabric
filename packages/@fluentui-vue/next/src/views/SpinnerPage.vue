<script setup lang="ts">
import type { IStackProps, IStackTokens } from '../components'
import { Label, Spinner, Stack } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'
import { SpinnerSize } from '@/components/Spinner/Spinner.types'

const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' }

const tokens = {
  sectionStack: {
    childrenGap: 10,
  },
  spinnerStack: {
    childrenGap: 20,
  },
}

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 250,
}
</script>

<template>
  <h1>Spinner</h1>

  <DocSection title="Usage">
    <ExampleCard title="Spinner sizes">
      <Stack :tokens="tokens.sectionStack">
        <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
          <Label>Extra small spinner</Label>
          <Spinner :size="SpinnerSize.xSmall" />
        </Stack>

        <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
          <Label>Small spinner</Label>
          <Spinner :size="SpinnerSize.small" />
        </Stack>

        <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
          <Label>Medium spinner</Label>
          <Spinner :size="SpinnerSize.medium" />
        </Stack>

        <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
          <Label>Large spinner</Label>
          <Spinner :size="SpinnerSize.large" />
        </Stack>
      </Stack>
    </ExampleCard>

    <ExampleCard title="Spinner label positioning">
      <Stack :tokens="stackTokens">
        <div>
          <Label>Spinner with label positioned below</Label>
          <Spinner label="I am definitely loading..." />
        </div>

        <div>
          <Label>Spinner with label positioned above</Label>
          <Spinner label="Seriously, still loading..." aria-live="assertive" label-position="top" />
        </div>

        <div>
          <Label>Spinner with label positioned to right</Label>
          <Spinner label="Wait, wait..." aria-live="assertive" label-position="right" />
        </div>

        <div>
          <Label>Spinner with label positioned to left</Label>
          <Spinner label="Nope, still loading..." aria-live="assertive" label-position="left" />
        </div>
      </Stack>
    </ExampleCard>
  </DocSection>
</template>
