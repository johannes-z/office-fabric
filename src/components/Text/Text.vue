<template>
  <span
    :class="classNames.root"
    :style="{ '--fontSize': fontSize }">
    <slot />
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '@/components/BaseComponent'
import Label from '../Label/Label.vue'
import { FontSizes } from '@/styles/fonts'

export interface ITextProps {
  nowrap?: boolean
  block?: boolean
  variant?: string
}

export interface ITextClasses {
  root: any
}

@Component({
  components: { Label },
  name: 'o-text',
})
export default class Text extends BaseComponent<ITextProps, ITextClasses> {
  @Prop({ default: false }) nowrap!: boolean
  @Prop({ default: false }) block!: boolean
  @Prop({ default: null }) variant!: string

  get fontSize () {
    // @ts-ignore
    return FontSizes[this.variant]
  }

  protected get classes (): ITextClasses {
    return {
      root: [
        'ms-Text',
        this.$style.root,
        (this.block || this.nowrap) && this.$style.block,
        this.nowrap && this.$style.nowrap,
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
