<script setup lang="ts">
import { Link, Text } from '../components'
import DocumentCard from './components/DocumentCard.vue'

function handleClickOnLink(ev: MouseEvent) {
  window.alert('clicked on Link component which is rendered as html button')
}
</script>

<template>
  <h1>Link</h1>

  <DocumentCard>
    <Text>
      When a link has an href,
      <Link href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link" underline>
        it renders as an anchor tag.
      </Link>
      Without an href,
      <Link @click="handleClickOnLink" underline>
        the link is rendered as a button
      </Link>
      . You can also use the disabled attribute to create a
      <Link disabled href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link" underline>
        disabled link.
      </Link>
    </Text>
    <Text>
      It's not recommended to use Links with imgs because Links are meant to render textual inline content. Buttons
      are inline-block or in the case of imgs, block. However, it is possible to create a linked image button by
      making a button with an unstyled variant and adding the img content and href source to that.
    </Text>
  </DocumentCard>
</template>
