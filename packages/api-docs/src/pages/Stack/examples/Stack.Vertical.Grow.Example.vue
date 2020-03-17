<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DefaultPalette } from '@uifabric/styling'
import { Stack, StackItem, IStackTokens } from '@uifabric-vue/office-ui-fabric-vue'
import { CreateElement } from 'vue'

// Styles definition
const stackStyles: any = {
  root: {
    background: DefaultPalette.themeTertiary,
    height: 250,
  },
}
const stackItemStyles: any = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    justifyContent: 'center',
  },
}

// Tokens definition
const outerStackTokens: IStackTokens = { childrenGap: 5 }
const innerStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10,
}

export default Vue.extend({
  components: { Stack, StackItem },
  render (h: CreateElement) {
    return (
      <Stack tokens={outerStackTokens}>
        <Stack styles={stackStyles} tokens={innerStackTokens}>
          <StackItem grow={3} styles={stackItemStyles}>
          Grow is 3
          </StackItem>
          <StackItem grow={2} styles={stackItemStyles}>
          Grow is 2
          </StackItem>
          <StackItem grow styles={stackItemStyles}>
          Grow is 1
          </StackItem>
        </Stack>
      </Stack>
    )
  },
})
</script>

<style lang="scss" scoped>
</style>
