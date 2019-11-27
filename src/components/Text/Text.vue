<template>
  <span v-bind="css.root">
    <slot />
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '@/components/BaseComponent'
import { FontSizes } from '@/styles/fonts'
import { ITextProps, ITextStyles } from './Text.types'

@Component({
  name: 'o-text',
})
export default class Text extends BaseComponent<ITextProps, ITextStyles> {
  @Prop({ default: false }) nowrap!: boolean
  @Prop({ default: false }) block!: boolean
  @Prop({ default: null }) variant!: string

  created () {
    console.log(this.css)
  }

  get baseStyles (): ITextStyles {
    return {
      root: [
        'ms-Text',
        this.$style.root,
        (this.block || this.nowrap) && this.$style.block,
        this.nowrap && this.$style.nowrap,
        {
          // @ts-ignore
          '--fontSize': FontSizes[this.variant],
        },
      ],
    }
  }
}
</script>

<style lang="scss" module>
.root {
  font-size: var(--fontSize, 14px);
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
