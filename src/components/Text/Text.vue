<template>
  <span :class="classNames.root">
    <slot />
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '@/components/BaseComponent'
import { ITextProps, ITextStyles } from './Text.types'
import { FontSizes } from '@/styling'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Text.styles'

@Component
export default class Text extends BaseComponent<ITextProps, ITextStyles> {
  @Prop({ default: false }) nowrap!: boolean
  @Prop({ default: false }) block!: boolean
  @Prop({ default: 'medium' }) variant!: string

  get classNames (): any {
    const { theme, block, nowrap, variant } = this
    return getClassNames(getStyles, {
      theme,
      block,
      nowrap,
      variant,
    })
  }
}
</script>
