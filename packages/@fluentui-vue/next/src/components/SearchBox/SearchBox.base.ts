import { classNamesFunction } from '@fluentui-vue/utilities'
import { computed, defineComponent, h, ref, toRefs, watch } from 'vue'
import { IconButton } from '../Button'
import type { IButtonProps } from '../Button/Button.types'
import { Icon } from '../Icon'
import type { IIconProps } from '../Icon/Icon.types'
import type { ISearchBoxStyleProps, ISearchBoxStyles } from './SearchBox.types'
import { useStylingProps } from '@/utils'

export type SearchBoxLabelPosition = 'top' | 'right' | 'bottom' | 'left'
const iconButtonStyles = { root: { height: 'auto' }, icon: { fontSize: '12px' } }
const iconButtonProps: IIconProps = { iconName: 'Clear' }
const defaultClearButtonProps: IButtonProps = { ariaLabel: 'Clear text' }

const getClassNames = classNamesFunction<ISearchBoxStyleProps, ISearchBoxStyles>()

export const SearchBoxBase = defineComponent({
  name: 'SearchBoxBase',

  props: {
    ...useStylingProps(),

    underlined: { type: Boolean, default: false },
    defaultValue: { type: String, default: null },
    placeholder: { type: String, default: 'Search' },
    modelValue: { type: String, default: '' },
    disableAnimation: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: false },

    iconProps: { type: Object, default: () => ({}) },

    disabled: { type: Boolean, default: false },
  },

  setup(props, { attrs, slots, emit, expose }) {
    const {
      styles,
      theme,
      className,
      underlined,
      disabled,
      disableAnimation,
      showIcon,
      modelValue,
      iconProps,
      placeholder,
    } = toRefs(props)

    const hasFocus = ref(false)
    const internalValue = ref(modelValue.value ?? '')

    const classNames = computed(() => getClassNames(styles.value!, {
      theme: theme.value,
      className: className.value,
      underlined: underlined.value,
      hasFocus: hasFocus.value,
      disabled: disabled.value,
      hasInput: modelValue.value.length > 0,
      disableAnimation: disableAnimation.value,
      showIcon: showIcon.value,
    }))

    const hasInput = computed(() => internalValue.value.length > 0)

    const slotProps = computed(() => ({
      root: {
        class: classNames.value.root,
      },
      iconContainer: {
        'class': classNames.value.iconContainer,
        'aria-hidden': true,
      },
      icon: {
        'class': classNames.value.icon,
        'iconName': 'Search',
        ...iconProps.value,
        'aria-hidden': true,
      },
      field: {
        'ref': inputRef,
        'role': 'searchbox',
        ...attrs,
        'disabled': disabled.value,
        'value': internalValue.value,
        'aria-label': placeholder.value,
        'placeholder': placeholder.value,
        'class': classNames.value.field,
        'onInput': onInput,
        'onFocus': onFocus,
        'onBlur': onBlur,
        'onKeydown': onKeyDown,
      },
      clearButton: {
        class: classNames.value.clearButton,
      },
      iconButton: {
        styles: iconButtonStyles,
        iconProps: iconButtonProps,
        ...defaultClearButtonProps,
        onClick: clearInput,
      },
    }))

    const onEscape = (e: KeyboardEvent) => {
      emit('escape', e)
      if (e.defaultPrevented)
        return
      clearInput()
    }
    const onInput = (e: InputEvent) => {
      internalValue.value = (<HTMLInputElement>e.target).value
    }
    const onFocus = (e: FocusEvent) => {
      emit('focus', e)
      if (e.defaultPrevented)
        return
      hasFocus.value = true
    }
    const onBlur = (e: FocusEvent) => {
      emit('blur', e)
      if (e.defaultPrevented)
        return
      hasFocus.value = false
    }
    const onKeyDown = (ev: KeyboardEvent) => {
      switch (ev.key) {
        case 'Escape':
          emit('escape', ev)
          if (ev.defaultPrevented)
            return
          else clearInput()
          break

        case 'Enter':
          emit('search', internalValue.value)
          return

        default:
          if (!ev.defaultPrevented)
            return
      }

      // We only get here if the keypress has been handled,
      // or preventDefault was called in case of default keyDown handler
      ev.preventDefault()
      ev.stopPropagation()
    }
    const clearInput = (e?: MouseEvent) => {
      emit('clear', e)
      if (e && e.defaultPrevented)
        return
      internalValue.value = ''
      inputRef.value?.focus()
    }

    const submit = () => {
      emit('search', internalValue.value)
    }

    watch(modelValue, (value) => {
      internalValue.value = value
    })
    watch(internalValue, (value) => {
      emit('update:modelValue', value)
      emit('change', value)
    })

    const inputRef = ref<HTMLInputElement | null>(null)

    expose({
      focus: () => {
        inputRef.value?.focus()
      },
      clear: () => {
        internalValue.value = ''
      },
    })

    return () => h('div', slotProps.value.root, [
      h('div', slotProps.value.iconContainer, [
        h(Icon, slotProps.value.icon),
      ]),

      h('input', slotProps.value.field),

      hasInput.value && h('div', slotProps.value.clearButton, [
        h(IconButton, slotProps.value.iconButton),
      ]),
    ])
  },
})
