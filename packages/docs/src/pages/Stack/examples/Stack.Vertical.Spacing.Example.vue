<template>
  <Stack :tokens="sectionStackTokens">
    <Stack horizontal
           disable-shrink
           :tokens="headingStackTokens">
      <Stack>
        <span>Numerical spacing</span>
        <Stack :styles="stackStyles" :tokens="numericalSpacingStackTokens">
          <span :class="stackItemStyles">1</span>
          <span :class="stackItemStyles">2</span>
          <span :class="stackItemStyles">3</span>
        </Stack>
      </Stack>

      <Stack>
        <span>Custom spacing</span>
        <Stack :styles="stackStyles" :tokens="customSpacingStackTokens">
          <span :class="stackItemStyles">1</span>
          <span :class="stackItemStyles">2</span>
          <span :class="stackItemStyles">3</span>
        </Stack>
      </Stack>
    </Stack>

    <Stack horizontal
           disable-shrink
           horizontal-align="space-between">
      <Stack>
        <span>Themed spacing (extra small)</span>
        <Stack :styles="stackStyles" :tokens="themedExtraSmallStackTokens">
          <span :class="stackItemStyles">1</span>
          <span :class="stackItemStyles">2</span>
          <span :class="stackItemStyles">3</span>
        </Stack>
      </Stack>

      <Stack>
        <span>Themed spacing (small)</span>
        <Stack :styles="stackStyles" :tokens="themedSmallStackTokens">
          <span :class="stackItemStyles">1</span>
          <span :class="stackItemStyles">2</span>
          <span :class="stackItemStyles">3</span>
        </Stack>
      </Stack>

      <Stack>
        <span>Themed spacing (medium)</span>
        <Stack :styles="stackStyles" :tokens="themedMediumStackTokens">
          <span :class="stackItemStyles">1</span>
          <span :class="stackItemStyles">2</span>
          <span :class="stackItemStyles">3</span>
        </Stack>
      </Stack>

      <Stack>
        <span>Themed spacing (large)</span>
        <Stack :styles="stackStyles" :tokens="themedLargeStackTokens">
          <span :class="stackItemStyles">1</span>
          <span :class="stackItemStyles">2</span>
          <span :class="stackItemStyles">3</span>
        </Stack>
      </Stack>

      <Stack>
        <span>Themed spacing (extra large)</span>
        <Stack :styles="stackStyles" :tokens="themedExtraLargeStackTokens">
          <span :class="stackItemStyles">1</span>
          <span :class="stackItemStyles">2</span>
          <span :class="stackItemStyles">3</span>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DefaultPalette, mergeStyles } from '@uifabric/styling'
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

  stackItemStyles: any = mergeStyles({
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 50,
  })

  // Tokens definition
  sectionStackTokens: IStackTokens = { childrenGap: 10 };
  headingStackTokens: IStackTokens = { childrenGap: 50 };
  numericalSpacingStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
  };

  customSpacingStackTokens: IStackTokens = {
    childrenGap: '20%',
    padding: 'm 40px',
  };

  themedExtraSmallStackTokens: IStackTokens = {
    childrenGap: 's2',
    padding: 's2',
  };

  themedSmallStackTokens: IStackTokens = {
    childrenGap: 's1',
    padding: 's1',
  };

  themedMediumStackTokens: IStackTokens = {
    childrenGap: 'm',
    padding: 'm',
  };

  themedLargeStackTokens: IStackTokens = {
    childrenGap: 'l1',
    padding: 'l1',
  };

  themedExtraLargeStackTokens: IStackTokens = {
    childrenGap: 'l2',
    padding: 'l2',
  };
}
</script>

<style lang="scss" scoped>
</style>
