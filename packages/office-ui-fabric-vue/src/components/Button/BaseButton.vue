<template>
  <component :is="component"
             :class="classNames.root"
             :href="href">
    <span :class="classNames.flexContainer">
      <Icon v-if="iconProps"
            :class="css(classNames.icon, className)"
            v-bind="iconProps" />

      <slot name="flex" />

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
import { getBaseButtonClassNames, IButtonClassNames } from './BaseButton.classNames'
import { Icon } from '../Icon'
import { ITheme } from '@uifabric/styling'

const TouchIdleDelay = 500 /* ms */

@Component({
  components: { Icon },
})
export default class BaseButton extends BaseComponent<any, any> {
  @Prop({ type: String, default: null }) href!: string
  @Prop({ type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: false }) split!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) primaryDisabled!: boolean
  @Prop({ type: Boolean, default: false }) allowDisabledFocus!: boolean
  @Prop({ type: String, default: null }) variantClassName!: string
  @Prop({ type: Object, default: () => {} }) iconProps!: any
  @Prop({ type: Object, default: () => {} }) menuIconProps!: any
  @Prop({ type: Object, default: null }) menuProps!: any
  @Prop({ type: String, default: null }) secondaryText!: string
  @Prop({ type: Function, default: null }) getClassNames!: (
    theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    hasMenu: boolean,
    isSplit: boolean | undefined,
    allowDisabledFocus: boolean
  ) => IButtonClassNames;

  menuHidden: boolean = true

  get component (): 'a' | 'button' {
    const { disabled, href } = this
    const renderAsAnchor: boolean = !disabled && !!href
    return renderAsAnchor ? 'a' : 'button'
  }

  get classNames (): any {
    const { theme, styles, className, iconProps, menuIconProps, variantClassName, disabled, primaryDisabled, checked, getClassNames } = this
    const isPrimaryButtonDisabled = disabled || primaryDisabled

    return getClassNames
      ? getClassNames(
        theme!,
        className!,
        variantClassName!,
        iconProps && iconProps.className,
        menuIconProps && menuIconProps.className,
        isPrimaryButtonDisabled!,
        checked!,
        !this.menuHidden,
        !!this.menuProps,
        this.split,
        !!this.allowDisabledFocus
      )
      : getBaseButtonClassNames(
        theme!,
        styles!,
        className!,
        variantClassName!,
        iconProps && iconProps.className,
        menuIconProps && menuIconProps.className,
        isPrimaryButtonDisabled!,
        !!this.menuProps,
        checked!,
        !this.menuHidden,
        this.split
      )
  }
}
</script>
