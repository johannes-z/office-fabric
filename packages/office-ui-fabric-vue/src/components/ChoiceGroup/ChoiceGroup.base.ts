import { ChoiceGroupOption } from './ChoiceGroupOption'
import BaseComponent from '../BaseComponent'

import { classNamesFunction } from '@uifabric-vue/utilities'

import { Label } from '../Label'
import { IChoiceGroupStyleProps, IChoiceGroupStyles, IChoiceGroupProps, IChoiceGroupOption } from './ChoiceGroup.types'
import Vue, { CreateElement, VNode } from 'vue'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import { withThemeableProps } from '@/useThemeable'

const getClassNames = classNamesFunction<IChoiceGroupStyleProps, IChoiceGroupStyles>()

export const ChoiceGroupBase = Vue.extend({
  name: 'ChoiceGroupBase',

  components: { ChoiceGroupOption, Label },

  props: {
    ...withThemeableProps(),

    label: { type: String, default: null },
    options: { type: Array as () => IChoiceGroupOption[], default: () => [] },
    value: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },

  data () {
    return {
      selectedOption: {} as IChoiceGroupOption,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<IChoiceGroupStyles> {
      const { styles, theme, className } = this

      return getClassNames(styles, {
        theme, className, optionsContainIconOrImage: false,
      })
    },
  },

  methods: {
    onClick (ev: MouseEvent, option: IChoiceGroupOption) {
      ev.preventDefault()
      if (option.disabled) return
      this.selectedOption = option
    },
  },

  render (h: CreateElement): VNode {
    const { classNames, label, required, disabled, selectedOption, options } = this

    return h('div', { class: classNames.root }, [
      h('div', {
        attrs: {
          role: 'radiogroup',
        },
      }, [
        label && h(Label, {
          class: classNames.label,
          attrs: {
            required,
            disabled,
          },
        }, label),

        h('div', {
          class: classNames.flexContainer,
        }, options.map(option => h(ChoiceGroupOption, {
          scopedSlots: this.$scopedSlots,
          key: option.key,
          attrs: {
            id: option.key,
          },
          props: {
            ...option,
            checked: selectedOption.key === option.key,
            required,
          },
          nativeOn: {
            click: ev => this.onClick(ev, option),
          },
        }, option.text))),
      ]),
    ])
  },
})
