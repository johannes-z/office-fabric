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
import { classNamesFunction } from '../../utilities'

const getClassNames = classNamesFunction<any, ILabelStyles>()

@Component
export default class Label extends BaseComponent<ILabelProps, ILabelStyles> {
  get classNames (): any {
    return getClassNames(getStyles, {
      className: this.className,
      disabled: this.disabled,
      required: this.required,
      theme: this.theme,
    })
  }

  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) required!: boolean
}
</script>
