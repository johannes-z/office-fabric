<template>
  <label :class="classNames.root">
    <slot />
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ILabelProps, ILabelStyles } from './Label.types'
import { getStyles } from './Label.styles'
import { classNamesFunction } from '@fabric-vue/utilities'
import { concatStyleSetsWithProps } from '@uifabric/merge-styles'

const getClassNames = classNamesFunction<any, ILabelStyles>()

@Component
export default class Label extends BaseComponent<ILabelProps, ILabelStyles> {
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) required!: boolean

  get classNames (): any {
    const { theme, className, styles, disabled, required } = this

    return getClassNames(concatStyleSetsWithProps({
      theme,
      className,
      disabled,
      required,
    }, getStyles, styles))
  }
}
</script>
