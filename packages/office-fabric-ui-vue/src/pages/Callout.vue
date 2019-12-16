<template>
  <div>
    <h1>Callout</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default Callout</h2>

      <div style="padding: 20px;">
        <o-default-button ref="target" @click.native="showCallout = true">Target</o-default-button>
      </div>

      <o-callout v-if="showCallout"
                 :target="target"
                 :styles="{ calloutMain: { maxWidth: 300 } }"
                 :is-beak-visible="true"
                 @dismiss="onDismiss">
        <div :class="$style.header">
          <p :class="$style.title">
            All of your favorite people
          </p>
        </div>
        <div :class="$style.inner">
          <p :class="$style.subtext">
            Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
          </p>
        </div>
      </o-callout>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CalloutPage extends Vue {
  showCallout: boolean = false
  target: any = null

  mounted () {
    this.target = (this.$refs.target as Vue).$el
  }

  onDismiss () {
    this.showCallout = false
  }
}
</script>

<style lang="scss" module>
.header {
  padding-top: 18px;
  padding-right: 24px;
  padding-bottom: 12px;
  padding-left: 24px;
}
.title {
  font-size: 20px;
  font-weight: 300;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  color: rgb(50, 49, 48);
}
.inner {
  height: 100%;
  padding-top: 0px;
  padding-right: 24px;
  padding-bottom: 20px;
  padding-left: 24px;
}
.subtext {
  font-size: 12px;
  font-weight: 300;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  color: rgb(50, 49, 48);
}
</style>
