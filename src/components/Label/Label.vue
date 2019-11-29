<template>
  <label :class="classNames.root">
    <slot />
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ILabelProps, ILabelStyles } from './Label.types'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Label.styles'

@Component
export default class Label extends BaseComponent<ILabelProps, ILabelStyles> {
  get classNames (): any {
    return getClassNames(getStyles, {
      className: this.$attrs.class,
      disabled: this.disabled,
      required: this.required,
      theme: this.theme,
    })
  }

  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) required!: boolean
}
</script>
