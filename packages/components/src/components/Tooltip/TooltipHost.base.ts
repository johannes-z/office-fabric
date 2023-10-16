import { computed, defineComponent, toRefs, type PropType, h, ref, onBeforeUnmount, type VNodeRef  } from "vue";
import { makeStylingProps } from '@/utils'
import { assign, classNamesFunction, divProperties, getId, getNativeProps, hasOverflow } from "@fluentui-vue/utilities";
import { TooltipOverflowMode, type DirectionalHint, type ICalloutProps, type ITooltipHostProps, type ITooltipHostStyles, type ITooltipProps, type TooltipSlotChildren, TooltipDelay, Tooltip } from "..";
import { portalContainsElement } from "@fluentui/dom-utilities";
import { hiddenContentStyle } from "@fluentui-vue/style-utilities";

const getClassNames = classNamesFunction<ITooltipHostProps, ITooltipHostStyles>()

export const TooltipHostBase = defineComponent({
    name: 'TooltipHostBase',
  
    props: {
      ...makeStylingProps(),
      calloutProps: { type: Object as PropType<ICalloutProps>, default: undefined },
      content: { type: Object as PropType<TooltipSlotChildren>, default: undefined },
      directionalHint: { type: Number as () => DirectionalHint, default: undefined },
      directionalHintForRTL: { type: Number as () => DirectionalHint, default: undefined },
      hostClassName: { type: String, default: undefined },
      setAriaDescribedBy: { type: Boolean, default: true },
      tooltipProps: { type: Object as PropType<ITooltipProps>, default: undefined },
      overflowMode: { type: Number as () => TooltipOverflowMode, default: undefined },
      delay: { type: Number as () => TooltipDelay, default: undefined },
      closeDelay: { type: Number, default: undefined },
      onTooltipToggle: { type: Function as PropType<(isTooltipVisible: boolean) => void>, default: undefined },
    },
  
    setup(props, { attrs, slots }) {
      const {
        calloutProps,
        //children,
        content,
        directionalHint,
        directionalHintForRTL,
        hostClassName,
        //id,
        // eslint-disable-next-line deprecation/deprecation
        setAriaDescribedBy,
        tooltipProps,
        styles,
        theme,
        overflowMode,
        delay,
        closeDelay,
        onTooltipToggle
      } = toRefs(props);

      const tooltipHost = ref<HTMLElement|null>(null);
      const dismissTimer = ref<NodeJS.Timeout|null>(null);
      const openTimer = ref<NodeJS.Timeout|null>(null);

      const isAriaPlaceholderRendered = ref(false);
      const isTooltipVisible = ref(false);
      const ignoreNextFocusEvent = ref(false);

      const classNames = computed(() => getClassNames(styles.value!, {
        theme: theme.value!,
        className: hostClassName.value,
      }));

      const tooltipId = attrs.id || getId('tooltip');

      // Helpers
      onBeforeUnmount(() => {
        if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip === this) {
            TooltipHostBase._currentVisibleTooltip = undefined;
          }
      
          if(dismissTimer.value){
            clearTimeout(dismissTimer.value);
            dismissTimer.value = null;
          }
          if(openTimer.value){
            clearTimeout(openTimer.value);
            openTimer.value = null;
          }
      });
    
      const show = (): void => {
        toggleTooltip(true);
      };
    
      const dismiss = (): void => {
        hideTooltip();
      };
    
      const getTargetElement = (): HTMLElement | undefined => {
        if (!tooltipHost.value) {
          return undefined;
        }
    
        // Select target element based on overflow mode. For parent mode, you want to position the tooltip relative
        // to the parent element, otherwise it might look off.
        if (overflowMode.value !== undefined) {
          switch (overflowMode.value) {
            case TooltipOverflowMode.Parent:
              return tooltipHost.value.parentElement!;
    
            case TooltipOverflowMode.Self:
              return tooltipHost.value;
          }
        }
    
        return tooltipHost.value;
      };
    
      const onTooltipFocus = (ev: FocusEvent) => {
        if (ignoreNextFocusEvent.value) {
          ignoreNextFocusEvent.value = false;
          return;
        }
    
        onTooltipMouseEnter(ev);
      };
    
      const onTooltipContentFocus = (ev: FocusEvent) => {
        if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip !== this) {
          TooltipHostBase._currentVisibleTooltip.dismiss();
        }
        TooltipHostBase._currentVisibleTooltip = this;
    
        clearDismissTimer();
        clearOpenTimer();
      };
    
      const onTooltipBlur = (ev: FocusEvent) => {
        // The focused element gets a blur event when the document loses focus
        // (e.g. switching tabs in the browser), but we don't want to show the
        // tooltip again when the document gets focus back. Handle this case by
        // checking if the blurred element is still the document's activeElement,
        // and ignoring when it next gets focus back.
        // See https://github.com/microsoft/fluentui/issues/13541
        ignoreNextFocusEvent.value = document?.activeElement === ev.target;
    
        dismissTimer.value = setTimeout(() => {
          hideTooltip();
        }, 0);
      };
    
      // Show Tooltip
      const onTooltipMouseEnter = (ev: Event): void => {
        if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip !== this) {
          TooltipHostBase._currentVisibleTooltip.dismiss();
        }
        TooltipHostBase._currentVisibleTooltip = this;
    
        if (overflowMode.value !== undefined) {
          const overflowElement = getTargetElement();
          if (overflowElement && !hasOverflow(overflowElement)) {
            return;
          }
        }
    
        if (ev.target && portalContainsElement(ev.target as HTMLElement, getTargetElement())) {
          // Do not show tooltip when target is inside a portal relative to TooltipHost.
          return;
        }
    
        clearDismissTimer();
        clearOpenTimer();
    
        if (delay.value !== TooltipDelay.zero) {
          const delayTime = getDelayTime(delay.value!); // non-null assertion because we set it in `defaultProps`
    
          openTimer.value = setTimeout(() => {
            toggleTooltip(true);
          }, delayTime);
        } else {
          toggleTooltip(true);
        }
      };
    
      // Hide Tooltip
      const onTooltipMouseLeave = (ev: MouseEvent): void => {
        clearDismissTimer();
        clearOpenTimer();
    
        if (closeDelay.value) {
          dismissTimer.value = setTimeout(() => {
            toggleTooltip(false);
          }, closeDelay.value);
        } else {
          toggleTooltip(false);
        }
    
        if (TooltipHostBase._currentVisibleTooltip === this) {
          TooltipHostBase._currentVisibleTooltip = undefined;
        }
      };
    
      const onTooltipKeyDown = (ev: KeyboardEvent): void => {
        if ((ev.key === "Escape" || ev.ctrlKey) && isTooltipVisible.value) {
          hideTooltip();
          ev.stopPropagation();
        }
      };
    
      const clearDismissTimer = (): void => {
        clearTimeout(dismissTimer.value!);
      };
    
      const clearOpenTimer = (): void => {
        clearTimeout(openTimer.value!);
      };
    
      // Hide Tooltip
      const hideTooltip = (): void => {
        clearOpenTimer();
        clearDismissTimer();
        toggleTooltip(false);
      };
    
      const  toggleTooltip = (isTooltipVisibleParam: boolean): void => {
        if (isTooltipVisibleParam !== isTooltipVisible.value) {
            isTooltipVisible.value = isTooltipVisibleParam;
            onTooltipToggle.value && onTooltipToggle.value(isTooltipVisibleParam);
        }
      };
    
      const getDelayTime = (delay: TooltipDelay): number => {
        switch (delay) {
          case TooltipDelay.medium:
            return 300;
          case TooltipDelay.long:
            return 500;
          default:
            return 0;
        }
      };

      // Init Props
      const tooltipRenderProps = computed(() => ({
        id: `${tooltipId}--tooltip`,
        content: content.value,
        targetElement: getTargetElement(),
        directionalHint,
        directionalHintForRTL,
        calloutProps: assign({}, calloutProps.value, {
          onDismiss: hideTooltip,
          onFocus: onTooltipContentFocus,
          onMouseEnter: onTooltipMouseEnter,
          onMouseLeave: onTooltipMouseLeave,
        }),
        onMouseEnter: onTooltipMouseEnter,
        onMouseLeave: onTooltipMouseLeave,
        ...getNativeProps(props, divProperties, ['id']), // Make sure we use the id above
        ...tooltipProps.value,
      }));

      // Get the content of the tooltip for use in the hidden div used for screen readers
      //TODO
      /*const tooltipContent = tooltipProps?.onRenderContent
        ? tooltipProps.onRenderContent(tooltipRenderProps, props => (props?.content ? <>{props.content}</> : null))
        : content;  */
      const tooltipContent = computed(() => content.value);

      const showTooltip = computed(() => isTooltipVisible.value && !!tooltipContent.value);
      const ariaDescribedBy = computed(() => setAriaDescribedBy.value && isTooltipVisible.value && !!tooltipContent.value ? tooltipId : undefined);

      //render
      return () => h('div', {
        className: classNames.value.root,
        ref: tooltipHost,
        onFocusCapture: onTooltipFocus, //FocusTrapZone case sensitive
        onBlurCapture: onTooltipBlur, //FocusTrapZone case sensitive
        onmouseenter: onTooltipMouseEnter,
        onmouseleave: onTooltipMouseLeave,
        onkeydown: onTooltipKeyDown,
        role: 'none',
        // WARNING: aria-describedby on this node provides no value, since it isn't allowed generic elements
        'aria-describedby': ariaDescribedBy.value,
      }, [
        slots?.default && slots.default(),
        showTooltip.value && h(Tooltip, tooltipRenderProps.value, [
          h('div', {
            hidden: true,
            id: tooltipId,
            style: hiddenContentStyle
          }, tooltipContent.value)
        ])
      ])
    }
});