import { useStylingProps } from '@/utils'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode } from 'vue'
import { IconButton } from '../Button'
import { Icon } from '../Icon'
import { IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from './MessageBar.types'

const getClassNames = classNamesFunction<IMessageBarStyleProps, IMessageBarStyles>()

const ICON_MAP = {
  [MessageBarType.info]: 'Info',
  [MessageBarType.warning]: 'Info',
  [MessageBarType.error]: 'ErrorBadge',
  [MessageBarType.blocked]: 'Blocked2',
  [MessageBarType.severeWarning]: 'Warning',
  [MessageBarType.success]: 'Completed',
}

export const MessageBarBase = Vue.extend({
  props: {
    ...useStylingProps(),

    messageBarType: { type: Number, default: MessageBarType.info },
    isMultiline: { type: Boolean, default: true },
    actions: { type: Boolean, default: false },
    truncated: { type: Boolean, default: false },
    expandSingleLine: { type: Boolean, default: true },
    expandButtonProps: { type: Object as () => IButtonProps, default: () => ({}) },
  },

  data () {
    return {
      internalExpandSingleLine: this.expandSingleLine,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<IMessageBarStyles> {
      const { theme, className, messageBarType, actions, truncated, isMultiline } = this

      return getClassNames(this.styles, {
        theme,
        messageBarType: messageBarType || MessageBarType.info,
        onDismiss: this.$listeners.dismiss !== undefined,
        actions: actions !== undefined,
        truncated: truncated,
        isMultiline: isMultiline,
        expandSingleLine: this.internalExpandSingleLine,
        className,
      })
    },
  },

  watch: {
    expandSingleLine (value: boolean) {
      this.internalExpandSingleLine = value
    },
  },

  methods: {
    onClick () {
      this.internalExpandSingleLine = !this.internalExpandSingleLine
    },
  },

  render (h: CreateElement): VNode {
    const { theme, classNames, messageBarType, actions, truncated, isMultiline, expandButtonProps } = this

    const $iconSpan = h('div', { class: classNames.iconContainer }, [
      h(Icon, {
        class: classNames.icon,
        attrs: { iconName: ICON_MAP[messageBarType] },
      }),
    ])
    const $innerText = h('div', { class: classNames.text, attrs: { role: 'status' } }, [
      h('span', { class: classNames.innerText }, [
        h('span', this.$slots.default),
      ]),
    ])
    const $expandSingleLine = (!actions && truncated) && h('div', { class: classNames.expandSingleLine }, [
      h(IconButton, {
        class: classNames.expand,
        attrs: {
          iconProps: { iconName: this.internalExpandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown' },
        },
        props: {
          ...expandButtonProps,
        },
        nativeOn: {
          click: this.onClick,
        },
      }),
    ])
    const $singleLine = (!isMultiline && this.$slots.actions) && h(
      'div',
      { class: classNames.actions },
      this.$slots.actions,
    )
    const $dismissDiv = (this.$listeners.dismiss && isMultiline) && h(
      IconButton,
      { class: classNames.dismissal, attrs: { iconProps: { iconName: 'Clear' } } },
    )
    const $dismissSingleLine = (this.$listeners.dismiss && !isMultiline) && h(
      'div', {
        class: classNames.dismissSingleLine,
      }, [
        h(IconButton, {
          class: classNames.dismissal,
          attrs: {
            iconProps: { iconName: 'Clear' },
          },
        }),
      ],
    )
    const $multiLine = (isMultiline && this.$slots.actions) && h(
      'div',
      { class: classNames.actions },
      this.$slots.actions,
    )

    return h('div', { style: { background: theme.semanticColors.bodyBackground } }, [
      h('div', { class: classNames.root }, [
        h('div', { class: classNames.content }, [
          $iconSpan,
          $innerText,
          $expandSingleLine,
          $singleLine,
          $dismissDiv,
          $dismissSingleLine,
        ]),
        $multiLine,
      ]),
    ])
  },
})
