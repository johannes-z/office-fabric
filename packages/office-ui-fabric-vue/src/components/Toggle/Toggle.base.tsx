import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import { Label } from '../Label/'
import BaseComponent from '../BaseComponent'
import { IToggleProps, IToggleStyles, IToggleStyleProps } from './Toggle.types'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>()

@Component
export class ToggleBase extends BaseComponent<IToggleProps, IToggleStyles> {
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

  render () {
    const { classNames, internalChecked, disabled, label, onText, offText } = this
    return (
      <div class={classNames.root}>
        {this.$scopedSlots.label
          ? this.$scopedSlots.label({ checked: internalChecked, disabled, label })
          : (
            <Label class={classNames.label} for={`Toggle${this.uid}`}>
              {label}
            </Label>
          )}
        <div class={classNames.container}>
          <button id={`Toggle${this.uid}`} ref="toggleButton" class={classNames.pill} onClick={this.onClick}>
            <div class={classNames.thumb} />
          </button>
          {((internalChecked && onText) || (!internalChecked && offText)) && (

            <Label class={classNames.text} for={`Toggle${this.uid}`}>
              { internalChecked ? onText : offText }
            </Label>
          )}
        </div>
      </div>
    )
  }

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
