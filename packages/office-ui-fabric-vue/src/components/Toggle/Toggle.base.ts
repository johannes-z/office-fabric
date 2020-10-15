import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import { Label } from '../Label'
import BaseComponent from '../BaseComponent'
import { IToggleProps, IToggleStyles, IToggleStyleProps } from './Toggle.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement } from 'vue'

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

  render (h: CreateElement) {
    const { classNames, internalChecked, disabled, label, onText, offText } = this
    const id = `Toggle${this.uid}`

    const $label = h(Label, {
      class: classNames.label,
      attrs: {
        for: id,
      },
    }, this.$scopedSlots.label ? [
      this.$scopedSlots.label({ checked: internalChecked, disabled, label }),
    ] : label)

    const $pill = h('button', {
      ref: 'toggleButton',
      class: classNames.pill,
      attrs: {
        id: id,
      },
      on: {
        click: this.onClick,
      },
    }, [
      h('div', { class: classNames.thumb }),
    ])

    const $stateLabel = ((internalChecked && onText) || (!internalChecked && offText)) && h(Label, {
      class: classNames.text,
      attrs: {
        for: id,
      },
    }, internalChecked ? onText : offText)
    const $container = h('div', { class: classNames.container }, [
      $pill,
      $stateLabel,
    ])

    return h('div', { class: classNames.root }, [
      $label,
      $container,
    ])
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
