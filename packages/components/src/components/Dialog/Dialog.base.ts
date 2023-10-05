import { classNamesFunction, getId } from '@fluentui-vue/utilities'
import { computed, defineComponent, h, toRefs, watch, type PropType } from 'vue'
import { Modal } from '../Modal'
import type { IDialogStyleProps, IDialogStyles } from './Dialog.types'
import { DialogContent } from './DialogContent'
import { ResponsiveMode, makeStylingProps } from '@/utils'
import type { IDragOptions, IModalProps } from '../Modal/Modal.types'
import { DialogType, type IDialogContentProps } from '.'

const getClassNames = classNamesFunction<IDialogStyleProps, IDialogStyles>()

const DefaultModalProps: IModalProps = {
  isDarkOverlay: false,
  isBlocking: false,
  className: '',
  containerClassName: '',
  topOffsetFixed: false,
  enableAriaHiddenSiblings: true,
};

const DefaultDialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  className: '',
  topButtonsProps: [],
};

export const DialogBase = defineComponent({
  name: 'DialogBase',

  props: {
    ...makeStylingProps(),
    containerClassName: { type: String, default: null },
    contentClassName: { type: String, default: null },
    elementToFocusOnDismiss: { type: Object as PropType<HTMLElement>, default: null },
    firstFocusableSelector: { type: String, default: null },
    forceFocusInsideTrap: { type: Boolean, default: false },
    ignoreExternalFocusing: { type: Boolean, default: false },
    isBlocking: { type: Boolean, default: false },
    isClickableOutsideFocusTrap: { type: Boolean, default: false },
    isDarkOverlay: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: false },
    onDismiss: { type: Function as PropType<(ev?: Event | MouseEvent) => any>, default: null },
    onDismissed: { type: Function as PropType<() => any>, default: null },
    styles: { type: [Object, Function] as PropType<IDialogStyles>, default: () => ({}) },
    topButtonsProps: { type: Object, default: null },
    type: { type: Number as PropType<DialogType>, default: null },
    dialogContentProps: { type: Object as PropType<IDialogContentProps>, default: () => ({}) },
    hidden: { type: Boolean, default: !0 },
    modalProps: { type: Object as PropType<IModalProps>, default: null },
    minWidth: { type: String, default: null },
    maxWidth: { type: String, default: null },
    onLayerDidMount: { type: Function, default: null },
    responsiveMode: { type: Number as PropType<ResponsiveMode>, default: null },
    ariaLabelledById: { type: String, default: null },
    ariaDescribedById: { type: String, default: null },
    title: { type: [String, Object], default: null },
    subText: { type: String, default: null },
  },

  setup(props, { slots }) {
    const {
      className,
      containerClassName,
      contentClassName,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      styles,
      hidden,
      ignoreExternalFocusing,
      isBlocking,
      isClickableOutsideFocusTrap,
      isDarkOverlay,
      onDismiss,
      onDismissed,
      onLayerDidMount,
      responsiveMode,
      subText,
      theme,
      title,
      topButtonsProps,
      type,
      /* eslint-enable deprecation/deprecation */
      minWidth,
      maxWidth,
      modalProps,
    } = toRefs(props)

    const disableRestoreFocus = computed(() => ignoreExternalFocusing.value)

    const id = computed(() => getId('Dialog'))
    const _defaultTitleTextId = computed(() => `${id.value}-title`)
    const _defaultSubTextId = computed(() => `${id.value}-subText`)

    const isOpen = computed(() => !hidden.value)

    const mergedLayerProps = computed(() => ({
      onLayerDidMount,
      ...modalProps.value?.layerProps,
    }))

    const dialogMSDraggableHeaderClassName = 'ms-Dialog-draggable-header';

    const dragOptions = computed(() => {
      let dragOptions: IDragOptions | undefined = undefined;
      // If dragOptions are provided, but no drag handle is specified, we supply a drag handle,
      // and inform dialog contents to add class to draggable class to the header
      if (modalProps.value?.dragOptions && !modalProps.value.dragOptions?.dragHandleSelector) {
        // spread options to avoid mutating props
        dragOptions = { ...modalProps.value.dragOptions };
        dragOptions.dragHandleSelector = `.${dialogMSDraggableHeaderClassName}`;
      }
      return dragOptions;
    })

    const dialogDraggableClassName = computed(() => {
      let dialogDraggableClassName: string | undefined = undefined;
      if (modalProps.value?.dragOptions && !modalProps.value.dragOptions?.dragHandleSelector) {
        dialogDraggableClassName = dialogMSDraggableHeaderClassName;
      }
      return dialogDraggableClassName;
    });

    const mergedModalProps = computed(() => ({
      ...DefaultModalProps,
      elementToFocusOnDismiss: elementToFocusOnDismiss.value,
      firstFocusableSelector: firstFocusableSelector.value,
      forceFocusInsideTrap: forceFocusInsideTrap.value,
      disableRestoreFocus: disableRestoreFocus.value,
      isClickableOutsideFocusTrap: isClickableOutsideFocusTrap.value,
      responsiveMode: responsiveMode.value,
      className: className.value,
      containerClassName: containerClassName.value,
      isBlocking: isBlocking.value,
      isDarkOverlay: isDarkOverlay.value,
      onDismissed: onDismissed.value,
      ...modalProps.value,
      dragOptions: dragOptions.value,
      layerProps: mergedLayerProps.value,
      isOpen: isOpen.value,
    }))

    const dialogContentProps = computed(() => ({
      className: contentClassName.value,
      subText: subText.value,
      title: title.value,
      topButtonsProps: topButtonsProps.value,
      type: type.value,
      ...DefaultDialogContentProps,
      ...props.dialogContentProps,
      draggableHeaderClassName: dialogDraggableClassName.value,
      titleProps: {
        // eslint-disable-next-line deprecation/deprecation
        id: props.dialogContentProps?.titleId || _defaultTitleTextId.value,
        ...props.dialogContentProps?.titleProps,
      },
    }))

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value!,
      className: mergedModalProps.value.className,
      containerClassName: mergedModalProps.value.containerClassName,
      hidden: hidden.value,
      dialogDefaultMinWidth: minWidth.value,
      dialogDefaultMaxWidth: maxWidth.value,
    }))

    const getSubTextId = () : string => {
      const { ariaDescribedById, modalProps, dialogContentProps, subText } = toRefs(props);
      let id = (modalProps.value && modalProps.value.subtitleAriaId) || ariaDescribedById.value;
  
      if (!id) {
        id = ((dialogContentProps.value && dialogContentProps.value.subText) || subText.value) && _defaultSubTextId.value;
      }
  
      return id;
    };

    const getTitleTextId = () : string => {
      const { ariaLabelledById, modalProps, dialogContentProps, title } = toRefs(props);
      let id = (modalProps.value && modalProps.value.titleAriaId) || ariaLabelledById.value;
  
      if (!id) {
        id = ((dialogContentProps.value && dialogContentProps.value.title) || title.value) && _defaultTitleTextId.value;
      }
  
      return id;
    };

    const slotProps = computed(() => ({
      root: {
        ...mergedModalProps.value,
        class: classNames.value.root,
        containerClassName: classNames.value.main,
        onDismiss,
        subtitleAriaId: getSubTextId(),
        titleAriaId: getTitleTextId()
      },
      content: {
        subTextId: _defaultSubTextId.value,
        showCloseButton: mergedModalProps.value?.isBlocking,
        onDismiss: onDismiss.value,
        ...dialogContentProps.value,
      },
    }))

    return () => h(Modal, slotProps.value.root, () => [
      h(DialogContent, slotProps.value.content, slots),
    ])
  },
})
