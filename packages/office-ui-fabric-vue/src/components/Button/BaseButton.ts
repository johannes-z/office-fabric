import { getBaseButtonClassNames, IButtonClassNames } from './BaseButton.classNames'
import { Icon, FontIcon } from '../Icon'
import { DirectionalHint } from '../../common/DirectionalHint'
import { ContextualMenu } from '../ContextualMenu'
import { IButtonProps } from './Button.types'
import Vue, { CreateElement, VNode } from 'vue'
import { withThemeableProps } from '@/useThemeable'
import { css } from '@uifabric-vue/utilities'

const TouchIdleDelay = 500 /* ms */

/**
 * {@docCategory Button}
 */
export interface IBaseButtonProps extends IButtonProps {
  baseClassName?: string;
  variantClassName?: string;
}

export const BaseButton = Vue.extend({
  props: {
    ...withThemeableProps(),

    href: { type: String, default: null },
    checked: { type: Boolean, default: false },
    split: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    primaryDisabled: { type: Boolean, default: false },
    allowDisabledFocus: { type: Boolean, default: false },
    variantClassName: { type: String, default: null },
    iconProps: { type: Object, default: () => {} },
    menuIconProps: { type: Object, default: () => {} },
    menuAs: { type: Object, default: null },
    menuProps: { type: Object, default: null },
    persistMenu: { type: Boolean, default: false },
    renderPersistedMenuHiddenOnMount: { type: Boolean, default: false },
    secondaryText: { type: String, default: null },
    getClassNames: { type: Function, default: null },
  },

  data () {
    return {
      menuHidden: true,
      menuOpen: false,
    }
  },

  computed: {

    MenuType (): any {
      return this.menuAs || ContextualMenu
    },

    component (): 'a' | 'button' {
      const { disabled, href } = this
      const renderAsAnchor: boolean = !disabled && !!href
      return renderAsAnchor ? 'a' : 'button'
    },

    isSplitButton (): boolean {
      return !!this.menuProps && this.split === true
    },

    shouldRenderMenu (): boolean {
      const { menuHidden } = this
      const { persistMenu, renderPersistedMenuHiddenOnMount } = this

      if (!menuHidden) {
        // Always should render a menu when it is expanded
        return true
      } else if (persistMenu && (false || renderPersistedMenuHiddenOnMount)) {
        // _renderedVisibleMenu ensures that the first rendering of
        // the menu happens on-screen, as edge's scrollbar calculations are off if done while hidden.
        return true
      }

      return false
    },

    classNames (): any {
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
          !!this.allowDisabledFocus,
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
          this.split,
        )
    },
  },

  render (h: CreateElement): VNode {
    const ButtonComponent = this.component
    const MenuComponent = this.MenuType
    const { classNames, href, iconProps, className, secondaryText, isSplitButton, menuProps, menuIconProps, shouldRenderMenu } = this

    return h(ButtonComponent, {
      ref: 'buttonElement',
      class: classNames.root,
      attrs: { href },
      on: {
        click: ev => {
          if (this.disabled) return
          this.$emit('click', ev)
        },
      },
    }, [
      h('span', { class: classNames.flexContainer }, [
        iconProps && h(Icon, {
          class: css(classNames.icon, className),
          props: iconProps,
        }),
        this.$scopedSlots.flex && this.$scopedSlots.flex({}),
        this.$scopedSlots.default && h('span', { class: classNames.textContainer }, [
          h('span', { class: classNames.label }, this.$scopedSlots.default({})),
          secondaryText && h('span', { class: classNames.description }, secondaryText),
        ]),
        (!isSplitButton && menuProps) && h(FontIcon, {
          class: classNames.menuIcon,
          attrs: {
            iconName: 'ChevronDown',
          },
          props: menuIconProps,
        }),
        (menuProps && !menuProps.doNotLayer && shouldRenderMenu) && h(MenuComponent, {
          class: css('ms-BaseButton-menuhost', menuProps.className),
          attrs: {
            directionalHint: DirectionalHint.bottomLeftEdge,
            target: isSplitButton ? this.$refs.splitButtonContainer : this.$refs.buttonElement,
          },
          props: menuProps,
          on: {
            dismiss: () => (this.menuHidden = true),
          },
        }),
      ]),
    ])
  },
})
