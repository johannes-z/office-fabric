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

      <o-stack>
        <span>Default vertical stack</span>
        <o-stack>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </o-stack>

        <span>Ordered stack</span>
        <o-stack>
          <o-stack-item :order="2">
            <span>Item One</span>
          </o-stack-item>
          <o-stack-item :order="3">
            <span>Item Two</span>
          </o-stack-item>
          <o-stack-item :order="1">
            <span>Item Three</span>
          </o-stack-item>
        </o-stack>
      </o-stack>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class StackPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
