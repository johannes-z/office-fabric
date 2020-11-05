import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Icon } from '../Icon'
import { IconButton } from '../Button'
import { ISearchBoxProps, ISearchBoxStyles } from './SearchBox.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction, KeyCodes } from '@uifabric-vue/utilities'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<any, ISearchBoxStyles>()

@Component({
  components: { Icon, IconButton },
  inheritAttrs: false,
})
export class SearchBoxBase extends BaseComponent {
  $refs!: {
    input: HTMLInputElement
  }

  @Prop({ type: Boolean, default: false }) underlined?: boolean
  @Prop({ type: String, default: null }) defaultValue?: string
  @Prop({ type: String, default: 'Search' }) placeholder?: string
  @Prop({ type: String, default: null }) value!: string
  @Prop({ type: Boolean, default: false }) disableAnimation?: boolean
  @Prop({ type: Boolean, default: false }) disabled?: boolean
  @Prop({ type: String, default: 'Search' }) iconName!: string

  isActive: boolean = false
  internalValue: string = this.value

  render (h: CreateElement) {
    const { classNames, disabled, internalValue, placeholder, iconName } = this

    const $iconContainer = h('div', { class: classNames.iconContainer }, [
      h(Icon, { class: classNames.icon, props: { iconName } }),
    ])
    const $clearButton = internalValue && h('div', { class: classNames.clearButton }, [
      h(IconButton, {
        props: {
          styles: { root: { height: 'auto' }, icon: { fontSize: '12px' } },
          iconProps: { iconName: 'Clear' },
        },
        on: { click: this.clearInput },
      }),
    ])
    const $input = h('input', {
      ref: 'input',
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
  }

  get classNames () {
    const { theme, underlined, disabled, isActive, className, disableAnimation, internalValue } = this
    return getClassNames(this.styles, {
      theme: theme!,
      className,
      underlined,
      hasFocus: isActive,
      disabled,
      hasInput: internalValue == null ? false : internalValue.length > 0,
      disableAnimation,
    })
  }

  @Watch('value')
  onPropValueChanged (newValue: string) {
    this.internalValue = newValue
  }

  @Watch('internalValue')
  onValueChanged (value: string) {
    this.$emit('input', value)
    this.$emit('change', value)
  }

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
  }

  submit () {
    this.$emit('search', this.internalValue)
  }

  onEscape (e: KeyboardEvent) {
    this.$emit('escape', e)
    if (e.defaultPrevented) return
    this.clearInput()
  }

  clearInput (e?: MouseEvent) {
    this.$emit('clear', e)
    if (e && e.defaultPrevented) return
    this.internalValue = ''
    this.$refs.input.focus()
  }

  private onFocus (e: FocusEvent) {
    this.$emit('focus', e)
    if (e.defaultPrevented) return
    this.isActive = true
  }

  private onBlur (e: FocusEvent) {
    this.$emit('blur', e)
    if (e.defaultPrevented) return
    this.isActive = false
  }

  private onInput (e: InputEvent) {
    this.internalValue = (<HTMLInputElement>e.target).value
  }
}
