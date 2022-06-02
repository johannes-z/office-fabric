import { getId, classNamesFunction } from '@fluentui-vue/utilities'
import { SlotProps, useStylingProps } from '@/utils'
import { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode } from 'vue'
import { Label } from '../Label'
import { IToggleStyleProps, IToggleStyles } from './Toggle.types'

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>()

export const ToggleBase = Vue.extend({
  name: 'ToggleBase',

  model: {
    prop: 'checked',
    event: 'input',
  },

  props: {
    ...useStylingProps(),

    disabled: { type: Boolean, default: false },

    label: { type: String, default: '' },
    inlineLabel: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    defaultChecked: { type: Boolean, default: false },
    onText: { type: String, default: null },
    offText: { type: String, default: null },
  },

  data () {
    return {
      internalChecked: this.defaultChecked || this.checked,
    }
  },

  computed: {
    id (): string {
      return getId('Toggle')
    },
    onOffMissing (): boolean {
      return !this.onText && !this.offText
    },
    classNames (): IProcessedStyleSet<IToggleStyles> {
      const { theme, className, disabled, internalChecked, inlineLabel, onText, offText } = this
      return getClassNames(this.styles, {
        theme: theme!,
        className: className,
        disabled: disabled,
        checked: internalChecked,
        inlineLabel: inlineLabel,
        onOffMissing: !onText && !offText,
      })
    },
    slotProps (): SlotProps<IToggleStyles> {
      const { id, disabled } = this
      return {
        root: {
          class: this.classNames.root,
        },
        label: {
          class: this.classNames.label,
          attrs: {
            for: id,
          },
        },
        container: {
          class: this.classNames.container,
        },
        pill: {
          class: this.classNames.pill,
          attrs: { id },
          on: {
            click: () => {
              if (disabled) return
              this.internalChecked = !this.internalChecked
              this.$emit('input', this.internalChecked)
            },
          },
        },
        thumb: {
          class: this.classNames.thumb,
        },
        text: {
          class: this.classNames.text,
          attrs: {
            for: id,
          },
        },
      }
    },
  },

  render (h: CreateElement): VNode {
    const { slotProps, label, checked, disabled, onText, offText } = this

    return h('div', slotProps.root, [
      h(Label, slotProps.label, this.$scopedSlots.label?.({ checked, disabled, label }) ?? label),
      h('div', slotProps.container, [
        h('button', slotProps.pill, [
          h('div', slotProps.thumb),
        ]),
        ((checked && onText) || (!checked && offText)) && h(Label, slotProps.text, checked ? onText : offText),
      ]),
    ])
  },
})
