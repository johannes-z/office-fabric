<template>
  <component :is="component"
             :class="classNames.root"
             :href="href">
    <span :class="classNames.flexContainer">
      <Icon :class="css(classNames.icon, className)" v-bind="iconProps" />

      <span v-if="$slots.default"
            :class="classNames.textContainer">
        <span :class="classNames.label">
          <slot />
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
  @Prop() href!: string
  @Prop() checked!: boolean
  @Prop() disabled!: boolean
  @Prop() variantClassName!: string
  @Prop() styles!: any
  @Prop() iconProps!: any

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
