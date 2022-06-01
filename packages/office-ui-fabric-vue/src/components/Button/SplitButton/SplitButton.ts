import { withThemeableProps } from '@/useThemeable'
import Vue, { CreateElement, VNode } from 'vue'
import { BaseButton } from '../BaseButton'
import { IButtonStyles } from '../Button.types'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { getSplitButtonClassNames as getBaseSplitButtonClassNames, ISplitButtonClassNames } from './SplitButton.classNames'
import { getStyles } from './SplitButton.styles'

export const SplitButton = Vue.extend({
  props: {
    ...withThemeableProps(),
    disabled: { type: Boolean, default: false },
    menuHidden: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    allowDisabledFocus: { type: Boolean, default: false },

    splitButtonMenuProps: { type: Object, default: () => {} },
    menuIconProps: { type: Object, default: () => ({ iconName: 'ChevronDown' }) },
    getSplitButtonClassNames: { type: Function, default: undefined },
  },

  computed: {
    internalStyles (): IButtonStyles {
      const { theme } = this
      return getStyles(theme, this.styles)
    },
    classNames (): ISplitButtonClassNames {
      const { styles = {}, disabled, menuHidden, checked, allowDisabledFocus, getSplitButtonClassNames } = this
      return getSplitButtonClassNames
        ? getSplitButtonClassNames(!!disabled, !menuHidden, !!checked, !!allowDisabledFocus)
        : getBaseSplitButtonClassNames(styles, !!disabled, !menuHidden, !!checked, !!allowDisabledFocus)
    },
  },

  render (h: CreateElement): VNode {
    const { classNames, splitButtonMenuProps, checked, disabled, allowDisabledFocus, menuIconProps } = this

    const splitButtonProps = {
      ...splitButtonMenuProps,
      styles: classNames,
      checked: checked,
      disabled: disabled,
      allowDisabledFocus: allowDisabledFocus,
      // onClick: this._onMenuClick,
      menuProps: undefined,
      iconProps: { ...menuIconProps },
      // ariaLabel: splitButtonAriaLabel,
      // 'aria-haspopup': true,
      // 'aria-expanded': !menuHidden,
      // 'data-is-focusable': false,
    }

    const $splitButtonMenuProps = h(BaseButton, {
      attrs: {
        ...this.$props,
        ...this.$attrs,
      },
      props: splitButtonProps,
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    })

    const $splitButtonDivider = classNames && classNames.divider
      ? h('span', {
        class: classNames.divider,
      })
      : null

    return h('div', {
      attrs: {

      },
    }, [
      h('span', {
        staticStyle: {
          display: 'flex',
        },
      }, [
        $splitButtonMenuProps,
        $splitButtonDivider,
        // this.$scopedSlots.default?.({}),
      ]),
    ])
  },
})
