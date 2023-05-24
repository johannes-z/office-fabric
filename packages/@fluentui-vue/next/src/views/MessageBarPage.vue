<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { ref } from 'vue'
import { Link, MessageBar, MessageBarType } from '../components'
import DocumentCard from './components/DocumentCard.vue'
import { TextField } from '@/components/TextField'

const textFieldId = useId('anInput')

function onDismiss() {
  console.log('onDismiss')
}
</script>

<template>
  <h1>MessageBar</h1>

  <DocumentCard>
    <h2>Usage</h2>

    <h3>MessageBar</h3>
    <MessageBar>
      Info (default) MessageBar.
      <Link href="www.bing.com" target="_blank" underline>
        Visit our website.
      </Link>
    </MessageBar>
    <MessageBar :message-bar-type="MessageBarType.error" @dismiss="onDismiss">
      Error MessageBar with single line, with dismiss button.
      <Link href="www.bing.com" target="_blank" underline>
        Visit our website.
      </Link>
    </MessageBar>
    <MessageBar :message-bar-type="MessageBarType.blocked" :is-multiline="false" truncated @dismiss="onDismiss">
      <b>Blocked MessageBar - single line, with dismiss button and truncated text.</b> Truncation is not available if you
      use action buttons or multiline and should be used sparingly. Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum
      aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac
      efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet
      faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce
      massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget,
      condimentum mauris.
    </MessageBar>
    <MessageBar :message-bar-type="MessageBarType.severeWarning">
      SevereWarning MessageBar with action buttons which defaults to multiline.
      <Link href="www.bing.com" target="_blank" underline>
        Visit our website.
      </Link>
      <template #actions>
        <div>
          <button>Yes</button>
          <button>No</button>
        </div>
      </template>
    </MessageBar>
    <MessageBar :message-bar-type="MessageBarType.success">
      I'm a MessageBar
    </MessageBar>
    <MessageBar :message-bar-type="MessageBarType.warning">
      I'm a MessageBar
    </MessageBar>
  </DocumentCard>
</template>
