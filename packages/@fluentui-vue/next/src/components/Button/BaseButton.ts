import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'
// import { ContextualMenu, DirectionalHint } from '../ContextualMenu'
import { Icon } from '../Icon'
import { FontIcon } from '../Icon/FontIcon'
import { getBaseButtonClassNames } from './Button.classNames'
import { useBaseButtonProps } from './useBaseButton'
import { asSlotProps, useStylingProps } from '@/utils'

export const BaseButton = defineComponent({
  name: 'BaseButton',

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),

    primaryDisabled: { type: Boolean, default: false },

    secondaryText: { type: String, default: undefined },

    iconProps: { type: Object, default: undefined },
    hasMenu: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
    split: { type: Boolean, default: false },

    menuIconProps: { type: Object, default: undefined },
    menuProps: { type: Object, default: undefined },
  },

  data() {
    return {
      showMenu: false,
    }
  },

  created() {
    window.addEventListener('resize', this.hideMenu)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.hideMenu)
  },

  methods: {
    hideMenu() {
      this.showMenu = false
    },
  },

  render(): VNode {
    const {
      styles,
      className,
      text,
      href,
      variantClassName,
      iconProps,
      menuIconProps,
      menuProps,
      disabled,
      primaryDisabled,
      checked,
      split,
      secondaryText,
    } = this

    const isPrimaryButtonDisabled = disabled || primaryDisabled

    // State
    const menuHidden = true

    const classNames = getBaseButtonClassNames(
      null,
      styles,
      className,
      variantClassName,
      iconProps && iconProps.className,
      menuIconProps && menuIconProps.className,
      isPrimaryButtonDisabled!,
      !!menuProps,
      checked!,
      !menuHidden,
      split,
    )

    const slotProps = asSlotProps({
      root: {
        ref: 'root',
        href,
        class: classNames.root,
        // onClick: (ev) => {
        //   if (disabled)
        //     return
        //   console.log('BaseButton > click')
        //   this.showMenu = !this.showMenu
        //   this.$emit('click', ev)
        // },
      },
      flexContainer: {
        class: classNames.flexContainer,
      },
      textContainer: {
        class: classNames.textContainer,
      },
      label: {
        class: classNames.label,
      },
      description: {
        class: classNames.description,
      },
    })

    const renderAsAnchor: boolean = !isPrimaryButtonDisabled && !!href
    const tag = renderAsAnchor ? 'a' : 'button'

    const renderIcon = () => {
      if (iconProps && (iconProps.iconName !== undefined || iconProps.imageProps)) {
        const { className, imageProps, ...rest } = iconProps

        // If the styles prop is specified as part of iconProps, fall back to regular Icon as FontIcon and ImageIcon
        // do not have this prop.
        if (iconProps.styles) {
          return h(Icon, {
            class: [classNames.icon, className].filter(e => e).join(''),
            props: iconProps,
          })
        }
        if (iconProps.iconName) {
          return h(FontIcon, {
            class: [classNames.icon, className].filter(e => e).join(''),
            ...rest,
          })
        }
      // TODO not implemented
      // if (imageProps) {
      //   return <ImageIcon className={css(this._classNames.icon, className)} imageProps={imageProps} {...rest} />;
      // }
      }
      return null
    }

    const getMenuProps = (menuProps) => {
      return {
        props: {
          // directionalHint: DirectionalHint.bottomLeftEdge,
          ...menuProps,
          className: menuProps.className,
          target: this.$refs.root,
        },
        on: {
          dismiss: (ev) => {
            this.showMenu = false
          },
        },
      }
    }

    const onRenderMenuIcon = (): VNode | null => {
      return h(FontIcon, {
        class: classNames.menuIcon,
        props: {
          iconName: 'ChevronDown',
          ...menuIconProps,
        },
      })
    }

    const onRenderMenu = (menuProps): VNode | null => {
      // return h(ContextualMenu, menuProps)
    }

    const hasContent = this.$slots.default || text

    return h(tag, slotProps.root, [
      h('span', slotProps.flexContainer, [
        renderIcon(),
        hasContent && h('span', slotProps.textContainer, [
          h('span', slotProps.label, this.$slots.default?.({}) || text),
          secondaryText && h('span', slotProps.description, secondaryText),
        ]),
        // (menuProps || menuIconProps) && onRenderMenuIcon(),
        // menuProps && !menuProps.doNotLayer && this.showMenu && onRenderMenu(getMenuProps(menuProps)),
      ]),
    ])
  },
})
