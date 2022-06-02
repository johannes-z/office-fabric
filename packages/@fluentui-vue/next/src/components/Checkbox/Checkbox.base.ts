import { getId, classNamesFunction } from '@fluentui-vue/utilities'
import { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode, VueConstructor } from 'vue'
import { Icon } from '../Icon'
import { Label } from '../Label'
import { SlotProps, useStylingProps } from '@/utils/'
import { ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types'

export type CheckboxLabelPosition = 'top' | 'right' | 'bottom' | 'left';

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>()

export const CheckboxBase = (Vue as VueConstructor<
Vue & {
  $refs: {
    input: HTMLInputElement
  };
}
>).extend({
  name: 'CheckboxBase',

  model: {
    prop: 'checked',
    event: 'input',
  },

  props: {
    ...useStylingProps(),

    checked: { type: Boolean, default: false },
    defaultChecked: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    defaultIndeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: String, default: null },
    title: { type: String, default: null },
    boxSide: {
      type: String as () => 'start' | 'end',
      default: 'start',
      validator: v => ['start', 'end'].indexOf(v) > -1,
    },
    inputProps: { type: Object as () => any, default: undefined },

    checkmarkIconProps: { type: Object as () => any, default: undefined },
  },

  data () {
    return {
      internalValue: this.checked || this.defaultChecked,
      isIndeterminate: this.indeterminate || this.defaultIndeterminate,
    }
  },

  computed: {
    id (): string {
      return getId('Checkbox')
    },
    classNames (): IProcessedStyleSet<ICheckboxStyles> {
      const { theme, className, disabled, isIndeterminate, internalValue, boxSide } = this
      return getClassNames(this.styles, {
        theme,
        className,
        disabled,
        indeterminate: isIndeterminate,
        checked: isIndeterminate ? false : internalValue,
        reversed: boxSide !== 'start',
        isUsingCustomLabelRender: true,
      })
    },
    slotProps (): SlotProps<ICheckboxStyles> {
      const {
        classNames,
        id,
        checkmarkIconProps,
        title,
        disabled,
        inputProps,
      } = this

      return {
        root: {
          class: classNames.root,
        },
        input: {
          class: classNames.input,
          attrs: {
            id,
            ...this.$attrs,
            ...inputProps,
            disabled: disabled,
            type: 'checkbox',
          },
          on: {
            input: this.onInput,
          },
        },
        label: {
          class: classNames.label,
          attrs: { for: id },
        },
        checkbox: {
          class: classNames.checkbox,
        },
        checkmark: {
          class: classNames.checkmark,
          props: {
            iconName: 'CheckMark',
            ...checkmarkIconProps,
          },
        },
        text: {
          class: classNames.text,
          attrs: {
            title: title,
          },
        },
      }
    },
  },

  methods: {
    onInput () {
      if (this.disabled) return

      if (this.isIndeterminate) {
        this.internalValue = this.defaultChecked
        this.isIndeterminate = false
      } else {
        this.internalValue = !this.internalValue
      }
      this.$emit('input', this.internalValue)
    },
  },

  render (h: CreateElement): VNode {
    const { slotProps, label } = this

    return h('div', slotProps.root, [
      h('input', slotProps.input),

      h(Label, slotProps.label, [
        h('div', slotProps.checkbox, [
          h(Icon, slotProps.checkmark),
        ]),
        (this.$slots.default || label) && h('span', slotProps.text, this.$slots.default || label),
      ]),
    ])
  },
})
