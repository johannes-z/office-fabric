<script setup lang="ts">
import { Link, Text } from '../components'
import DocSection from './components/DocSection.vue'

function handleClickOnLink(ev: MouseEvent) {
  window.alert('clicked on Link component which is rendered as html button')
}
</script>

<template>
  <h1>Link</h1>

  <DocSection>
    <h2>Usage</h2>

    <h3>Link</h3>
    <Text>
      When a link has an href,
      <Link href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link" underline>
        it renders as an anchor tag.
      </Link>
      Without an href,
      <Link underline @click="handleClickOnLink">
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

    <h3>Vue Router</h3>
    This link renders as a Vue Router link: <Link to="/Spinner" underline>
      Spinner
    </Link>.
  </DocSection>
</template>
