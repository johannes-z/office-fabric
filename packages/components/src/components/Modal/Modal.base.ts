import { DirectionalHint, classNamesFunction, elementContains, getId, getWindow, allowScrollOnElement, allowOverscrollOnElement, EventGroup, css } from '@fluentui-vue/utilities'
import { defineComponent, h, toRefs, type PropType, computed, ref, onMounted, onBeforeUnmount, watch, onUnmounted, type VNodeRef } from 'vue'
import { Icon } from '../Icon'
import type { ILayerProps } from '../Layer'
import { Layer } from '../Layer'
import { Overlay, type IOverlayProps } from '../Overlay'
import { Popup, type IPopupProps } from '../Popup'
import type { IDragOptions, IModalProps, IModalStyleProps, IModalStyles } from './Modal.types'
import { ResponsiveMode, makeStylingProps } from '@/utils'
import { DraggableZone, type ICoordinates, type IDragData } from '@/utils/DraggableZone'
import { FocusTrapZone, type IFocusTrapZoneProps } from '..'
import { animationDuration } from './Modal.styles';
import { useSlotHelpers } from '@/composables'

const ZERO: ICoordinates = { x: 0, y: 0 };

const DEFAULT_PROPS: IModalProps = {
  isOpen: false,
  isDarkOverlay: true,
  className: '',
  containerClassName: '',
  enableAriaHiddenSiblings: true,
};

const getClassNames = classNamesFunction<IModalStyleProps, IModalStyles>();

const getMoveDelta = (ev: KeyboardEvent): number => {
  let delta = 10;
  if (ev.shiftKey) {
    if (!ev.ctrlKey) {
      delta = 50;
    }
  } else if (ev.ctrlKey) {
    delta = 1;
  }

  return delta;
};

const DefaultLayerProps: ILayerProps = {
  eventBubblingEnabled: false,
}

export const ModalBase = defineComponent({
  name: 'ModalBase',

  props: {
    ...makeStylingProps(),

    allowTouchBodyScroll: { type: Boolean, default: false },
    containerClassName: { type: String, default: null },
    scrollableContentClassName: { type: String, default: null },
    elementToFocusOnDismiss: { type: Object as any, default: null },
    firstFocusableSelector: { type: String, default: null },
    focusTrapZoneProps: { type: Object as PropType<IFocusTrapZoneProps>, default: null },
    forceFocusInsideTrap: { type: Boolean, default: false },
    ignoreExternalFocusing: { type: Boolean, default: false },
    isBlocking: { type: Boolean, default: false },
    isAlert: { type: Boolean, default: false },
    isClickableOutsideFocusTrap: { type: Boolean, default: false },
    isDarkOverlay: { type: Boolean, default: DEFAULT_PROPS.isDarkOverlay },
    onDismiss: { type: Function, default: null },
    layerProps: { type: Object as PropType<ILayerProps>, default: null },
    overlay: { type: Object as PropType<IOverlayProps>, default: null },
    isOpen: { type: Boolean, default: DEFAULT_PROPS.isOpen },
    titleAriaId: { type: String, default: null },
    subtitleAriaId: { type: String, default: null },
    topOffsetFixed: { type: Boolean, default: false },
    responsiveMode: { type: Number as PropType<ResponsiveMode>, default: ResponsiveMode.large },
    onLayerDidMount: { type: Function as PropType<() => void>, default: null },
    isModeless: { type: Boolean, default: false },
    dragOptions: { type: Object as PropType<IDragOptions>, default: null },
    onDismissed: { type: Function, default: null },
    enableAriaHiddenSiblings: { type: Boolean, default: DEFAULT_PROPS.enableAriaHiddenSiblings },
    popupProps: { type: Object as PropType<IPopupProps>, default: null },
  },

  setup(props, { attrs, slots, emit }) {
    const {
      allowTouchBodyScroll,
      className,
      //children,
      containerClassName,
      scrollableContentClassName,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      focusTrapZoneProps,
      forceFocusInsideTrap,
      ignoreExternalFocusing,
      isBlocking,
      isAlert,
      isClickableOutsideFocusTrap,
      isDarkOverlay,
      onDismiss,
      layerProps,
      overlay,
      isOpen,
      titleAriaId,
      styles,
      subtitleAriaId,
      theme,
      topOffsetFixed,
      responsiveMode,
      // eslint-disable-next-line deprecation/deprecation
      onLayerDidMount,
      isModeless,
      dragOptions,
      onDismissed,
      // eslint-disable-next-line deprecation/deprecation
      enableAriaHiddenSiblings,
      popupProps,
    } = toRefs(props);

    const disableRestoreFocus = computed(() => ignoreExternalFocusing.value)

    const modal = ref<VNodeRef | null>(null)
    const root = ref<VNodeRef | null>(null)

    const focusTrapZoneId = getId('ModalFocusTrapZone', (attrs as any).id);

    const win = getWindow()

    const isModalOpen = ref(isOpen.value)
    const isInKeyboardMoveMode = ref(false)
    const isVisible = ref(isOpen.value)
    const coordinates = ref(ZERO)
    const modalRectangleTop = ref<number|undefined>(undefined)
    const isModalMenuOpen = ref(false)
    const onModalCloseTimer = ref<NodeJS.Timeout|null>(null)
    const allowTouchBodyScrollInternal = ref(allowTouchBodyScroll.value)
    const scrollableContent = ref<HTMLElement | null>(null)
    const lastSetCoordinates = ref(ZERO)
    const events = ref<EventGroup>(new EventGroup({}))
    const hasBeenOpened = ref(false)

    const minPosition = ref<ICoordinates | undefined>(undefined)
    const maxPosition = ref<ICoordinates | undefined>(undefined)

    const keepInBounds = computed(() => (dragOptions.value || ({} as IDragOptions)).keepInBounds)
    const isAlertRole = computed(() => isAlert.value || isBlocking.value || isModeless.value)

    const disposeOnKeyUp = ref<(() => void) | null>(null)
    const disposeOnKeyDown = ref<(() => void) | null>(null)

    const layerClassName = computed(() => (layerProps.value === undefined || layerProps.value === null) ? '' : layerProps.value.className);
    const classNames = computed(() => getClassNames(styles.value, {
        theme: theme.value!,
        className: className.value,
        containerClassName: containerClassName.value,
        scrollableContentClassName: scrollableContentClassName.value,
        isOpen: isOpen.value,
        isVisible: isVisible.value,
        hasBeenOpened: hasBeenOpened.value,
        modalRectangleTop: modalRectangleTop.value,
        topOffsetFixed: topOffsetFixed.value,
        isModeless: isModeless.value,
        layerClassName: layerClassName.value,
        windowInnerHeight: win?.innerHeight,
        isDefaultDragHandle: dragOptions.value && !dragOptions.value.dragHandleSelector,
      })
    );

    const mergedLayerProps = computed(() => {
      return {
        eventBubblingEnabled: true,
        ...layerProps.value,
        onLayerDidMount: layerProps.value && layerProps.value.onLayerDidMount ? layerProps.value.onLayerDidMount : onLayerDidMount.value,
        insertFirst: layerProps.value?.insertFirst || isModeless.value,
        className: classNames.value.layer,
      } as ILayerProps
    });

    // Allow the user to scroll within the modal but not on the body
    const allowScrollOnModal = () => {
      if (modal.value) {
        if (allowTouchBodyScroll.value) {
          allowOverscrollOnElement(modal.value, events.value as EventGroup);
        } else {
          allowScrollOnElement(modal.value, events.value as EventGroup);
        }
      } else {
        events.value.off(scrollableContent.value);
      }
      scrollableContent.value = modal.value;
    };

    onMounted(() => {
      // Call allowScrollOnModal when the component is mounted
      allowScrollOnModal();
    });

    const registerInitialModalPosition = (): void => {
      const dialogMain = getFocusTrapZone();
      const modalRectangle = dialogMain?.getBoundingClientRect();

      if (modalRectangle) {
        if (topOffsetFixed.value) {
          modalRectangleTop.value = modalRectangle.top;
        }

        if (keepInBounds.value) {
          // x/y are unavailable in IE, so use the equivalent left/top
          minPosition.value = { x: -modalRectangle.left, y: -modalRectangle.top };
          maxPosition.value = { x: modalRectangle.left, y: modalRectangle.top };
        }
      }
    };

    /**
     * Clamps an axis to a specified min and max position.
     *
     * @param axis A string that represents the axis (x/y).
     * @param position The position on the axis.
     */
    const getClampedAxis = (axis: keyof ICoordinates, position: number) => {
      if (keepInBounds.value && minPosition.value && maxPosition.value) {
        position = Math.max(minPosition.value[axis], position);
        position = Math.min(maxPosition.value[axis], position);
      }

      return position;
    };

    const handleModalClose = (): void => {
      lastSetCoordinates.value = ZERO;

      isModalMenuOpen.value = false;
      isModalOpen.value = false;
      isInKeyboardMoveMode.value = false;
      coordinates.value = ZERO;

      disposeOnKeyUp.value?.();

      onDismissed.value?.();
    };

    const handleDragStart = (): void => {
      isModalMenuOpen.value = false;
      isInKeyboardMoveMode.value = false;
    };

    const handleDrag = (event:MouseEvent & TouchEvent, dragData:IDragData): void => {
      coordinates.value = {
        x: getClampedAxis('x', dragData.position.x),
        y: getClampedAxis('y', dragData.position.y),
      };
    };

    const getFocusTrapZone = (): HTMLElement | null => {
      if(!focusTrapZoneId) return null;
      return document.getElementById(focusTrapZoneId);
    }

    const handleDragStop = (): void => {
      if(getFocusTrapZone())
        getFocusTrapZone()?.focus();
    }

    const handleEnterKeyboardMoveMode = () => {
      // We need a global handleKeyDown event when we are in the move mode so that we can
      // handle the key presses and the components inside the modal do not get the events
      const handleKeyDown = (ev: KeyboardEvent): void => {
        // eslint-disable-next-line deprecation/deprecation
        if (ev.altKey && ev.ctrlKey && ev.key === " ") {
          // CTRL + ALT + SPACE is handled during keyUp
          ev.preventDefault();
          ev.stopPropagation();
          return;
        }

        // eslint-disable-next-line deprecation/deprecation
        const newLocal = ev.altKey || ev.key === "Escape";
        if (isModalMenuOpen && newLocal) {
          isModalMenuOpen.value = false;
        }

        // eslint-disable-next-line deprecation/deprecation
        if (isInKeyboardMoveMode.value && (ev.key === "Escape" || ev.key === "Enter")) {
          isInKeyboardMoveMode.value = false;
          ev.preventDefault();
          ev.stopPropagation();
        }

        if (isInKeyboardMoveMode.value) {
          let handledEvent = true;
          const delta = getMoveDelta(ev);

          // eslint-disable-next-line deprecation/deprecation
          switch (ev.key) {
            /* eslint-disable no-fallthrough */
            case "Escape":
              coordinates.value = lastSetCoordinates.value
            case "Enter": {
              // TODO: determine if fallthrough was intentional
              /* eslint-enable no-fallthrough */
              lastSetCoordinates.value = ZERO;
              // setIsInKeyboardMoveMode(false);
              break;
            }
            case "ArrowUp": {
              coordinates.value = { x: coordinates.value.x, y: getClampedAxis('y', coordinates.value.y - delta) };
              break;
            }
            case "ArrowDown": {
              coordinates.value = { x: coordinates.value.x, y: getClampedAxis('y', coordinates.value.y + delta) };
              break;
            }
            case "ArrowLeft": {
              coordinates.value = { x: getClampedAxis('x', coordinates.value.x - delta), y: coordinates.value.y };
              break;
            }
            case "ArrowRight": {
              coordinates.value = { x: getClampedAxis('x', coordinates.value.x + delta), y: coordinates.value.y };
              break;
            }
            default: {
              handledEvent = false;
            }
          }
          if (handledEvent) {
            ev.preventDefault();
            ev.stopPropagation();
          }
        }
      };

      lastSetCoordinates.value = coordinates.value;
      isModalMenuOpen.value = false;
      isInKeyboardMoveMode.value = true;

      events.value.on(win, 'keydown', handleKeyDown, true /* useCapture */);
      disposeOnKeyDown.value = () => {
        events.value.off(win, 'keydown', handleKeyDown, true /* useCapture */);
        disposeOnKeyDown.value = null;
      };
    };

    const handleExitKeyboardMoveMode = (ev: FocusEvent) => {
      focusTrapZoneProps.value?.onBlur?.(ev);
      lastSetCoordinates.value = ZERO;
      isInKeyboardMoveMode.value = false;
      disposeOnKeyDown.value?.();
    };

    const registerForKeyUp = (): void => {
      const handleKeyUp = (ev: KeyboardEvent): void => {
        // Needs to handle the CTRL + ALT + SPACE key during keyup due to FireFox bug:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
        // eslint-disable-next-line deprecation/deprecation
        if (ev.altKey && ev.ctrlKey && ev.key === " ") {
          if (elementContains(scrollableContent.value, ev.target as HTMLElement)) {
            isModalMenuOpen.value = !isModalMenuOpen.value;
            ev.preventDefault();
            ev.stopPropagation();
          }
        }
      };

      if (!disposeOnKeyUp.value) {
        events.value.on(win, 'keyup', handleKeyUp, true /* useCapture */);
        disposeOnKeyUp.value = () => {
          events.value.off(win, 'keyup', handleKeyUp, true /* useCapture */);
          disposeOnKeyUp.value = null;
        };
      }
    };

    watch([isModalOpen, isOpen], () => {
      if(onModalCloseTimer.value)
        clearTimeout(onModalCloseTimer.value);

      // Opening the dialog
      if (isOpen.value) {
        // This must be done after the modal content has rendered
        requestAnimationFrame(() => setTimeout(registerInitialModalPosition, 0));

        isModalOpen.value = true;

        // Add a keyUp handler for all key up events once the dialog is open.
        if (dragOptions.value) {
          registerForKeyUp();
        }

        hasBeenOpened.value = true;
        isVisible.value = true;
      }

      // Closing the dialog
      if (!isOpen.value && isModalOpen.value) {
        onModalCloseTimer.value = setTimeout(handleModalClose, parseFloat(animationDuration) * 1000);
        isVisible.value = false;
      }
    });

    onBeforeUnmount(() => {
      events.value?.dispose();
    });

    return () => {
      if (!(isModalOpen.value && responsiveMode.value! >= ResponsiveMode.small))
        return;

      const {
        renderSlot,
      } = useSlotHelpers(slots, 'default')

      const modalContent = () => h(FocusTrapZone, {
        ...focusTrapZoneProps.value,
        id: focusTrapZoneId,
        className: css(classNames.value.main, focusTrapZoneProps.value?.class),
        elementToFocusOnDismiss: focusTrapZoneProps.value?.elementToFocusOnDismiss || elementToFocusOnDismiss.value,
        isClickableOutsideFocusTrap: focusTrapZoneProps.value?.isClickableOutsideFocusTrap ?? (isModeless.value || isClickableOutsideFocusTrap.value || !isBlocking.value),
        disableRestoreFocus: focusTrapZoneProps.value?.disableRestoreFocus ?? disableRestoreFocus.value,
        forceFocusInsideTrap: (focusTrapZoneProps.value?.forceFocusInsideTrap ?? forceFocusInsideTrap.value) && !isModeless.value,
        firstFocusableSelector: focusTrapZoneProps.value?.firstFocusableSelector || firstFocusableSelector.value,
        focusPreviouslyFocusedInnerElemen: focusTrapZoneProps.value?.focusPreviouslyFocusedInnerElement ?? true,
        onBlur: isInKeyboardMoveMode.value ? handleExitKeyboardMoveMode : undefined
      }, () => 
      [
        dragOptions.value && isInKeyboardMoveMode.value && h('div', {
          className: classNames.value.keyboardMoveIconContainer,
        }, () => [
            dragOptions.value.keyboardMoveIconProps ? h(Icon, {
              ...dragOptions.value.keyboardMoveIconProps,
              className: classNames.value.keyboardMoveIcon,
            }) : h(Icon, {
              iconName: 'Move',
              className: classNames.value.keyboardMoveIcon,
            }),
        ]),
        h('div', {
          className: classNames.value.scrollableContent,
          ref: scrollableContent,
          'data-is-scrollable': true,
        }, [
          dragOptions.value && isModalMenuOpen.value && h(
            dragOptions.value.menu,
            {
              items: [
                { key: 'move', text: dragOptions.value.moveMenuItemText, onClick: handleEnterKeyboardMoveMode },
                { key: 'close', text: dragOptions.value.closeMenuItemText, onClick: handleModalClose },
              ],
              onDismiss: () => { isModalMenuOpen.value = false },
              alignTargetEdge: true,
              coverTarget: true,
              directionalHint: DirectionalHint.topLeftEdge, // Assuming DirectionalHint is defined
              directionalHintFixed: true,
              shouldFocusOnMount: true,
              target: scrollableContent.value,
            }),
            renderSlot()
        ])
      ]);

      return h(Layer, {
        ...mergedLayerProps.value
      }, () => [
        h(Popup, {
          role: isAlertRole.value ? 'alertdialog' : 'dialog',
          ariaLabelledBy: titleAriaId.value,
          ariaDescribedBy: subtitleAriaId.value,
          onDismiss: onDismiss.value,
          shouldRestoreFocus: !disableRestoreFocus.value,
          // Modeless modals shouldn't hide siblings.
          // Popup will automatically handle this based on the aria-modal setting.
          enableAriaHiddenSiblings: enableAriaHiddenSiblings.value,
          'aria-modal': !isModeless.value,
          ...popupProps.value
        }, () => [
          h('div', {
            ref: root,
            className: classNames.value.root,
            role: !isModeless.value ? 'document' : undefined,
          }, [
            !isModeless.value && h(Overlay, {
              'aria-hidden': true,
              isDarkThemed: isDarkOverlay.value,
              onClick: isBlocking.value ? undefined : onDismiss.value,
              allowTouchBodyScroll: allowTouchBodyScrollInternal.value,
              ...overlay.value
            }),
            (
              dragOptions.value ? h(DraggableZone, {
                handleSelector: dragOptions.value.dragHandleSelector || `#${focusTrapZoneId}`,
                preventDragSelector: 'button',
                onStart: handleDragStart,
                onDragChange: handleDrag,
                onStop: handleDragStop,
                position: coordinates.value
              }, modalContent()) : modalContent()
            )
          ])
        ])
      ])
    }
  }
})
