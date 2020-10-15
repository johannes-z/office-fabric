import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import { Label } from '../Label'
import { Icon } from '../Icon'
import { ICheckboxStyles } from './Checkbox.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { h } from '@vue/composition-api'

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

  @Watch('checked')
  onCheckedChanged (newVal: boolean) {
    this.internalValue = newVal
  }

  render () {
    const { classNames, title, label } = this

    const $input = h('input', {
      class: classNames.input,
      attrs: {
        id: `Checkbox${this.uid}`,
        ...this.$attrs,
        disabled: this.disabled,
        type: 'checkbox',
      },
      on: {
        input: this.onInput,
      },
    })

    const $icon = h(Icon, {
      class: classNames.checkmark,
      props: {
        iconName: 'CheckMark',
      },
    })
    const $checkbox = h('div', { class: classNames.checkbox }, [$icon])

    const $text = (label || this.$slots.default) && h('span', {
      class: classNames.text,
      attrs: {
        title: title,
      },
    }, this.$slots.default || label)

    return h('div', { class: classNames.root }, [
      $input,
      h(Label, {
        class: classNames.label,
        attrs: { for: `Checkbox${this.uid}` },
      }, [
        $checkbox,
        $text,
      ]),
    ])
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

  private onInput () {
    if (this.disabled) return

    if (this.isIndeterminate) {
      this.internalValue = this.defaultChecked
      this.isIndeterminate = false
    } else {
      this.internalValue = !this.internalValue
    }
    this.$emit('input', this.internalValue)
  }
}
