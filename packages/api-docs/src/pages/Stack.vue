<template>
  <div>
    <h1>Stack</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <h2>Stack</h2>

      <Stack :tokens="containerStackTokens" :test="1">
        <span>Default vertical stack</span>
        <Stack slot-scope="scope"
               :styles="stackStyles"
               v-bind="scope">
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </Stack>

        <span>Ordered stack</span>
        <Stack>
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
      </Stack>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DefaultPalette } from '@uifabric/styling'
import { Stack, StackItem } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: { Stack, StackItem },
})
export default class StackPage extends Vue {
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
  verticalGapStackTokens: any = {
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
}
</script>

<style lang="scss" module>
</style>
