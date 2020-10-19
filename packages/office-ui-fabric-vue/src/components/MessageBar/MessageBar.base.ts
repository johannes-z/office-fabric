import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IMessageBarStyles, MessageBarType } from './MessageBar.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { Icon } from '../Icon'
import { IconButton } from '../Button'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<any, IMessageBarStyles>()

const ICON_MAP = {
  [MessageBarType.info]: 'Info',
  [MessageBarType.warning]: 'Info',
  [MessageBarType.error]: 'ErrorBadge',
  [MessageBarType.blocked]: 'Blocked2',
  [MessageBarType.severeWarning]: 'Warning',
  [MessageBarType.success]: 'Completed',
}

@Component({
  components: { Icon, IconButton },
})
export class MessageBarBase extends BaseComponent {
  @Prop({ type: Number, default: MessageBarType.info }) messageBarType!: number
  @Prop({ type: Boolean, default: true }) isMultiline!: boolean
  @Prop({ type: Boolean, default: false }) actions!: boolean
  @Prop({ type: Boolean, default: false }) truncated!: boolean
  @Prop({ type: Boolean, default: true }) expandSingleLine!: boolean

  state = {
    expandSingleLine: this.expandSingleLine,
  }

  get classNames () {
    const { theme, className, messageBarType, actions, truncated, isMultiline } = this
    const { expandSingleLine } = this.state

    return getClassNames(this.styles, {
      theme,
      messageBarType: messageBarType || MessageBarType.info,
      onDismiss: this.$listeners.dismiss !== undefined,
      actions: actions !== undefined,
      truncated: truncated,
      isMultiline: isMultiline,
      expandSingleLine: expandSingleLine,
      className,
    })
  }

  @Watch('expandSingleLine')
  private onExpandSingleLine (value: boolean) {
    this.state.expandSingleLine = value
  }

  private onClick () {
    this.state.expandSingleLine = !this.state.expandSingleLine
  }

  render (h: CreateElement) {
    const { theme, classNames, messageBarType, actions, truncated, isMultiline } = this

    const $iconSpan = h('div', { class: classNames.iconContainer }, [
      h('Icon', {
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
          iconProps: { iconName: this.state.expandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown' },
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
  }
}
