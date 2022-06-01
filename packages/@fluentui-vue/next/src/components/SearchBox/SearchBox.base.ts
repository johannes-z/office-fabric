import { SlotProps, useStylingProps } from '@/utils'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode, VueConstructor } from 'vue'
import { IconButton } from '../Button'
import { Icon } from '../Icon'
import { IIconProps } from '../Icon/Icon.types'

export type SearchBoxLabelPosition = 'top' | 'right' | 'bottom' | 'left';
const iconButtonStyles = { root: { height: 'auto' }, icon: { fontSize: '12px' } }
const iconButtonProps: IIconProps = { iconName: 'Clear' }
const defaultClearButtonProps: IButtonProps = { ariaLabel: 'Clear text' }

const getClassNames = classNamesFunction<ISearchBoxStyleProps, ISearchBoxStyles>()

export const SearchBoxBase = (Vue as VueConstructor<
Vue & {
  $refs: {
    input: HTMLInputElement
  };
}
>).extend({
  name: 'SearchBoxBase',

  props: {
    ...useStylingProps(),

    underlined: { type: Boolean, default: false },
    defaultValue: { type: String, default: null },
    placeholder: { type: String, default: 'Search' },
    value: { type: String, default: '' },
    disableAnimation: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: false },

    iconProps: { type: Object, default: () => {} },

    disabled: { type: Boolean, default: false },
  },

  data () {
    return {
      hasFocus: false,
      internalValue: this.value ?? '',
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ISearchBoxStyles> {
      const { styles, theme, className, underlined, hasFocus, disabled, value, disableAnimation, showIcon } = this
      const classNames = getClassNames(styles!, {
        theme,
        className,
        underlined,
        hasFocus,
        disabled,
        hasInput: value.length > 0,
        disableAnimation,
        showIcon,
      })
      return classNames
    },
    hasInput (): boolean {
      return this.internalValue.length > 0
    },
    slotProps (): SlotProps<any> {
      const {
        classNames,
        disabled,
        iconProps,
        internalValue,
        placeholder,
      } = this
      return {
        root: {
          class: classNames.root,
        },
        iconContainer: {
          class: classNames.iconContainer,
          attrs: {
            'aria-hidden': true,
          },
        },
        icon: {
          class: classNames.icon,
          props: {
            iconName: 'Search',
            ...iconProps,
          },
          attrs: {
            'aria-hidden': true,
          },
        },
        field: {
          ref: 'input',
          class: classNames.field,
          domProps: {
            disabled,
            value: internalValue,
            'aria-label': placeholder,
            placeholder,
          },
          attrs: {
            role: 'searchbox',
            ...this.$attrs,
          },
          on: {
            input: this.onInput,
            focus: this.onFocus,
            blur: this.onBlur,
            keydown: this.onKeyDown,
          },
        },
        clearButton: {
          class: classNames.clearButton,
        },
        iconButton: {
          props: {
            styles: iconButtonStyles,
            iconProps: iconButtonProps,
            ...defaultClearButtonProps,
          },
          on: { click: this.clearInput },
        },
      }
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
      switch (ev.key) {
        case 'Escape':
          this.$emit('escape', ev)
          if (ev.defaultPrevented) return
          else this.clearInput()
          break

        case 'Enter':
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
      this.$refs.input.focus()
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

  render (h: CreateElement): VNode {
    const slotProps = this.slotProps

    return h('div', slotProps.root, [
      h('div', slotProps.iconContainer, [
        h(Icon, slotProps.icon),
      ]),

      h('input', slotProps.field),

      this.hasInput && h('div', slotProps.clearButton, [
        h(IconButton, slotProps.iconButton),
      ]),
    ])
  },
})
