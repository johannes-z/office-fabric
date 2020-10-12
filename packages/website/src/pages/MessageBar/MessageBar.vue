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
      <f-message-bar>
        Info/Default MessageBar.
        <f-link href="https://google.at" target="_blank">
          Visit our website.
        </f-link>
      </f-message-bar>
      <f-message-bar :is-multiline="false"
                     :message-bar-type="MessageBarType.error"
                     @dismiss="onDismiss">
        Error MessageBar with single line, with dismiss button.
        <f-link href="www.bing.com" target="_blank">
          Visit our website.
        </f-link>
      </f-message-bar>
      <f-message-bar :is-multiline="false"
                     truncated
                     :message-bar-type="MessageBarType.blocked"
                     @dismiss="onDismiss">
        <b>Blocked MessageBar - single line, with dismiss button and truncated text.</b> Truncation is not available if you use action buttons
        or multiline and should be used sparingly. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis
        tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci
        nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec
        pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet
        enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum
        mauris.
      </f-message-bar>
      <f-message-bar :message-bar-type="MessageBarType.severeWarning">
        SevereWarning MessageBar with action buttons which defaults to multiline.
        <f-link href="www.bing.com" target="_blank">
          Visit our website.
        </f-link>
        <template #actions>
          <div>
            <f-message-bar-button>Yes</f-message-bar-button>
            <f-message-bar-button>No</f-message-bar-button>
          </div>
        </template>
      </f-message-bar>
      <f-message-bar :message-bar-type="MessageBarType.success"
                     :is-multiline="false">
        Success MessageBar with single line and action buttons.
        <f-link href="www.bing.com" target="_blank">
          Visit our website.
        </f-link>
        <template #actions>
          <div>
            <f-message-bar-button>Yes</f-message-bar-button>
            <f-message-bar-button>No</f-message-bar-button>
          </div>
        </template>
      </f-message-bar>
      <f-message-bar :message-bar-type="MessageBarType.warning"
                     :is-multiline="false"
                     @dismiss="onDismiss">
        Warning MessageBar content.
        <f-link href="www.bing.com" target="_blank">
          Visit our website.
        </f-link>
        <template #actions>
          <div>
            <f-message-bar-button>Action</f-message-bar-button>
          </div>
        </template>
      </f-message-bar>
      <f-message-bar :message-bar-type="MessageBarType.warning">
        <b>Warning defaults to multiline</b>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique,
        odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam
        condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar
        commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim.
        Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.
        <f-link href="www.bing.com" target="_blank">
          Visit our website.
        </f-link>
        <template #actions>
          <div>
            <f-message-bar-button>Yes</f-message-bar-button>
            <f-message-bar-button>No</f-message-bar-button>
          </div>
        </template>
      </f-message-bar>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { MessageBarType } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
  },
})
export default class MessageBarPage extends Vue {
  MessageBarType = MessageBarType

  onDismiss () {
    console.log('test')
  }
}
</script>

<style lang="scss" module>
</style>
