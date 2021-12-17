import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction, KeyCodes } from '@uifabric-vue/utilities'
import Vue, { PropType, VNode } from 'vue'
import { ISearchBoxStyleProps } from '.'
import { IconButton } from '../Button'
import { Icon, IIconProps } from '../Icon'
import { ISearchBoxProps, ISearchBoxStyles } from './SearchBox.types'

const getClassNames = classNamesFunction<ISearchBoxStyleProps, ISearchBoxStyles>()

type Refs = {
  input: HTMLInputElement
}
const refs: { [K in keyof Refs]: K } = {
  input: 'input',
}

export const SearchBoxBase = Vue.extend({
  name: 'SearchBoxBase',

  props: {
    ...withThemeableProps(),

    underlined: { type: Boolean, default: false },
    defaultValue: { type: String, default: null },
    placeholder: { type: String, default: 'Search' },
    value: { type: String, default: null },
    disableAnimation: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: false },

    iconProps: { type: Object as PropType<IIconProps>, default: () => {} },

    disabled: { type: Boolean, default: false },
  } as MappedType<ISearchBoxProps>,

  data () {
    return {
      hasFocus: false,
      internalValue: this.value ?? '',
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ISearchBoxStyles> {
      const {
        styles,
        theme,
        underlined,
        disabled,
        hasFocus,
        showIcon,
        className,
        disableAnimation,
        internalValue,
      } = this

      return getClassNames(styles!, {
        theme: theme!,
        className,
        underlined,
        hasFocus,
        disabled,
        hasInput: internalValue.length > 0,
        disableAnimation,
        showIcon,
      })
    },
  },

  watch: {
    value (newValue: string): void {
      this.internalValue = newValue
    },
    internalValue (value: string) {
      this.$emit('input', value)
      this.$emit('change', value)
    },
  },

  methods: {
    onKeyDown (ev: KeyboardEvent) {
      switch (ev.which) {
        case KeyCodes.escape:
          this.$emit('escape', ev)
          if (ev.defaultPrevented) return
          else this.clearInput()
          break

        case KeyCodes.enter:
          this.$emit('search', this.internalValue)
          return

        default:
          if (!ev.defaultPrevented) {
            return
          }
      }

      // We only get here if the keypress has been handled,
      // or preventDefault was called in case of default keyDown handler
      ev.preventDefault()
      ev.stopPropagation()
    },

    submit () {
      this.$emit('search', this.internalValue)
    },

    onEscape (e: KeyboardEvent) {
      this.$emit('escape', e)
      if (e.defaultPrevented) return
      this.clearInput()
    },

    clearInput (e?: MouseEvent) {
      this.$emit('clear', e)
      if (e && e.defaultPrevented) return
      this.internalValue = ''
      ;(this.$refs as Refs).input.focus()
    },

    onFocus (e: FocusEvent) {
      this.$emit('focus', e)
      if (e.defaultPrevented) return
      this.hasFocus = true
    },

    onBlur (e: FocusEvent) {
      this.$emit('blur', e)
      if (e.defaultPrevented) return
      this.hasFocus = false
    },

    onInput (e: InputEvent) {
      this.internalValue = (<HTMLInputElement>e.target).value
    },

  },

  render (h): VNode {
    const { classNames, disabled, internalValue, placeholder, iconProps } = this

    const $iconContainer = h('div', { class: classNames.iconContainer }, [
      h(Icon, { class: classNames.icon, props: { iconName: 'Search', ...iconProps } }),
    ])
    const $clearButton = internalValue.length > 0 && h('div', { class: classNames.clearButton }, [
      h(IconButton, {
        props: {
          styles: { root: { height: 'auto' }, icon: { fontSize: '12px' } },
          iconProps: { iconName: 'Clear' },
        },
        on: { click: this.clearInput },
      }),
    ])
    const $input = h('input', {
      ref: refs.input,
      class: classNames.field,
      domProps: {
        disabled,
        value: internalValue,
        ...this.$attrs,
        'aria-label': placeholder,
        placeholder,
      },
      on: {
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur,
        keydown: this.onKeyDown,
      },
    })

    return h('div', { class: classNames.root }, [
      $iconContainer,
      $input,
      $clearButton,
    ])
  },

})
