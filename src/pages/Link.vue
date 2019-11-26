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
      <OLink href="http://google.at">Google</OLink>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Link as OLink } from '@/components/Link/'

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
