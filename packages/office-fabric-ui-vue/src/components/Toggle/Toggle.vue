<template>
  <div :class="classNames.root"
       @click="onClick">
    <slot name="label"
          :checked="internalChecked"
          :disabled="disabled"
          :label="label">
      <Label :class-name="classNames.label"
             v-text="label" />
    </slot>
    <div :class="classNames.container">
      <button :id="`Toggle${_uid}`" :class="classNames.pill">
        <div :class="classNames.thumb" />
      </button>
      <Label v-if="(internalChecked && onText) || (!internalChecked && offText)"
             :class-name="classNames.text"
             :for="`Toggle${_uid}`"
             @click.prevent>
        {{ internalChecked ? onText : offText }}
      </Label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import { Label } from '../Label/'
import BaseComponent from '../BaseComponent'
import { IToggleProps, IToggleStyles } from './Toggle.types'
import { getClassNames } from '../../util/getClassNames'

@Component({
  components: { Label },
})
export default class Toggle extends BaseComponent<IToggleProps, IToggleStyles> {
  @Model('input', { default: false }) checked!: boolean
  @Prop({ default: '' }) label!: string
  @Prop({ default: false }) defaultChecked!: boolean
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) inlineLabel!: boolean

  @Prop({ default: null }) onText!: string
  @Prop({ default: null }) offText!: string

  internalChecked: boolean = this.defaultChecked || this.checked

  get classNames () {
    const { theme, className, disabled, internalChecked, inlineLabel, onText, offText } = this
    return getClassNames(this.styles, {
      theme: theme,
      className: className,
      disabled: disabled,
      checked: internalChecked,
      inlineLabel: inlineLabel,
      onOffMissing: !onText && !offText,
    })
  }

  @Watch('internalChecked')
  private onCheckedChanged (checked: boolean) {
    this.$emit('input', checked)
  }

  private onClick () {
    if (this.disabled) return
    this.internalChecked = !this.internalChecked
  }
}
</script>
