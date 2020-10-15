import { Vue, Component, Prop } from 'vue-property-decorator'
import { ChoiceGroupOption } from './ChoiceGroupOption'
import BaseComponent from '../BaseComponent'

import { classNamesFunction } from '@uifabric-vue/utilities'

import { Label } from '../Label'
import { IChoiceGroupStyleProps, IChoiceGroupStyles, IChoiceGroupProps, IChoiceGroupOption } from './ChoiceGroup.types'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<IChoiceGroupStyleProps, IChoiceGroupStyles>()

@Component({
  components: { ChoiceGroupOption, Label },
})
export class ChoiceGroupBase extends BaseComponent<IChoiceGroupProps> {
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: Array, default: () => [] }) options!: any[]
  @Prop({ type: Array, default: () => [] }) value!: any[]
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean

  selectedOption: any = {}

  get classNames () {
    const { styles, theme, className } = this

    return getClassNames(styles, {
      theme, className, optionsContainIconOrImage: false,
    })
  }

  private onClick (ev: MouseEvent, option: IChoiceGroupOption) {
    ev.preventDefault()
    if (option.disabled) return
    this.selectedOption = option
  }

  render (h: CreateElement) {
    const { classNames, label, required, disabled, selectedOption, options } = this

    const $label = label && h(Label, {
      class: classNames.label,
      attrs: {
        required,
        disabled,
      },
    }, label)

    const $flexContainer = h('div', {
      class: classNames.flexContainer,
    }, options.map(option => h(ChoiceGroupOption, {
      key: option.key,
      attrs: {
        id: option.key,
      },
      props: {
        ...option,
        checked: selectedOption.key === option.key,
      },
      nativeOn: {
        click: ev => this.onClick(ev, option),
      },
    }, option.text)))

    return h('div', { class: classNames.root }, [
      $label,
      $flexContainer,
    ])
  }
}
