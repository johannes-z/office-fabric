<template>
  <div :style="{ background: theme.semanticColors.bodyBackground }">
    <div :class="classNames.root">
      <div :class="classNames.content">
        <div :class="classNames.iconContainer">
          <Icon :class="classNames.icon" :icon-name="ICON_MAP[messageBarType]" />
        </div>

        <div :class="classNames.text">
          <span :class="classNames.innerText">
            <slot />
          </span>
        </div>

        <div v-if="!actions && truncated" :class="classNames.expandSingleLine">
          <IconButton :class="classNames.expand"
                      :icon-props="{ iconName: expandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown' }" />
        </div>

        <IconButton :class="classNames.dismissal" :icon-props="{ iconName: 'Clear' }" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
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
  @Prop({ default: MessageBarType.info }) messageBarType!: number
  @Prop({ default: true }) isMultiline!: boolean
  @Prop({ default: false }) actions!: boolean
  @Prop({ default: true }) truncated!: boolean
  @Prop({ default: true }) expandSingleLine!: boolean

  private ICON_MAP = {
    [MessageBarType.info]: 'Info',
    [MessageBarType.warning]: 'Info',
    [MessageBarType.error]: 'ErrorBadge',
    [MessageBarType.blocked]: 'Blocked2',
    [MessageBarType.severeWarning]: 'Warning',
    [MessageBarType.success]: 'Completed',
  };

  get classNames () {
    const { theme, className, messageBarType, actions, truncated, isMultiline, expandSingleLine } = this

    return getClassNames(this.styles, {
      theme,
      className,
      messageBarType: messageBarType || MessageBarType.info,
      // onDismiss: onDismiss !== undefined,
      actions: actions !== undefined,
      truncated: truncated,
      isMultiline: isMultiline,
      expandSingleLine: expandSingleLine,
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
