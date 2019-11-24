<template>
  <div :class="[
    $style.root,
    'ms-Image'
  ]">
    <img :class="[$style.image]"
         :src="src"
         alt=""
         v-bind="$attrs">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class Image extends Vue {
  @Prop({ type: String, required: true }) src!: string
  @Prop({ type: String, default: '' }) alt!: string
}
</script>

<style lang="scss" module>
.root {
  overflow: hidden;
}
.image {
  display: block;
  opacity: 1;
}
</style>
