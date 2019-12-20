<template>
  <div :style="{ background: theme.semanticColors.bodyBackground }">
    <div :class="classNames.root">
      <div :class="classNames.content">
        <!-- getIconSpan -->
        <div :class="classNames.iconContainer">
          <Icon :class="classNames.icon" :icon-name="ICON_MAP[messageBarType]" />
        </div>

        <!-- renderInnerText -->
        <div :class="classNames.text" role="status">
          <span :class="classNames.innerText">
            <span><slot /></span>
          </span>
        </div>

        <!-- getExpandSingleLine -->
        <div v-if="!actions && truncated" :class="classNames.expandSingleLine">
          <IconButton :class="classNames.expand"
                      :icon-props="{ iconName: state.expandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown' }"
                      @click.native="onClick" />
        </div>

        <!-- renderSingleLine - getActionsDiv -->
        <div v-if="!isMultiline && $slots.actions" :class="classNames.actions">
          <slot name="actions" />
        </div>

        <template v-if="$listeners.dismiss">
          <!-- getDismissDiv -->
          <IconButton v-if="isMultiline"
                      :class="classNames.dismissal"
                      :icon-props="{ iconName: 'Clear' }" />
          <!-- getDismissSingleLine -->
          <div v-else :class="classNames.dismissSingleLine">
            <IconButton :class="classNames.dismissal"
                        :icon-props="{ iconName: 'Clear' }" />
          </div>
        </template>
      </div>

      <!-- renderMultiLine - getActionsDiv -->
      <div v-if="isMultiline && $slots.actions" :class="classNames.actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IMessageBarStyles, MessageBarType } from './MessageBar.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { Icon } from '../Icon'
import { IconButton } from '../Button'

const getClassNames = classNamesFunction<any, IMessageBarStyles>()

@Component({
  components: { Icon, IconButton },
})
export default class MessageBar extends BaseComponent {
  @Prop({ type: Number, default: MessageBarType.info }) messageBarType!: number
  @Prop({ type: Boolean, default: true }) isMultiline!: boolean
  @Prop({ type: Boolean, default: false }) actions!: boolean
  @Prop({ type: Boolean, default: false }) truncated!: boolean
  @Prop({ type: Boolean, default: true }) expandSingleLine!: boolean

  state = {
    expandSingleLine: this.expandSingleLine,
  }

  private ICON_MAP = {
    [MessageBarType.info]: 'Info',
    [MessageBarType.warning]: 'Info',
    [MessageBarType.error]: 'ErrorBadge',
    [MessageBarType.blocked]: 'Blocked2',
    [MessageBarType.severeWarning]: 'Warning',
    [MessageBarType.success]: 'Completed',
  };

  get classNames () {
    const { theme, className, messageBarType, actions, truncated, isMultiline } = this
    const { expandSingleLine } = this.state

    return getClassNames(this.styles, {
      theme,
      className,
      messageBarType: messageBarType || MessageBarType.info,
      onDismiss: this.$listeners.dismiss !== undefined,
      actions: actions !== undefined,
      truncated: truncated,
      isMultiline: isMultiline,
      expandSingleLine: expandSingleLine,
    })
  }

  @Watch('expandSingleLine')
  private onExpandSingleLine (value: boolean) {
    this.state.expandSingleLine = value
  }

  private onClick () {
    this.state.expandSingleLine = !this.state.expandSingleLine
  }
}
</script>
