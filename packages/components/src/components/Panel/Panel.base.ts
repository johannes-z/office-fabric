import { EventGroup, allowOverscrollOnElement, allowScrollOnElement, classNamesFunction, css, divProperties, elementContains, getId, getNativeProps, getRTL } from '@fluentui-vue/utilities'
import { type PropType, type VNode, type VNodeArrayChildren, type VNodeRef, computed, defineComponent, h, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { FocusTrapZone, type IFocusTrapZoneProps, type ILayerProps, IconButton, Layer } from '..'
import { type IOverlayProps, Overlay } from '../Overlay'
import { type IPopupProps, Popup } from '../Popup'
import { type IPanelProps, type IPanelStyleProps, type IPanelStyles, PanelType } from '.'
import { makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IPanelStyleProps, IPanelStyles>()

enum PanelVisibilityState {
  closed,
  animatingOpen,
  open,
  animatingClosed,
}

type PanelSlotChildren = string | number | boolean | VNode | VNodeArrayChildren | undefined

const PANEL_DEFAULTS: Partial<IPanelProps> = {
  isLightDismiss: false,
  isOpen: false,
  isBlocking: false,
  hasCloseButton: true,
}

export const PanelBase = defineComponent({
  name: 'PanelBase',

  props: {
    ...makeStylingProps(),
    allowTouchBodyScroll: { type: Boolean, default: false },
    closeButtonAriaLabel: { type: String, default: null },
    elementToFocusOnDismiss: { type: Object as PropType<HTMLElement>, default: null },
    firstFocusableSelector: { type: String, default: null },
    focusTrapZoneProps: { type: Object as PropType<IFocusTrapZoneProps>, default: null },
    forceFocusInsideTrap: { type: Boolean, default: false },
    hasCloseButton: { type: Boolean, default: false },
    headerText: { type: String, default: null },
    headerClassName: { type: String, default: null },
    ignoreExternalFocusing: { type: Boolean, default: false },
    isBlocking: { type: Boolean, default: false },
    isFooterAtBottom: { type: Boolean, default: false },
    isHiddenOnDismiss: { type: Boolean, default: false },
    isLightDismiss: { type: Boolean, default: PANEL_DEFAULTS.isLightDismiss },
    layerProps: { type: Object as PropType<ILayerProps>, default: null },
    overlayProps: { type: Object as PropType<IOverlayProps>, default: null },
    popupProps: { type: Object as PropType<IPopupProps>, default: null },
    headerTextProps: { type: Object, default: {} },
    isOpen: { type: Boolean, default: PANEL_DEFAULTS.isOpen },
    type: { type: Number as PropType<PanelType>, default: 1 }, // PanelType.smallFixedFar
    customWidth: { type: String, default: null },
    onLightDismissClick: { type: Function as PropType<(ev?: Event | MouseEvent) => any>, default: null },
    onOpen: { type: Function as PropType<() => any>, default: null },
    onOpened: { type: Function as PropType<() => any>, default: null },
    onDismiss: { type: Function as PropType<(ev?: Event | KeyboardEvent) => any>, default: null },
    onDismissed: { type: Function as PropType<() => any>, default: null },
    onOuterClick: { type: Function as PropType<(ev?: Event | MouseEvent) => any>, default: null },
  },

  setup(props, { attrs, slots, expose }) {
    const {
      allowTouchBodyScroll,
      closeButtonAriaLabel,
      className,
      elementToFocusOnDismiss,
      /* eslint-disable deprecation/deprecation */
      firstFocusableSelector,
      focusTrapZoneProps,
      forceFocusInsideTrap,
      hasCloseButton,
      headerText,
      headerClassName,
      ignoreExternalFocusing,
      isBlocking,
      isFooterAtBottom,
      isLightDismiss,
      isHiddenOnDismiss,
      layerProps,
      overlayProps,
      popupProps,
      headerTextProps,
      isOpen,
      type,
      styles,
      theme,
      customWidth,
      onLightDismissClick,
      /* onRenderNavigation = this._onRenderNavigation,
        onRenderHeader = this._onRenderHeader,
        onRenderBody = this._onRenderBody,
        onRenderFooter = this._onRenderFooter, */
      onOpen,
      onOpened,
      onDismiss,
      onDismissed,
      onOuterClick,
    } = toRefs(props)

    const panel = ref<VNodeRef | null>(null)
    const scrollableContent = ref<VNodeRef | null>(null)

    const onAnimationFinishedTimer = ref<NodeJS.Timeout | null>(null)
    const events = ref<EventGroup>(new EventGroup({}))

    const isFooterSticky = ref(false)
    const visibility = ref(PanelVisibilityState.closed)
    const hasCustomNavigation = ref(false)

    const id = computed(() => getId('Panel'))

    const isLeft = computed(() => (!!(type.value === PanelType.smallFixedNear || type.value === PanelType.customNear)))
    const isRTL = computed(() => getRTL(theme.value))
    const isOnRightSide = computed(() => isRTL.value ? isLeft.value : !(isLeft.value))
    const customWidthStyles = computed(() => (type.value === PanelType.custom || type.value === PanelType.customNear ? { width: customWidth.value } : {}))
    const nativeProps = computed(() => getNativeProps(props, divProperties))
    const isActive = computed(() => (visibility.value === PanelVisibilityState.open || visibility.value === PanelVisibilityState.animatingOpen))
    const isPanelOpen = computed(() => isActive.value)
    const isAnimating = computed(() => (visibility.value === PanelVisibilityState.animatingClosed || visibility.value === PanelVisibilityState.animatingOpen))
    const shouldListenForOuterClick = computed(() => (!!isBlocking.value && !!isPanelOpen.value))

    const headerTextId = computed(() => (headerText.value ? (`${id.value}-headerText`) : undefined))

    const classNames = computed(() => getClassNames(styles.value!, {
      theme: theme.value!,
      className: className.value,
      focusTrapZoneClassName: focusTrapZoneProps.value ? focusTrapZoneProps.value.class : undefined,
      hasCloseButton: hasCloseButton.value,
      headerClassName: headerClassName.value,
      isAnimating: isAnimating.value,
      isFooterSticky: isFooterSticky.value,
      isFooterAtBottom: isFooterAtBottom.value,
      isOnRightSide: isOnRightSide.value,
      isOpen: isPanelOpen.value,
      isHiddenOnDismiss: isHiddenOnDismiss.value,
      type: type.value,
      hasCustomNavigation: hasCustomNavigation.value,
    }))

    const mergedLayerProps = computed(() => {
      return {
        eventBubblingEnabled: true,
        ...layerProps.value,
      } as ILayerProps
    })

    // Allow the user to scroll within the modal but not on the body
    const allowScrollOnPanel = () => {
      if (panel.value) {
        if (allowTouchBodyScroll.value)
          allowOverscrollOnElement(panel.value, events.value as EventGroup)

        else
          allowScrollOnElement(panel.value, events.value as EventGroup)
      }
      else {
        events.value.off(scrollableContent.value)
      }
      scrollableContent.value = panel.value
    }

    onMounted(() => {
      // Call allowScrollOnPanel when the component is mounted
      allowScrollOnPanel()

      events.value.on(window, 'resize', updateFooterPosition)
      if (shouldListenForOuterClick.value)
        events.value.on(document.body, 'mousedown', dismissOnOuterClick, true)

      if (isPanelOpen.value)
        visibility.value = PanelVisibilityState.animatingOpen
    })

    onBeforeUnmount(() => {
      if (onAnimationFinishedTimer.value)
        clearTimeout(onAnimationFinishedTimer.value)

      events.value.dispose()
    })

    watch([isOpen, visibility], (newValue, oldValue) => {
      const nextIsOpen = newValue[0]
      const prevVisibility = oldValue[1]

      if (nextIsOpen === undefined)
        return null // no state update

      if (nextIsOpen && (prevVisibility === PanelVisibilityState.closed || prevVisibility === PanelVisibilityState.animatingClosed))
        visibility.value = PanelVisibilityState.animatingOpen

      if (!nextIsOpen && (prevVisibility === PanelVisibilityState.open || prevVisibility === PanelVisibilityState.animatingOpen))
        visibility.value = PanelVisibilityState.animatingClosed
    })

    watch([shouldListenForOuterClick, visibility], (newValue, oldValue) => {
      const shouldListenOnOuterClick = newValue[0]
      const previousShouldListenOnOuterClick = oldValue[0]

      if (visibility.value !== oldValue[1]) {
        clearExistingAnimationTimer()
        if (visibility.value === PanelVisibilityState.animatingOpen)
          animateTo(PanelVisibilityState.open)

        else if (visibility.value === PanelVisibilityState.animatingClosed)
          animateTo(PanelVisibilityState.closed)
      }

      if (shouldListenOnOuterClick && !previousShouldListenOnOuterClick)
        events.value.on(document.body, 'mousedown', dismissOnOuterClick, true)

      else if (!shouldListenOnOuterClick && previousShouldListenOnOuterClick)
        events.value.off(document.body, 'mousedown', dismissOnOuterClick, true)
    })

    // RENDER FUNCTIONS
    const onRenderNavigation = (): PanelSlotChildren => {
      if (!slots?.navigation && !hasCloseButton.value)
        return undefined

      if (slots?.navigation)
        return slots?.navigation?.(props, onRenderNavigation)

      return h('div', {
        className: classNames.value.navigation,
      }, onRenderNavigationContent())
    }

    const onRenderNavigationContent = (): PanelSlotChildren => {
      if (slots?.navigationContent)
        return slots?.navigationContent?.(props, onRenderNavigationContent)

      if (hasCloseButton.value) {
        const iconButtonStyles = classNames.value.subComponentStyles?.closeButton()
        return [
          !hasCustomNavigation.value && onRenderHeader(),
          h(IconButton, {
            styles: iconButtonStyles,
            className: classNames.value.closeButton,
            onClick: onPanelClick,
            ariaLabel: closeButtonAriaLabel.value,
            title: closeButtonAriaLabel.value,
            'data-is-visible': true,
            iconProps: {
              iconName: 'Cancel',
            },
          }),
        ]
      }
      return undefined
    }

    const onRenderHeader = (): PanelSlotChildren => {
      if (slots?.header)
        return slots?.header?.(props, onRenderHeader)

      if (headerText.value) {
        return h('div', {
          className: classNames.value.header,
        }, [
          h('div', {
            id: headerTextId.value,
            role: 'heading',
            'aria-level': 1,
            ...headerTextProps.value,
            className: css(classNames.value.headerText, headerTextProps.value.className),
          }, headerText.value),
        ])
      }
      return undefined
    }

    const onRenderBody = (): PanelSlotChildren => {
      if (slots?.body)
        return slots?.body?.(props, onRenderBody)

      return h('div', {
        className: classNames.value.content,
      }, slots?.default?.())
    }

    const onRenderFooter = (): PanelSlotChildren => {
      if (slots?.footer) {
        return h('div', {
          className: classNames.value.footer,
        }, [
          h('div', {
            className: classNames.value.footerInner,
          }, slots?.footer?.(props)),
        ])
      }
      return undefined
    }

    // OPEN / CLOSE
    const open = () => {
      if (isPanelOpen.value === true)
        return

      if (isActive.value)
        return

      visibility.value = PanelVisibilityState.animatingOpen
    }

    const close = () => {
      if (isPanelOpen.value === false)
        return

      if (!isActive.value)
        return

      visibility.value = PanelVisibilityState.animatingClosed
    }

    const dismiss = (ev?: Event | KeyboardEvent): void => {
      if (onDismiss.value && isActive.value)
        onDismiss.value(ev)

      if (!ev || (ev && !ev.defaultPrevented))
        close()
    }

    const updateFooterPosition = () => {
      if (scrollableContent.value) {
        const height = scrollableContent.value.clientHeight
        const innerHeight = scrollableContent.value.scrollHeight
        isFooterSticky.value = height < innerHeight
      }
    }

    const dismissOnOuterClick = (ev: MouseEvent) => {
      if (isActive.value && panel.value && !ev.defaultPrevented) {
        if (!elementContains(panel.value, ev.target as HTMLElement)) {
          if (onOuterClick.value)
            onOuterClick.value(ev)

          else
            dismiss(ev)
        }
      }
    }

    const animateTo = (newVisibilityState: PanelVisibilityState) => {
      if (newVisibilityState === PanelVisibilityState.open && onOpen.value)
        onOpen.value()

      onAnimationFinishedTimer.value = setTimeout(() => {
        visibility.value = newVisibilityState
        onTransitionComplete(newVisibilityState)
      }, 200)
    }

    const clearExistingAnimationTimer = (): void => {
      if (onAnimationFinishedTimer.value !== null)
        clearTimeout(onAnimationFinishedTimer.value)
    }

    const onPanelClick = (ev?: any): void => {
      dismiss(ev)
    }

    const onTransitionComplete = (newVisibilityState: PanelVisibilityState) => {
      updateFooterPosition()
      if (newVisibilityState === PanelVisibilityState.open && onOpened.value)
        onOpened.value()

      if (newVisibilityState === PanelVisibilityState.closed && onDismissed.value)
        onDismissed.value()
    }

    expose({
      open,
      close,
    })

    return () => {
      if (visibility.value === PanelVisibilityState.closed)
        return

      return h(Layer, {
        ...mergedLayerProps.value,
      }, () => [
        h(Popup, {
          role: 'dialog',
          'aria-modal': isBlocking.value ? 'true' : undefined,
          ariaLabelledBy: headerTextId.value ? headerTextId.value : undefined,
          onDismiss: dismiss,
          className: classNames.value.hiddenPanel,
          enableAriaHiddenSiblings: !!isPanelOpen.value,
          ...popupProps.value,
        }, [
          h('div', {
            'aria-hidden': !isPanelOpen.value && isAnimating.value,
            ...nativeProps.value,
            ref: panel,
            class: classNames.value.root,
          }, [
            isBlocking.value && isPanelOpen.value && h(Overlay, {
              className: classNames.value.overlay,
              isDarkThemed: false,
              onClick: isLightDismiss.value ? (onLightDismissClick.value ? onLightDismissClick.value : onPanelClick) : undefined,
              allowTouchBodyScroll: allowTouchBodyScroll.value,
              ...overlayProps.value,
            }),
            h(FocusTrapZone, {
              ignoreExternalFocusing: ignoreExternalFocusing.value,
              forceFocusInsideTrap: !isBlocking.value || (isHiddenOnDismiss.value && !isPanelOpen.value) ? false : forceFocusInsideTrap.value,
              firstFocusableSelector: firstFocusableSelector.value,
              isClickableOutsideFocusTrap: true,
              ...focusTrapZoneProps.value,
              className: classNames.value.main,
              style: customWidthStyles.value,
              elementToFocusOnDismiss: elementToFocusOnDismiss.value,
            }, [
              h('div', {
                className: classNames.value.contentInner,
              }, [
                h('div', {
                  className: classNames.value.scrollableContent,
                  ref: scrollableContent,
                  'data-is-scrollable': true,
                }, [
                  h('div', {
                    className: classNames.value.commands,
                    'data-is-visible': true,
                  }, onRenderNavigation()),
                  hasCustomNavigation.value || !hasCloseButton.value && onRenderHeader(),
                  onRenderBody(),
                  onRenderFooter(),
                ]),
              ]),
            ]),
          ]),
        ]),
      ])
    }
  },
})
