<template>
  <div>
    <h1>Label</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Label</h2>
      <o-message-bar>I'm a Label</o-message-bar>
      <o-message-bar :message-bar-type="MessageBarType.error">
        Error MessageBar with single line, with dismiss button.
        <o-link href="www.bing.com" target="_blank">
          Visit our website.
        </o-link>
      </o-message-bar>
      <o-message-bar :message-bar-type="MessageBarType.blocked">
        <b>Blocked MessageBar - single line, with dismiss button and truncated text.</b> Truncation is not available if you use action buttons
        or multiline and should be used sparingly. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis
        tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci
        nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec
        pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet
        enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum
        mauris.
      </o-message-bar>
      <o-message-bar :message-bar-type="MessageBarType.severeWarning">
        SevereWarning MessageBar with action buttons which defaults to multiline.
        <o-link href="www.bing.com" target="_blank">
          Visit our website.
        </o-link>
      </o-message-bar>
      <o-message-bar :message-bar-type="MessageBarType.success">
        Success MessageBar with single line and action buttons.
        <o-link href="www.bing.com" target="_blank">
          Visit our website.
        </o-link>
      </o-message-bar>
      <o-message-bar :message-bar-type="MessageBarType.warning">
        Warning MessageBar content.
        <o-link href="www.bing.com" target="_blank">
          Visit our website.
        </o-link>
      </o-message-bar>
      <o-message-bar :message-bar-type="MessageBarType.warning">
        <b>Warning defaults to multiline</b>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique,
        odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam
        condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar
        commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim.
        Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.
        <o-link href="www.bing.com" target="_blank">
          Visit our website.
        </o-link>
      </o-message-bar>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { MessageBarType } from '@/components/'

@Component({
  components: {
  },
})
export default class MessageBarPage extends Vue {
  MessageBarType = MessageBarType
}
</script>

<style lang="scss" module>
</style>
