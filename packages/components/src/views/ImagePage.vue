<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { ref } from 'vue'
import { Image, ImageFit } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'
import type { IImageProps } from '@/components/Image'

const imageProps: Partial<IImageProps> = {
  src: 'https://fabricweb.azureedge.net/fabric-website/placeholders/350x150.png',
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: `1px solid ${props.theme.palette.neutralSecondary}` } }),
}
</script>

<template>
  <h1>Image</h1>
  <DocSection title="Usage">
    <ExampleCard title="ImageFit: Not specified">
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
    </ExampleCard>

    <ExampleCard title="ImageFit: None">
      <div>
        <p>
          By setting the <code>imageFit</code> property to <code>ImageFit.none</code>, the image will remain at its
          natural size, even if the frame is made larger or smaller by setting the width or height props.
        </p>
        <p>This image is larger than the frame, so it's cropped to fit and positioned at the upper left.</p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.none"
          :width="350"
          :height="150"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x250.png"
          alt="Example of the image fit value &quot;none&quot; on an image larger than the frame."
        />
        <p>
          This image is smaller than the frame, so there's empty space within the frame and the image is positioned at the
          upper left.
        </p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.none"
          :width="350"
          :height="150"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
          alt="Example of the image fit value &quot;none&quot; on an image smaller than the frame."
        />
      </div>
    </ExampleCard>

    <ExampleCard title="ImageFit: Center">
      <div>
        <p>
          Setting the <code>imageFit</code> property to <code>ImageFit.center</code> behaves the same as{' '}
          <code>ImageFit.none</code>, while centering the image within the frame.
        </p>
        <p>This image is larger than the frame, so all sides are cropped to center the image.</p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.center"
          :width="350"
          :height="150"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/800x300.png"
          alt="Example of the image fit value &quot;center&quot; on an image larger than the frame."
        />
        <p>
          This image is smaller than the frame, so there is empty space within the frame. The image is centered in the
          available space.
        </p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.center"
          :width="350"
          :height="150"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
          alt="Example of the image fit value &quot;center&quot; on an image smaller than the frame."
        />
      </div>
    </ExampleCard>

    <ExampleCard title="ImageFit: Contain">
      <div>
        <p>
          Setting the <code>imageFit</code> property to <code>ImageFit.contain</code> will scale the image up or down to
          fit the frame, while maintaining its natural aspect ratio and without cropping the image.
        </p>
        <p>
          This image has a wider aspect ratio (more landscape) than the frame, so it's scaled to fit the width and
          centered in the available vertical space.
        </p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/700x300.png"
          alt="Example of the image fit value &quot;contain&quot; on an image wider than the frame."
          :width="200"
          :height="200"
        />
        <p>
          This image has a taller aspect ratio (more portrait) than the frame, so it's scaled to fit the height and
          centered in the available horizontal space.
        </p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/700x300.png"
          alt="Example of the image fit value &quot;contain&quot; on an image taller than the frame."
          :width="300"
          :height="50"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="ImageFit: Cover">
      <div>
        <p>
          Setting the <code>imageFit</code> property to <code>ImageFit.cover</code> will cause the image to scale up or
          down proportionally, while cropping from either the top and bottom or sides to completely fill the frame.
        </p>
        <p>
          This image has a wider aspect ratio (more landscape) than the frame, so it's scaled to fit the height and the
          sides are cropped evenly.
        </p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.cover"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png"
          alt="Example of the image fit value &quot;cover&quot; on an image wider than the frame."
          :width="150"
          :height="250"
        />
        <p>
          This image has a taller aspect ratio (more portrait) than the frame, so it's scaled to fit the width and the top
          and bottom are cropped evenly.
        </p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.cover"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png"
          alt="Example of the image fit value &quot;cover&quot; on an image taller than the frame."
          :width="250"
          :height="150"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="ImageFit: CenterContain">
      <div>
        <p>
          Setting the <code>imageFit</code> property to <code>ImageFit.centerContain</code> will cause the image to scale
          up or down proportionally. Images smaller than their frame will be rendered as <code>ImageFit.center</code>,
          while images larger than either frame's height or width will render as <code>ImageFit.contain</code>.
        </p>
        <p>This image is smaller than the frame, so it's centered and rendered at its natural size.</p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x150.png"
          alt="Example of the image fit value &quot;centerContain&quot; on an image smaller than the frame."
        />
        <p>This image is wider than the frame, so it's contained.</p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/300x100.png"
          alt="Example of the image fit value &quot;centerContain&quot; on an image wider than the frame."
        />
        <p>This image is taller than the frame, so it's contained.</p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x300.png"
          alt="Example of the image fit value &quot;centerContain&quot; on an image taller than the frame."
        />
        <p>These images are taller and wider than the frame, so they are contained.</p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x500.png"
          alt="Example of the image fit value &quot;centerContain&quot; on an image taller and wider than the frame."
        />
        <br>
        <br>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x400.png"
          alt="Example of the image fit value &quot;centerContain&quot; on an image taller and wider than the frame."
        />
      </div>
    </ExampleCard>

    <ExampleCard title="ImageFit: CenterCover">
      <div>
        <p>
          Setting the <code>imageFit</code> property to <code>ImageFit.centerCover</code> will cause the image to scale up
          or down proportionally. Images smaller than their frame will be rendered as <code>ImageFit.center</code>, while
          images larger than either frame's height or width will render as <code>ImageFit.cover</code>.
        </p>
        <p>This image is smaller than the frame, so it's centered and rendered at its natural size.</p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x150.png"
          alt="Example of the image fit value &quot;centerCover&quot; on an image smaller than the frame."
        />
        <p>
          This image has a wider aspect ratio (more landscape) than the frame but is not as tall as the frame, so it's
          rendered at its natural size while cropping the sides.
        </p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/300x100.png"
          alt="Example of the image fit value &quot;centerCover&quot; on an image wider than the frame."
        />
        <p>
          This image has a taller aspect ratio (more portrait) than the frame but is not as wide as the frame, so it's
          rendered at its natural size while cropping the top and bottom.
        </p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x300.png"
          alt="Example of the image fit value &quot;centerCover&quot; on an image taller than the frame."
        />
        <p>These images are taller and wider than the frame, so they grow just enough to "cover" the frame area.</p>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x500.png"
          alt="Example of the image fit value &quot;centerCover&quot; on an image taller and wider than the frame."
        />
        <br>
        <br>
        <Image
          v-bind="imageProps"
          :image-fit="ImageFit.contain"
          :width="200"
          :height="200"
          src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x400.png"
          alt="Example of the image fit value &quot;centerCover&quot; on an image taller and wider than the frame."
        />
      </div>
    </ExampleCard>

    <ExampleCard title="Maximizing the image frame">
      <div>
        <p>
          Where the exact width or height of the image's frame is not known, such as when sizing an image as a percentage
          of its parent, you can use the <code>maximizeFrame</code> prop to expand the frame to fill the parent element.
        </p>
        <p>This image is placed within a landscape container.</p>
        <div style="width: 200px; height: 100px;">
          <Image
            v-bind="imageProps"
            maximize-frame
            src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png"
            :image-fit="ImageFit.cover"
            alt="Example of the maximizeFrame property with a landscape container."
          />
        </div>
        <p>This image is placed within a portrait container.</p>
        <div style="width: 100px; height: 200px;">
          <Image
            v-bind="imageProps"
            maximize-frame
            src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png"
            :image-fit="ImageFit.cover"
            alt="Example of the maximizeFrame property with a portrait container"
          />
        </div>
      </div>
    </ExampleCard>
  </DocSection>
</template>
