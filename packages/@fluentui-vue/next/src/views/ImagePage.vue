<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { ref } from 'vue'
import { Image } from '../components'
import DocSection from './components/DocSection.vue'
import type { IImageProps } from '@/components/Image'

const imageProps: Partial<IImageProps> = {
  src: 'https://fabricweb.azureedge.net/fabric-website/placeholders/350x150.png',
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: `1px solid ${props.theme.palette.neutralSecondary}` } }),
}
</script>

<template>
  <h1>Image</h1>
  <DocSection>
    <p>
      With no <code>imageFit</code> property set, the <code>width</code> and <code>height</code> props control the size
      of the frame. Depending on which of those props is used, the image may scale to fit the frame.
    </p>
    <p>
      Without a <code>width</code> or <code>height</code> specified, the frame remains at its natural size and the image
      will not be scaled.
    </p>
    <Image v-bind="imageProps" alt="Example with no image fit value and no height or width is specified." />
    <p>
      If only a width is provided, the frame will be set to that width. The image will scale proportionally to fill the
      available width.
    </p>
    <Image v-bind="imageProps" alt="Example with no image fit value and only width is specified." :width="600" />
    <p>
      If only a height is provided, the frame will be set to that height. The image will scale proportionally to fill
      the available height.
    </p>
    <Image v-bind="imageProps" alt="Example with no image fit value and only height is specified." :height="100" />
    <p>
      If both width and height are provided, the frame will be set to that width and height. The image will scale to
      fill both the available width and height. <strong>This may result in a distorted image.</strong>
    </p>
    <Image
      v-bind="imageProps"
      alt="Example with no image fit value and height or width is specified."
      :width="100"
      :height="100"
    />
  </DocSection>
</template>
