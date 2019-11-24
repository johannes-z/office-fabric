<template>
  <span
    :class="[
      $style.root,
      block && $style.block,
      nowrap && $style.nowrap,
    ]"
    :style="[
      {
        'font-size': fontSize,
      }
    ]">
    <slot />
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Label from '../Label/Label.vue'
import { FontSizes } from '@/styles/fonts'

@Component({
  components: { Label },
})
export default class Toggle extends Vue {
  @Prop({ default: false }) nowrap!: boolean
  @Prop({ default: false }) block!: boolean
  @Prop({ default: 'medium' }) variant!: string

  get fontSize () {
    // @ts-ignore
    return FontSizes[this.variant]
  }
}
</script>

<style lang="scss" module>
.root {
  font-size: 14px;
  font-weight: 400;
  display: inline;
  color: inherit;
}
.block {
  display: block;
}
.nowrap {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
