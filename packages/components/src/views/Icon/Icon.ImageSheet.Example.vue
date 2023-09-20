<script setup lang="ts">
import { ImageIcon, mergeStyleSets, mergeStyles } from '@fluentui-vue/components'
import { css } from '@fluentui-vue/utilities'
import { TestImages } from '@fluentui/example-data'

const classNames = mergeStyleSets({
  image: {
    display: 'inline-block',
    position: 'relative',
  },
  one: {
    width: 48,
    height: 44,
    marginLeft: 27,
  },
  oneImage: {
    left: -6,
    top: -4,
  },
  check: {
    width: 35,
    height: 43,
    marginLeft: 55,
  },
  checkImage: {
    left: -60,
    top: -5,
  },
  lock: {
    width: 35,
    height: 42,
    marginLeft: 65,
  },
  lockImage: {
    left: -109,
    top: -5,
  },
})
</script>

<template>
  <div>
    <ImageIcon
      :class="classNames.one"
      :image-props="{
        src: TestImages.iconOne,
        alt: 'OneNote file',
        className: css(classNames.image, classNames.oneImage),
      }"
    />
    <ImageIcon
      :class="classNames.check"
      :image-props="{
        src: TestImages.iconOne,
        alt: 'Printer ready',
        className: css(classNames.image, classNames.checkImage),
      }"
    />
    <ImageIcon
      aria-label="Locked"
      :class="classNames.lock"
      :image-props="{
        src: TestImages.iconOne,
        alt: 'Locked',
        className: css(classNames.image, classNames.lockImage),
      }"
    />
  </div>
</template>
