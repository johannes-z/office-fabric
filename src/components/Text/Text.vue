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
import { getStyles } from './Text.styles'
import { classNamesFunction } from '../../utilities'
import { IProcessedStyleSet } from '@uifabric/merge-styles'

const getClassNames = classNamesFunction<any, ITextStyles>()

@Component
export default class Text extends BaseComponent<ITextProps, ITextStyles> {
  @Prop({ default: false }) nowrap!: boolean
  @Prop({ default: false }) block!: boolean
  @Prop({ default: 'medium' }) variant!: string

  get classNames (): IProcessedStyleSet<ITextStyles> {
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
