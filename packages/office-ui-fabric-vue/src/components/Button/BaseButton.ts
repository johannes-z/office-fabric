import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { getBaseButtonClassNames, IButtonClassNames } from './BaseButton.classNames'
import { Icon, FontIcon } from '../Icon'
import { ITheme } from '@uifabric/styling'
import { DirectionalHint } from '../../common/DirectionalHint'
import { ContextualMenu } from '../ContextualMenu'
import { IButtonProps } from './Button.types'
import { CreateElement } from 'vue'

const TouchIdleDelay = 500 /* ms */

/**
 * {@docCategory Button}
 */
export interface IBaseButtonProps extends IButtonProps {
  baseClassName?: string;
  variantClassName?: string;
}

@Component
export class BaseButton extends BaseComponent<IBaseButtonProps> {
  @Prop({ type: String, default: null }) href!: string
  @Prop({ type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: false }) split!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) primaryDisabled!: boolean
  @Prop({ type: Boolean, default: false }) allowDisabledFocus!: boolean
  @Prop({ type: String, default: null }) variantClassName!: string
  @Prop({ type: Object, default: () => {} }) iconProps!: any
  @Prop({ type: Object, default: () => {} }) menuIconProps!: any
  @Prop({ type: Object, default: null }) menuAs!: any
  @Prop({ type: Object, default: null }) menuProps!: any
  @Prop({ type: Boolean, default: false }) persistMenu!: boolean
  @Prop({ type: Boolean, default: false }) renderPersistedMenuHiddenOnMount!: boolean
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
  menuOpen: boolean = false

  get MenuType () {
    return this.menuAs || ContextualMenu
  }

  get component (): 'a' | 'button' {
    const { disabled, href } = this
    const renderAsAnchor: boolean = !disabled && !!href
    return renderAsAnchor ? 'a' : 'button'
  }

  get isSplitButton (): boolean {
    return !!this.menuProps && this.split === true
  }

  get shouldRenderMenu (): boolean {
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
  }

  render (h: CreateElement) {
    const ButtonComponent = this.component
    const MenuComponent = this.MenuType
    const { classNames, href, iconProps, className, css, secondaryText, isSplitButton, menuProps, menuIconProps, shouldRenderMenu } = this

    return h(ButtonComponent, {
      ref: 'buttonElement',
      class: classNames.root,
      attrs: { href },
      on: {
        click: ev => this.$emit('click', ev),
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
  }
}
