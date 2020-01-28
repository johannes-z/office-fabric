<template>
  <div :class="classNames.root"
       @click="onClick">
    <slot name="label"
          :checked="internalChecked"
          :disabled="disabled"
          :label="label">
      <Label :class="classNames.label"
             v-text="label" />
    </slot>
    <div :class="classNames.container">
      <button :id="`Toggle${_uid}`"
              ref="toggleButton"
              :class="classNames.pill">
        <div :class="classNames.thumb" />
      </button>
      <Label v-if="(internalChecked && onText) || (!internalChecked && offText)"
             :class="classNames.text"
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
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

@Component({
  components: { Label },
})
export default class Toggle extends BaseComponent<IToggleProps, IToggleStyles> {
  $refs!: {
    toggleButton: HTMLButtonElement
  }
  @Model('input', { type: Boolean, default: false }) checked!: boolean
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: Boolean, default: false }) defaultChecked!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) inlineLabel!: boolean

  @Prop({ type: String, default: null }) onText!: string
  @Prop({ type: String, default: null }) offText!: string

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

  public focus () {
    this.$refs.toggleButton.focus()
  }

  @Watch('internalChecked')
  private onCheckedChanged (checked: boolean, prevVal: boolean) {
    this.$emit('input', checked)
  }

  private onClick () {
    if (this.disabled) return
    this.internalChecked = !this.internalChecked
  }
}
</script>
