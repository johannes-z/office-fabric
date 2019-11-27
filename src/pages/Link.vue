<template>
  <div>
    <h1>Link</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default Link</h2>
      <div>
        <p>
          When a link has an href, <OLink href="http://dev.office.com/fabric/components/link">it renders as an anchor tag.</OLink> Without an
          href, <OLink>the link is rendered as a button</OLink>. You can also use the disabled attribute to create a
          <OLink disabled href="http://dev.office.com/fabric/components/link">
            disabled link.
          </OLink>
        </p>
        <p>
          It's not recommended to use Links with imgs because Links are meant to render textual inline content. Buttons are inline-block or in
          the case of imgs, block. However, it is possible to create a linked image button by making a button with an unstyled variant and
          adding the img content and href source to that.
        </p>
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { OLink } from '@/components/Link/'

@Component({
  components: {
    OLink,
  },
})
export default class LinkPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
