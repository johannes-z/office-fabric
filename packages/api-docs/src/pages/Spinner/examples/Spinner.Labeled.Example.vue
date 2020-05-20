<template>
  <Stack :tokens="stackTokens">
    <div>
      <Label>Spinner with label positioned below</Label>
      <Spinner>I am definitely loading...</Spinner>
    </div>

    <div>
      <Label>Spinner with label positioned above</Label>
      <Spinner label="Seriously, still loading..." label-position="top" />
    </div>

    <div>
      <Label>Spinner with label positioned to right</Label>
      <Spinner label="Wait, wait..." label-position="right" />
    </div>

    <div>
      <Label>Spinner with label positioned to left</Label>
      <Spinner label="Nope, still loading..." label-position="left" />
    </div>
  </Stack>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IStackTokens, Stack, Label, Spinner } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: { Stack, Label, Spinner },
})
export default class SpinnerLabeledExample extends Vue {
  stackTokens: IStackTokens = {
    childrenGap: 20,
    maxWidth: 250,
  }
}
</script>
