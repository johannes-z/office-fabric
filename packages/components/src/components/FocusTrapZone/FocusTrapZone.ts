import { getId, getWindow, getFirstTabbable, getLastTabbable, getNextElement, focusAsync, modalize, on, classNamesFunction, getNativeProps, divProperties } from '@fluentui-vue/utilities'
import { elementContains } from '@fluentui/dom-utilities'
import { usePrevious } from '@vueuse/core';
import { computed, defineComponent, h, ref, onBeforeUnmount, watchEffect, toRefs, watch, onUnmounted, type VNodeRef } from 'vue'
import { makeStylingProps } from '@/utils'
import { useSlotHelpers } from '@/composables';

const getClassNames = classNamesFunction()

const DEFAULT_PROPS = {
  disabled: false,
  disableFirstFocus: false,
  forceFocusInsideTrap: true,
  isClickableOutsideFocusTrap: false,
};

export const FocusTrapZone = defineComponent({
  name: 'FocusTrapZone',

  props: {
    ...makeStylingProps(),
    disabled: { type: Boolean, default: DEFAULT_PROPS.disabled },
    disableFirstFocus: { type: Boolean, default: DEFAULT_PROPS.disableFirstFocus },
    forceFocusInsideTrap: { type: Boolean, default: DEFAULT_PROPS.forceFocusInsideTrap },
    focusPreviouslyFocusedInnerElement: { type: Boolean, default: true },
    firstFocusableSelector: { type: [String, Function], default: null },
    firstFocusableTarget: { type: [String, Function], default: null },
    ignoreExternalFocusing: { type: Boolean, default: false },
    isClickableOutsideFocusTrap: { type: Boolean, default: DEFAULT_PROPS.isClickableOutsideFocusTrap },
    enableAriaHiddenSiblings: { type: Boolean, default: false },
    ariaLabelledBy: { type: String, default: null },
    elementToFocusOnDismiss: { type: HTMLElement, default: null },
  },

  setup(props, { attrs, emit, slots }) {
    const root = ref<VNodeRef|null>(null);
    const firstBumper = ref<VNodeRef|null>(null);
    const lastBumper = ref<VNodeRef|null>(null);
    const doc:Document|undefined = getWindow()?.document;
    const isFirstRender = usePrevious(false) ?? true;

    const {
      theme,
      styles,
      disabled,
      disableFirstFocus,
      forceFocusInsideTrap,
      focusPreviouslyFocusedInnerElement,
      // eslint-disable-next-line deprecation/deprecation
      firstFocusableSelector,
      firstFocusableTarget,
      // eslint-disable-next-line deprecation/deprecation
      ignoreExternalFocusing,
      isClickableOutsideFocusTrap,
      enableAriaHiddenSiblings,      
      ariaLabelledBy,    
    } = toRefs(props);

    const disableRestoreFocus = computed(() => ignoreExternalFocusing.value);

    const hasFocus = ref(false);
    const focusStackId = getId('ftz-', (attrs as any).id);
    const previouslyFocusedElementInTrapZone = ref<HTMLElement|null>(null);

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
    }))

    const bumperProps = {
      'aria-hidden': true,
      style: {
        pointerEvents: 'none',
        position: 'fixed',
      },
      tabindex: disabled.value ? -1 : 0,
      'data-is-visible': true,
      'data-is-focus-trap-zone-bumper': true,
    };

    const focusElementAsync = (element:HTMLElement) => {
      if (element !== firstBumper.value && element !== lastBumper.value) {
        focusAsync(element);
      }
    };

    /**
     * Callback to force focus into FTZ (named to avoid overlap with global focus() callback).
     * useEventCallback always returns the same callback reference but updates the implementation
     * every render to avoid stale captured values.
     */
    const focusFTZ = watchEffect(() => {
      if (!root.value) {
        return;
      }

      if (
        focusPreviouslyFocusedInnerElement.value &&
        previouslyFocusedElementInTrapZone.value &&
        elementContains(root.value, previouslyFocusedElementInTrapZone.value)
      ) {
        focusElementAsync(previouslyFocusedElementInTrapZone.value);
        return;
      }

      let firstFocusableChild: HTMLElement | null = null;

      if (typeof firstFocusableTarget.value === 'string') {
        firstFocusableChild = root.value.querySelector(firstFocusableTarget.value);
      } else if (firstFocusableTarget.value) {
        firstFocusableChild = firstFocusableTarget.value(root.value);
      } else if (firstFocusableSelector.value) {
        const focusSelector =
          typeof firstFocusableSelector.value === 'string' ? firstFocusableSelector.value : firstFocusableSelector.value();
        firstFocusableChild = root.value.querySelector('.' + focusSelector);
      }

      if (!firstFocusableChild) {
        firstFocusableChild = getNextElement(root.value, root.value.firstChild as HTMLElement, false, false, false, true);
      }

      if (firstFocusableChild) {
        focusElementAsync(firstFocusableChild);
      }
    });

    /** Used in root div focus/blur handlers */
    const focusBumper = (isFirstBumper:boolean) => {
      if (disabled.value || !root.value) {
        return;
      }

      const nextFocusable = isFirstBumper === hasFocus.value
        ? getLastTabbable(root.value, lastBumper.value, true, false)
        : getFirstTabbable(root.value, firstBumper.value, true, false);

      if (nextFocusable) {
        if (nextFocusable === firstBumper.value || nextFocusable === lastBumper.value) {
          focusFTZ();
        } else {
          nextFocusable.focus();
        }
      }
    };

    /** Root div blur handler (doesn't need useCallback since it's for a native element) */
    const onRootBlurCapture = (ev:FocusEvent) => {
      emit('blurCapture', ev);
      let relatedTarget = ev.relatedTarget;
      if (ev.relatedTarget === null) {
        // In IE11, due to lack of support, event.relatedTarget is always
        // null making every onBlur call to be "outside" of the root
        // even when it's not. Using document.activeElement is another way
        // for us to be able to get what the relatedTarget without relying
        // on the event
        relatedTarget = doc!.activeElement as Element;
      }
      if (!elementContains(root.value, relatedTarget as HTMLElement)) {
        hasFocus.value = false;
      }
    };

    /** Root div focus handler (doesn't need useCallback since it's for a native element) */
    const onRootFocusCapture = (ev:FocusEvent) => {
      emit('focusCapture', ev);

      if (ev.target === firstBumper.value) {
        focusBumper(true);
      } else if (ev.target === lastBumper.value) {
        focusBumper(false);
      }

      hasFocus.value = true;

      if (ev.target !== ev.currentTarget && !(ev.target === firstBumper.value || ev.target === lastBumper.value))
      {
        // every time focus changes within the trap zone, remember the focused element so that
        // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
        previouslyFocusedElementInTrapZone.value = ev.target as HTMLElement;
      }
    };

    /** Called to restore focus on unmount or props change. (useEventCallback ensures latest prop values are used.) */
    const returnFocusToInitiator = (elementToFocusOnDismiss:HTMLElement | null) => {
      FocusTrapZone.focusStack = FocusTrapZone.focusStack!.filter(value => focusStackId !== value);

      if (!doc) {
        return;
      }

      const activeElement = doc.activeElement as HTMLElement;
      if (
        disableRestoreFocus.value &&
        typeof elementToFocusOnDismiss?.focus === 'function' &&
        (elementContains(root.value, activeElement) || activeElement === doc.body)
      ) {
        focusElementAsync(elementToFocusOnDismiss);
      }
    };

    /** Called in window event handlers. (useEventCallback ensures latest prop values are used.) */
    const forceFocusOrClickInTrap = (ev) => {
      if (props.disabled) {
        return;
      }
      if (focusStackId === FocusTrapZone.focusStack?.slice(-1)[0]) {
        const targetElement = ev.target as HTMLElement | null;
        if (targetElement && !elementContains(root.value, targetElement)) {
          if (doc && doc.activeElement === doc.body) {
            setTimeout(() => {
              if (doc && doc.activeElement === doc.body) {
                focusFTZ();
                hasFocus.value = true;
              }
            }, 0);
          } else {
            focusFTZ();
            hasFocus.value = true;
          }
          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    };

    // Update window event handlers when relevant props change
    watch([forceFocusInsideTrap, isClickableOutsideFocusTrap], () => {
      const disposables:Array<() => void> = [];

      if (props.forceFocusInsideTrap) {
        disposables.push(on(window, 'focus', forceFocusOrClickInTrap, true));
      }
      if (!props.isClickableOutsideFocusTrap) {
        disposables.push(on(window, 'click', forceFocusOrClickInTrap, true));
      }

      onBeforeUnmount(() => {
        disposables.forEach(dispose => dispose());
      });
    });

    // On prop change or first render, focus the FTZ and update focusStack if appropriate
    watch([forceFocusInsideTrap, disabled], () => {
      // Do nothing if disabled, or if it's a re-render and forceFocusInsideTrap is false
      // (to match existing behavior, the FTZ handles first focus even if forceFocusInsideTrap
      // is false, though it's debatable whether it should do this)
      if (disabled.value || (!isFirstRender.value && !forceFocusInsideTrap.value) || !root.value) {
        return;
      }

      // Transition from forceFocusInsideTrap / FTZ disabled to enabled (or initial mount)
      FocusTrapZone.focusStack!.push(focusStackId);

      const elementToFocusOnDismiss:HTMLElement | null = props.elementToFocusOnDismiss || (doc!.activeElement as HTMLElement | null);

      if (!props.disableFirstFocus && !elementContains(root.value, elementToFocusOnDismiss)) {
        focusFTZ();
      }

      return () => returnFocusToInitiator(elementToFocusOnDismiss);
    });

    // Handle modalization separately from first focus
    watch([disabled, enableAriaHiddenSiblings, root], () => {
      if (!props.disabled && props.enableAriaHiddenSiblings) {
        const unmodalize = modalize(root.value!);
        return unmodalize;
      }
    });

    // Cleanup lifecyle method for internalState.
    onUnmounted(() => {
      previouslyFocusedElementInTrapZone.value = null;
    });

    const {
      renderSlot,
    } = useSlotHelpers(slots, 'default')

    return () => {
      const renderBumper = (refName) => {
        return h('div', {
          ref: refName,
          ...bumperProps,
        });
      };

      return h('div', {
        ref: root,
        'aria-labelledby': ariaLabelledBy.value,
        ...getNativeProps(props, divProperties),
        onFocusCapture: onRootFocusCapture,
        onBlurCapture: onRootBlurCapture,
      }, [
        renderBumper('firstBumper'),
        renderSlot(),
        renderBumper('lastBumper'),
      ]);
    };
  }
})