<template>
  <div>
    <h1>Image</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>ImageFit: Not specified</h2>
      <o-label>
        Without a width or height specified, the frame remains at its natural size and the image will not be scaled.
      </o-label>
      <o-image
        src="http://placehold.it/350x150"
        alt="Example implementation with no image fit property and no height or width is specified." />
      <o-label>
        If only a width is provided, the frame will be set to that width. The image will scale proportionally to fill the available width.
      </o-label>
      <o-image
        src="http://placehold.it/350x150"
        alt="Example implementation with no image fit property and only width is specified."
        width="600" />
      <o-label>
        If only a height is provided, the frame will be set to that height. The image will scale proportionally to fill the available height.
      </o-label>
      <o-image
        src="http://placehold.it/350x150"
        alt="Example implementation with no image fit property and only height is specified."
        height="100" />
      <o-label>
        If both width and height are provided, the frame will be set to that width and height. The image will scale to fill both the available width and height. This may result in a distorted image.
      </o-label>
      <o-image
        src="http://placehold.it/350x150"
        alt="Example implementation with no image fit property and height or width is specified."
        width="100"
        height="100" />

      <h2>ImageFit: None</h2>
      <o-label>
        The image is larger than the frame, so it is cropped to fit. The image is positioned at the upper left of the frame.
      </o-label>
      <o-image
        src="http://placehold.it/500x250"
        :image-fit="ImageFit.none"
        width="350"
        height="150"
        alt="Example implementation with no image fit property and no height or width is specified." />

      <o-label>
        The image is smaller than the frame, so there is empty space within the frame. The image is positioned at the upper left of the frame.
      </o-label>
      <o-image
        :image-fit="ImageFit.none"
        width="350"
        height="150"
        src="http://placehold.it/100x100"
        alt="Example implementation of the property image fit using the none value on an image smaller than the frame." />

      <h2>ImageFit: Contain</h2>
      <o-label>
        The image has a wider aspect ratio (more landscape) than the frame, so the image is scaled to fit the width and centered in the available vertical space.
      </o-label>
      <o-image
        :image-fit="ImageFit.contain"
        width="200"
        height="200"
        src="http://placehold.it/700x300" />
      <o-label>
        The image has a taller aspect ratio (more portrait) than the frame, so the image is scaled to fit the height and centered in the available horizontal space.
      </o-label>
      <o-image
        :image-fit="ImageFit.contain"
        width="300"
        height="50"
        src="http://placehold.it/700x300" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ImageFit } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
  },
})
export default class ImagePage extends Vue {
  ImageFit = ImageFit
}
</script>
