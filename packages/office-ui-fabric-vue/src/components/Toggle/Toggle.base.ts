import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction, getId } from '@uifabric-vue/utilities'
import { IProcessedStyleSet } from '@uifabric/styling'
import Vue, { CreateElement, VNode } from 'vue'
import { Label } from '../Label'
import { IToggleProps, IToggleStyleProps, IToggleStyles } from './Toggle.types'

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>()

export const ToggleBase = Vue.extend({
  name: 'ToggleBase',

  model: {
    prop: 'checked',
    event: 'input',
  },

  props: {
    ...withThemeableProps(),

    checked: { type: Boolean, default: false },
    label: { type: String, default: '' },
    defaultChecked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    inlineLabel: { type: Boolean, default: false },
    onText: { type: String, default: null },
    offText: { type: String, default: null },
  } as MappedType<IToggleProps>,

  data () {
    return {
      internalChecked: this.defaultChecked || this.checked,
    }
  },

  computed: {
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
    uid (): string {
      return getId()
    },
  },

  watch: {
    checked (value) {
      this.internalChecked = value
    },
  },

  methods: {
    focus () {
      (this.$refs.toggleButton as HTMLButtonElement | null)?.focus()
    },
    onClick () {
      if (this.disabled) return
      this.internalChecked = !this.internalChecked
      this.$emit('input', this.internalChecked)
    },
  },

  render (h: CreateElement): VNode {
    const { classNames, internalChecked, disabled, label, onText, offText } = this
    const id = `Toggle${this.uid}`

    const $label = h(Label, {
      class: classNames.label,
      attrs: {
        for: id,
      },
    }, [
      this.$scopedSlots.label
        ? this.$scopedSlots.label({ checked: internalChecked, disabled, label })
        : label,
    ])

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
  },
})
