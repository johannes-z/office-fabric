<template>
  <div>
    <FabricImage
      src="http://placehold.it/350x150"
      alt="Example implementation with no image fit property and no height or width is specified." />
    <FabricImage
      src="http://placehold.it/350x150"
      alt="Example implementation with no image fit property and only width is specified."
      width="600" />
    <FabricImage
      src="http://placehold.it/350x150"
      alt="Example implementation with no image fit property and only height is specified."
      height="100" />
    <FabricImage
      src="http://placehold.it/350x150"
      alt="Example implementation with no image fit property and height or width is specified."
      width="100"
      height="100" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricImage from '@/components/Image/Image.vue'

@Component({
  components: {
    FabricImage,
  },
})
export default class ImagePage extends Vue {
}
</script>

<style lang="scss" module>
</style>
