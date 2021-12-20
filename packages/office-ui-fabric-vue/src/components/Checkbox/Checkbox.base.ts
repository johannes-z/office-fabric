import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction, getId } from '@uifabric-vue/utilities'
import Vue, { PropType, VNode } from 'vue'
import { Icon, IIconProps } from '../Icon'
import { Label } from '../Label'
import { ICheckboxProps, ICheckboxStyles } from './Checkbox.types'

const getClassNames = classNamesFunction<any, ICheckboxStyles>()

export const CheckboxBase = Vue.extend({
  name: 'CheckboxBase',

  model: {
    prop: 'checked',
    event: 'input',
  },

  props: {
    ...withThemeableProps(),

    checked: { type: Boolean, default: false },
    defaultChecked: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    defaultIndeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: String, default: null },
    title: { type: String, default: null },
    boxSide: {
      type: String as PropType<'start' | 'end'>,
      default: 'start',
      validator: v => v && ['start', 'end'].indexOf(v) > -1,
    },

    checkmarkIconProps: { type: Object as PropType<IIconProps>, default: undefined },
  } as MappedType<ICheckboxProps>,

  data () {
    return {
      internalValue: this.checked || this.defaultChecked,
      isIndeterminate: this.indeterminate || this.defaultIndeterminate,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ICheckboxStyles> {
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
    },
  },

  watch: {
    checked (value: boolean) {
      this.internalValue = value
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

  render (h): VNode {
    const { classNames, title, label, checkmarkIconProps } = this
    const id = getId('Checkbox')

    const $input = h('input', {
      class: classNames.input,
      attrs: {
        id: id,
        ...this.$attrs,
        disabled: this.disabled,
        type: 'checkbox',
      },
      on: {
        input: this.onInput,
      },
    })

    return h('div', { class: classNames.root }, [
      $input,
      h(Label, {
        class: classNames.label,
        attrs: { for: id },
      }, [
        h('div', { class: classNames.checkbox }, [
          h(Icon, {
            class: classNames.checkmark,
            props: {
              iconName: 'CheckMark',
              ...checkmarkIconProps,
            },
          }),
        ]),
        (label || this.$slots.default) && h('span', {
          class: classNames.text,
          attrs: {
            title: title,
          },
        }, this.$slots.default || label),
      ]),
    ])
  },

})
