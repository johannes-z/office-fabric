<template>
  <Stack :tokens="containerStackTokens" :test="1">
    <span>Default vertical stack</span>
    <Stack reversed :styles="stackStyles">
      <span>Item One</span>
      <span>Item Two</span>
      <span>Item Three</span>
    </Stack>

    <span>Ordered stack</span>
    <Stack reversed :styles="stackStyles">
      <StackItem :order="2">
        <span>Item One</span>
      </StackItem>
      <StackItem :order="3">
        <span>Item Two</span>
      </StackItem>
      <StackItem :order="1">
        <span>Item Three</span>
      </StackItem>
    </Stack>

    <span>Vertical gap between items</span>
    <Stack reversed
           :styles="stackStyles"
           :tokens="verticalGapStackTokens">
      <span>Item One</span>
      <span>Item Two</span>
      <span>Item Three</span>
    </Stack>

    <span>Item alignments</span>
    <Stack reversed
           :styles="stackStyles"
           :tokens="itemAlignmentsStackTokens">
      <StackItem align="auto" :styles="stackItemStyles">
        <span>Auto-aligned item</span>
      </StackItem>
      <StackItem align="stretch" :styles="stackItemStyles">
        <span>Stretch-aligned item</span>
      </StackItem>
      <StackItem align="baseline" :styles="stackItemStyles">
        <span>Baseline-aligned item</span>
      </StackItem>
      <StackItem align="start" :styles="stackItemStyles">
        <span>Start-aligned item</span>
      </StackItem>
      <StackItem align="center" :styles="stackItemStyles">
        <span>Center-aligned item</span>
      </StackItem>
      <StackItem align="end" :styles="stackItemStyles">
        <span>End-aligned item</span>
      </StackItem>
    </Stack>

    <span>Clickable vertical stack</span>
    <Stack reversed
           :styles="stackStyles"
           :tokens="clickableStackTokens"
           @click="onClick">
      <span>Click inside this box</span>
    </Stack>
  </Stack>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DefaultPalette } from '@uifabric/styling'
import { Stack, StackItem, IStackTokens } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: { Stack, StackItem },
})
export default class BasicStack extends Vue {
  stackStyles: any = {
    root: {
      background: DefaultPalette.themeTertiary,
    },
  }
  stackItemStyles: any = {
    root: {
      background: DefaultPalette.themePrimary,
      color: DefaultPalette.white,
      padding: 5,
    },
  }
  // Tokens definition
  containerStackTokens: any = { childrenGap: 5 }
  verticalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
  }
  itemAlignmentsStackTokens: any = {
    childrenGap: 5,
    padding: 10,
  }
  clickableStackTokens: any = {
    padding: 10,
  }

  onClick () {
    alert('Clicked VerticalStack')
  }
}
</script>

<style lang="scss" scoped>
</style>
