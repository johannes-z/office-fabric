<template>
  <div>
    <h1>Callout</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
      <Text block variant="large">Callouts are a powerful way to simplify a user interface. They host tips and other information users need when they need it, with minimal effort on their part. Callouts can help you use screen space more effectively and reduce screen clutter. However, poorly designed Callouts can be annoying, distracting, unhelpful, overwhelming, or in the way.</Text>
      <br>
      <Text block variant="large">Use a Callout for displaying additional contextual information about an item on the screen. Callouts also have a tail that identifies their source. A common use for Callout is the introduction of a new feature or capability of an app or site. Alternate usages include pairing the Callout with a button or clickable element for on-demand presentation of additional or supporting content.</Text>
      <br>
      <Text block variant="large">By default, Callouts that do not contain focusable elements (links, buttons etc) cannot gain focus when opened. For proper screen reader support, follow the non-focusable callout example, which treats the callout content like a status message.</Text>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default Callout</h2>

      <div style="padding: 20px;">
        <DefaultButton ref="target" @click.stop="showCallout = !showCallout">
          {{ showCallout ? 'Hide' : 'Show' }} callout
        </DefaultButton>
      </div>

      <Callout v-if="showCallout"
               :directional-hint="DirectionalHint.rightCenter"
               :target="$refs.target"
               :styles="{ calloutMain: { maxWidth: 300 } }"
               :is-beak-visible="true"
               @dismiss="onDismiss">
        <div :class="[classNames.bodyText, $style.header]">
          <p :class="[classNames.bodyText, $style.title]">
            All of your favorite people
          </p>
        </div>
        <div :class="[classNames.bodyText, $style.inner]">
          <p :class="[classNames.bodyText, $style.subtext]">
            Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
          </p>
          <div :class="[classNames.bodyText, $style.actions]">
            <FLink href="http://microsoft.com"
                   target="_blank">
              Go to microsoft
            </FLink>
          </div>
        </div>
      </Callout>

      <h2>Callout with deferred content</h2>

      <div style="padding: 20px;">
        <DefaultButton ref="target2" @click.stop="showCallout2 = !showCallout2">
          {{ showCallout2 ? 'Hide' : 'Show' }} callout
        </DefaultButton>
      </div>

      <Callout v-if="showCallout2"
               :directional-hint="DirectionalHint.rightCenter"
               :target="$refs.target2"
               :styles="{ calloutMain: { maxWidth: 300 } }"
               :is-beak-visible="true"
               @dismiss="onDismiss">
        <div :class="[classNames.bodyText, $style.header]">
          <p :class="[classNames.bodyText, $style.title]">
            All of your favorite people
          </p>
        </div>
        <div v-if="showContent" :class="[classNames.bodyText, $style.inner]">
          <p :class="[classNames.bodyText, $style.subtext]">
            Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
          </p>
          <div :class="[classNames.bodyText, $style.actions]">
            <FLink href="http://microsoft.com"
                   target="_blank">
              Go to microsoft
            </FLink>
          </div>
        </div>
      </Callout>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { DefaultButton, Text, Callout, Link, mergeStyleSets, getTheme, IPartialTheme, DirectionalHint } from '@uifabric-vue/office-ui-fabric-vue'
import Vue from 'vue-demi'

export default Vue.extend({
  name: 'CalloutPage',

  components: {
    DefaultButton,
    Text,
    Callout,
    FLink: Link,
  },

  data () {
    return {
      DirectionalHint: DirectionalHint,

      showContent: false,
      showCallout: false,
      showCallout2: false,
    }
  },

  computed: {
    classNames () {
      return mergeStyleSets({
        bodyText: {
          color: this.theme?.semanticColors?.bodyText,
        },
      })
    },
  },

  watch: {
    showCallout2 (value) {
      if (value) {
        setTimeout(() => {
          this.showContent = true
        }, 2000)
      }
    },
  },

  methods: {
    onDismiss () {
      this.showCallout = false
      this.showCallout2 = false
      this.showContent = false
    },
  },
})
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
}
.inner {
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
}
.actions {
  position: relative;
  margin-top: 20px;
  width: 100%;
  white-space: nowrap;
}
.link {
}
</style>
