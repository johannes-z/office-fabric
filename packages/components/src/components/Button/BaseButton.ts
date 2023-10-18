import { type VNode, computed, onBeforeMount, onBeforeUnmount, ref, toRefs } from 'vue'
import { defineComponent, h } from 'vue'

// import { ContextualMenu, DirectionalHint } from '../ContextualMenu'
import { RouterLink } from 'vue-router'
import { setFocusVisibility } from '@fluentui-vue/utilities'
import { Icon } from '../Icon'
import { FontIcon } from '../Icon/FontIcon'
import { ContextualMenu } from '../ContextualMenu'
import { getBaseButtonClassNames } from './BaseButton.classNames'
import { useBaseButtonProps } from './useBaseButton'
import type { IButtonStyles } from './Button.types'
import { asSlotProps, makeStylingProps } from '@/utils'
import { makeRouterProps } from '@/composables'
import { useSlotHelpers } from '@/composables/useSlotHelpers'

export const BaseButton = defineComponent({
  name: 'BaseButton',

  props: {
    ...makeStylingProps(),
    ...useBaseButtonProps(),
    ...makeRouterProps(),

    allowDisabledFocus: { type: Boolean, default: false },
    primaryDisabled: { type: Boolean, default: false },

    secondaryText: { type: String, default: undefined },

    iconProps: { type: Object, default: undefined },
    hasMenu: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
    split: { type: Boolean, default: false },
    router: { type: Boolean, default: false },

    menuIconProps: { type: Object, default: undefined },
    menuProps: { type: Object, default: undefined },
  },

  setup(props, { attrs, expose, slots }) {
    const showMenu = ref(false)
    const rootRef = ref<HTMLElement | null>(null)

    const hideMenu = () => (showMenu.value = false)
    const focus = () => {
      setFocusVisibility(true, undefined)
      rootRef.value?.focus?.()
    }

    expose({
      focus,
    })

    onBeforeMount(() => {
      window.addEventListener('resize', hideMenu)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', hideMenu)
    })

    const {
      theme,
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
      to,
      exact,
      replace,
      getClassNames,
      allowDisabledFocus,
    } = toRefs(props)

    const isPrimaryButtonDisabled = computed(() => disabled.value || primaryDisabled.value)

    const menuHidden = ref(true)

    const classNames = computed(() => getClassNames.value
      ? getClassNames.value(
        theme.value!,
        className.value || attrs.class,
        variantClassName.value!,
        iconProps.value && iconProps.value.className,
        menuIconProps.value && menuIconProps.value.className,
        isPrimaryButtonDisabled.value!,
        checked.value!,
        !menuHidden.value,
        !!menuProps.value,
        split.value,
        !!allowDisabledFocus.value,
      )
      : getBaseButtonClassNames(
        theme.value!,
        styles.value as IButtonStyles,
        className.value || attrs.class as string,
        variantClassName.value!,
        iconProps.value && iconProps.value.className,
        menuIconProps.value && menuIconProps.value.className,
        isPrimaryButtonDisabled.value!,
        !!menuProps.value,
        checked.value!,
        !menuHidden.value,
        split.value,
      ))

    const slotProps = computed(() => asSlotProps({
      root: {
        ref: rootRef,
        href: href.value,
        class: classNames.value.root,
        onClick: (ev) => {
          if (props.defaultStopClickPropagation)
            ev.stopPropagation()
          if (disabled.value)
            return
          showMenu.value = !showMenu.value
          props.onClick?.(ev)
        },
        ...to.value && {
          href: disabled.value ? undefined : href.value,
          to: disabled.value ? undefined : to.value,
          exact: exact.value,
          replace: replace.value,
        },
      },
      flexContainer: {
        class: classNames.value.flexContainer,
      },
      textContainer: {
        class: classNames.value.textContainer,
      },
      label: {
        class: classNames.value.label,
      },
      description: {
        class: classNames.value.description,
      },
    }))

    const renderAsAnchor = computed(() => !isPrimaryButtonDisabled.value && !!href.value)
    const RootElement = computed(() => renderAsAnchor.value ? (to.value ? RouterLink : 'a') : 'button')

    const onRenderIcon = () => {
      if (iconProps.value && (iconProps.value.iconName !== undefined || iconProps.value.imageProps)) {
        const { className, imageProps, ...rest } = iconProps.value

        // If the styles prop is specified as part of iconProps, fall back to regular Icon as FontIcon and ImageIcon
        // do not have this prop.
        if (iconProps.value.styles) {
          return h(Icon, {
            class: [classNames.value.icon, className].filter(e => e).join(''),
            props: iconProps.value,
          })
        }
        if (iconProps.value.iconName) {
          return h(FontIcon, {
            class: [classNames.value.icon, className].filter(e => e).join(''),
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
        // directionalHint: DirectionalHint.bottomLeftEdge,
        ...menuProps,
        className: menuProps.className,
        target: rootRef.value,
        onDismiss: (ev) => {
          showMenu.value = false
        },
      }
    }

    const onRenderMenuIcon = (): VNode | null => {
      return h(FontIcon, {
        class: classNames.value.menuIcon,
        iconName: 'ChevronDown',
        ...menuIconProps.value,
      })
    }

    const {
      slotContent,
      isText,
      renderSlot,
    } = useSlotHelpers(slots, 'default')

    const onRenderMenu = (menuProps): VNode | null => {
      return h(ContextualMenu, menuProps)
    }

    const onRenderTextContents = () => {
      const children = () => [
        onRenderText(),
        onRenderDescription(),
      ]
      if (text.value || isText.value || secondaryText.value)
        return h('span', slotProps.value.textContainer, children())

      return children()
    }

    const onRenderText = () => {
      let text: any = props.text

      if (text === undefined && isText.value)
        text = slotContent.value

      if (props.text == null && !isText.value && !slots.text)
        return null

      return h('span', slotProps.value.label, slots.text?.({}) || text)
    }

    const onRenderDescription = () => {
      return secondaryText.value
        ? h('span', slotProps.value.description, slots.description?.({}) || secondaryText.value)
        : null
    }

    const onRenderChildren = () => {
      if (isText.value)
        return null

      return renderSlot()
    }

    const $tagContent = () => [
      h('span', slotProps.value.flexContainer, [
        // onRenderIcon
        onRenderIcon(),
        // onRenderTextContents
        onRenderTextContents(),
        // onRenderChildren
        onRenderChildren(),
        // onRenderMenuIcon
        (menuProps.value || menuIconProps.value) && (slots.renderMenuIcon || onRenderMenuIcon)(),
        // onRenderMenu
        menuProps.value && !menuProps.value.doNotLayer && showMenu.value && onRenderMenu(getMenuProps(menuProps.value)),
      ]),
    ]

    return () => h(RootElement.value, slotProps.value.root, RootElement.value === RouterLink
      ? $tagContent
      : $tagContent(),
    )
  },
})
