<template>
  <div>
    <ImageIcon
      :class="classNames.one"
      :image-props="{
        src: TestImages.iconOne,
        className: css(classNames.image, classNames.oneImage),
      }" />
    <ImageIcon
      :class="classNames.check"
      :image-props="{
        src: TestImages.iconOne,
        className: css(classNames.image, classNames.checkImage),
      }" />
    <ImageIcon
      :class="classNames.lock"
      :image-props="{
        src: TestImages.iconOne,
        className: css(classNames.image, classNames.lockImage),
      }" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ImageIcon, css } from '@uifabric-vue/office-ui-fabric-vue'
import { mergeStyles, mergeStyleSets } from '@uifabric/styling'
import { TestImages } from '@uifabric/example-data'

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
    width: -109,
    top: -5,
  },
})

@Component({
  components: { ImageIcon },
})
export default class IconBasicExample extends Vue {
  css = css
  TestImages = TestImages
  classNames = classNames
}
</script>

<style lang="scss" scoped>
</style>
