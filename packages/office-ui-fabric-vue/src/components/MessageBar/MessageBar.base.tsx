import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IMessageBarStyles, MessageBarType } from './MessageBar.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { Icon } from '../Icon'
import { IconButton } from '../Button'

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

  render () {
    const { theme, classNames, messageBarType, actions, truncated, isMultiline } = this
    return (
      <div style={{ background: theme.semanticColors.bodyBackground }}>
        <div class={classNames.root}>
          <div class={classNames.content}>
            {/* getIconSpan */}
            <div class={classNames.iconContainer}>
              <Icon class={classNames.icon} icon-name={ICON_MAP[messageBarType]} />
            </div>

            {/* renderInnerText */}
            <div class={classNames.text} role="status">
              <span class={classNames.innerText}>
                <span>{this.$slots.default}</span>
              </span>
            </div>

            {/* getExpandSingleLine */}
            {(!actions && truncated) && (
              <div class={classNames.expandSingleLine}>
                <IconButton class={classNames.expand}
                  icon-props={{ iconName: this.state.expandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown' }}
                  nativeOnClick={this.onClick} />
              </div>
            )}

            {/* renderSingleLine - getActionsDiv */}
            {(!isMultiline && this.$slots.actions) && (
              <div class={classNames.actions}>
                {this.$slots.actions}
              </div>
            )}

            {/* getDismissDiv */}
            {(this.$listeners.dismiss && isMultiline) && (
              <IconButton class={classNames.dismissal} icon-props={{ iconName: 'Clear' }} />
            )}

            {/* getDismissSingleLine */}
            {(this.$listeners.dismiss && !isMultiline) && (
              <div class={classNames.dismissSingleLine}>
                <IconButton class={classNames.dismissal} icon-props={{ iconName: 'Clear' }} />
              </div>
            )}

          </div>

          {/* renderMultiLine - getActionsDiv */}
          {(isMultiline && this.$slots.actions) && (
            <div class={classNames.actions}>
              {this.$slots.actions}
            </div>
          )}
        </div>
      </div>
    )
  }
}
