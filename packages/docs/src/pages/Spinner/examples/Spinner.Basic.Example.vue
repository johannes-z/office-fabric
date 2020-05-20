<template>
  <Stack :tokens="tokens.sectionStack">
    <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
      <Label>Extra small spinner</Label>
      <Spinner :size="12" />
    </Stack>

    <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
      <Label>Small spinner</Label>
      <Spinner :size="16" />
    </Stack>

    <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
      <Label>Medium spinner</Label>
      <Spinner :size="20" />
    </Stack>

    <Stack v-bind="rowProps" :tokens="tokens.spinnerStack">
      <Label>Large spinner</Label>
      <Spinner :size="28" />
    </Stack>
  </Stack>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IStackProps, Stack, Label, Spinner } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: { Stack, Label, Spinner },
})
export default class SpinnerBasicExample extends Vue {
  rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' };

  tokens = {
    sectionStack: {
      childrenGap: 10,
    },
    spinnerStack: {
      childrenGap: 20,
    },
  };
}
</script>

<style lang="scss" scoped>
</style>
