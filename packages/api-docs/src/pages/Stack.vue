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

      <f-stack>
        <span>Default vertical stack</span>
        <f-stack>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </f-stack>

        <span>Ordered stack</span>
        <f-stack>
          <f-stack-item :order="2">
            <span>Item One</span>
          </f-stack-item>
          <f-stack-item :order="3">
            <span>Item Two</span>
          </f-stack-item>
          <f-stack-item :order="1">
            <span>Item Three</span>
          </f-stack-item>
        </f-stack>
      </f-stack>
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
