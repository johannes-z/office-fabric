import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import { Label } from '../Label/'
import BaseComponent from '../BaseComponent'
import { IToggleProps, IToggleStyles, IToggleStyleProps } from './Toggle.types'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>()

// import { defineComponent, ref, reactive } from '@vue/composition-api'
// export default defineComponent({
//   model: {
//     prop: 'checked',
//     event: 'input',
//   },
//   props: {
//     disabled: { type: Boolean, default: false },
//     checked: { type: Boolean, default: false },
//     defaultChecked: { type: Boolean, default: false },
//     label: { type: String, default: '' },
//     inlineLabel: { type: Boolean, default: false },
//     onText: { type: String, default: null },
//     offText: { type: String, default: null },
//   },
//   setup (props) {
//     console.log(props)

//     return () => <div>test</div>
//   },
// })

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

  @Watch('checked')
  onCheckedChanged (checked: boolean) {
    this.internalChecked = checked
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

  render () {
    const { classNames } = this
    return (
      <div class={classNames.root}>
        {this.renderLabel()}
        <div class={classNames.container}>
          <button id={`Toggle${this.uid}`} ref="toggleButton" class={classNames.pill} onClick={this.onClick}>
            <div class={classNames.thumb} />
          </button>
          {this.renderStateLabel()}
        </div>
      </div>
    )
  }

  renderLabel () {
    const { classNames, internalChecked, disabled, label } = this
    if (this.$scopedSlots.label) return this.$scopedSlots.label({ checked: internalChecked, disabled, label })
    return (
      <Label class={classNames.label} for={`Toggle${this.uid}`}>
        {label}
      </Label>
    )
  }

  renderStateLabel () {
    const { classNames, internalChecked, onText, offText } = this
    return ((internalChecked && onText) || (!internalChecked && offText)) && (
      <Label class={classNames.text} for={`Toggle${this.uid}`}>
        { internalChecked ? onText : offText }
      </Label>
    )
  }

  public focus () {
    this.$refs.toggleButton.focus()
  }

  private onClick () {
    if (this.disabled) return
    this.internalChecked = !this.internalChecked
    this.$emit('input', this.internalChecked)
  }
}
