<template>
  <component :is="component"
             :class="classNames.root"
             :href="href">
    <span :class="classNames.flexContainer">
      <Icon v-if="iconProps"
            :class="css(classNames.icon, className)"
            v-bind="iconProps" />

      <span v-if="$slots.default"
            :class="classNames.textContainer">
        <span :class="classNames.label">
          <slot />
        </span>
        <span v-if="secondaryText" :class="classNames.description">
          {{ secondaryText }}
        </span>
      </span>
    </span>
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { getBaseButtonClassNames } from './BaseButton.classNames'
import { getStyles } from './BaseButton.styles'
import { Icon } from '../Icon'

const TouchIdleDelay = 500 /* ms */

@Component({
  components: { Icon },
})
export default class BaseButton extends BaseComponent<any, any> {
  @Prop({ type: String, default: null }) href!: string
  @Prop({ type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: String, default: null }) variantClassName!: string
  @Prop({ type: Object, default: null }) iconProps!: any
  @Prop({ type: String, default: null }) secondaryText!: string

  get component (): 'a' | 'button' {
    const { disabled, href } = this
    const renderAsAnchor: boolean = !disabled && !!href
    return renderAsAnchor ? 'a' : 'button'
  }

  get classNames (): any {
    const { theme, styles, className, iconProps, variantClassName, disabled, checked } = this
    return getBaseButtonClassNames(
      theme,
      styles,
      className!,
      variantClassName,
      iconProps && iconProps.className,
      undefined,
      disabled,
      false,
      checked,
      false,
      false
    )
  }
}
</script>
