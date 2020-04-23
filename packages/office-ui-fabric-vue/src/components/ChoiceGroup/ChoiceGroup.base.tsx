import { Vue, Component, Prop } from 'vue-property-decorator'
import { ChoiceGroupOption } from './ChoiceGroupOption'
import BaseComponent from '../BaseComponent'

import { classNamesFunction } from '@uifabric-vue/utilities'

import { Label } from '../Label'
import { IChoiceGroupStyleProps, IChoiceGroupStyles, IChoiceGroupProps, IChoiceGroupOption } from './ChoiceGroup.types'

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

  render () {
    const { classNames, label, required, disabled, selectedOption, options } = this
    return (
      <div class={classNames.applicationRole}>
        <div class={classNames.root}>
          {label && (
            <Label class={classNames.label}
              required={required}
              disabled={disabled}>
              { label }
            </Label>
          )}

          <div class={classNames.flexContainer}>
            {options.map(option => {
              return (
                <ChoiceGroupOption
                  id={option.key}
                  key={option.key}
                  {...{ props: option }}
                  checked={selectedOption.key === option.key}
                  nativeOnClick={ev => this.onClick(ev, option)}>
                  { option.text }
                </ChoiceGroupOption>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
