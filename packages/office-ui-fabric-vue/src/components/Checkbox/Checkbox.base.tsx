import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import { Label } from '../Label'
import { Icon } from '../Icon'
import { ICheckboxProps, ICheckboxStyles } from './Checkbox.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { mergeStyles, concatStyleSets, concatStyleSetsWithProps } from '@uifabric/merge-styles'

const getClassNames = classNamesFunction<any, ICheckboxStyles>()

@Component({
})
export class CheckboxBase extends BaseComponent {
  @Model('input', { type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: false }) defaultChecked!: boolean
  @Prop({ type: Boolean, default: false }) indeterminate!: boolean
  @Prop({ type: Boolean, default: false }) defaultIndeterminate!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: null }) title!: string
  @Prop({ type: String, default: 'start', validator: v => ['start', 'end'].indexOf(v) > -1 }) boxSide!: 'start' | 'end'

  private internalValue: boolean = this.checked || this.defaultChecked
  private isIndeterminate: boolean = this.indeterminate || this.defaultIndeterminate

  render () {
    const { classNames, title, label } = this

    return (
      <div class={classNames.root}>
        <input id={`Checkbox${this.uid}`}
          class={classNames.input}
          {...this.$attrs}
          disabled={this.disabled}
          type="checkbox"
          onInput={this.onInput} />

        <Label class={classNames.label} for={`Checkbox${this.uid}`}>
          <div class={classNames.checkbox}>
            <Icon icon-name="CheckMark" class={classNames.checkmark} />
          </div>

          {(label || this.$slots.default) && (
            <span class={classNames.text} title={title}>
              {this.$slots.default || label}
            </span>
          )}
        </Label>
      </div>
    )
  }

  get classNames () {
    const { theme, className, disabled, isIndeterminate, internalValue, boxSide } = this
    return getClassNames(this.styles, {
      theme,
      className,
      disabled,
      indeterminate: isIndeterminate,
      checked: internalValue,
      reversed: boxSide !== 'start',
      isUsingCustomLabelRender: true,
    })
  }

  @Watch('checked')
  private onCheckedChanged (newVal, oldVal) {
    if (newVal === oldVal) return
    this.internalValue = newVal
  }

  @Watch('internalValue')
  private onValueChanged (value: boolean) {
    this.$emit('input', value)
  }

  private onInput () {
    if (this.disabled) return

    if (this.isIndeterminate) {
      this.internalValue = this.defaultChecked
      this.isIndeterminate = false
    } else {
      this.internalValue = !this.internalValue
    }
  }
}
