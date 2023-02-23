import { DirectionalHint, classNamesFunction } from '@fluentui-vue/utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode, defineComponent, h } from 'vue'
import { Icon } from '../Icon'
import type { ILayerProps } from '../Layer'
import { ILayerStyles, Layer } from '../Layer'
import { Overlay } from '../Overlay'
import { Popup } from '../Popup'
import type { IDragOptions, IModalStyleProps, IModalStyles } from './Modal.types'
import { ResponsiveMode, asSlotProps, useStylingProps } from '@/utils'
import type { SlotProps } from '@/utils'

const getClassNames = classNamesFunction<IModalStyleProps, IModalStyles>()

const DefaultLayerProps: ILayerProps = {
  eventBubblingEnabled: false,
}

export const ModalBase = defineComponent({
  name: 'ModalBase',

  props: {
    ...useStylingProps(),

    isOpen: { type: Boolean, default: false },
    isDarkOverlay: { type: Boolean, default: true },
    onDismissed: { type: Function, default: null },
    layerProps: { type: Object as () => ILayerProps, default: null },
    overlay: { type: Object, default: null },
    isBlocking: { type: Boolean, default: false },
    isModeless: { type: Boolean, default: false },
    className: { type: String, default: '' },
    containerClassName: { type: String, default: '' },
    scrollableContentClassName: { type: String, default: '' },
    titleAriaId: { type: String, default: '' },
    subtitleAriaId: { type: String, default: '' },
    topOffsetFixed: { type: Boolean, default: false },
    dragOptions: { type: Object as () => IDragOptions, default: null },
    allowTouchBodyScroll: { type: Boolean, default: false },
    ignoreExternalFocusing: { type: Boolean, default: false },
  },

  data() {
    return {
      internalIsOpen: false,
      isVisible: false,
      isVisibleClose: false,
      hasBeenOpened: false,
      modalRectangleTop: 0,
      isModalMenuOpen: false,
      isInKeyboardMoveMode: false,
      x: 0,
      y: 0,
      lastSetX: 0,
      lastSetY: 0,
      responsiveMode: ResponsiveMode.large,
    }
  },

  computed: {
    classNames(): IProcessedStyleSet<IModalStyles> {
      const {
        theme,
        styles,
        className,
        layerProps,
        containerClassName,
        scrollableContentClassName,
        isVisible,
        hasBeenOpened,
        modalRectangleTop,
        topOffsetFixed,
        isModeless,
        dragOptions,
        isOpen,
      } = this

      const layerClassName = layerProps == null ? '' : layerProps.className

      return getClassNames(styles, {
        theme: theme!,
        className,
        containerClassName,
        scrollableContentClassName,
        isOpen,
        isVisible,
        hasBeenOpened,
        modalRectangleTop,
        topOffsetFixed,
        isModeless,
        layerClassName,
        isDefaultDragHandle: dragOptions && !dragOptions.dragHandleSelector,
      })
    },

    slotProps(): SlotProps<any> {
      const {
        classNames,
        isDarkOverlay,
        overlay,
        isBlocking,
        onDismiss,
        isModeless,
        titleAriaId,
        subtitleAriaId,
        ignoreExternalFocusing,
        dragOptions,
      } = this

      return asSlotProps({
        root: {
          class: classNames.root,
        },
        main: {
          class: classNames.main,
        },
        overlay: {
          ...overlay,
          dark: isDarkOverlay,
          allowTouchBodyScroll: this.allowTouchBodyScroll,
          onClick: !isBlocking && onDismiss,
        },
        scrollableContent: {
          'ref': 'scrollableContent',
          'class': classNames.scrollableContent,
          'data-is-scrollable': true,
        },
        popup: {
          role: isModeless || !isBlocking ? 'dialog' : 'alertdialog',
          ariaModal: !isModeless,
          ariaLabelledBy: titleAriaId,
          ariaDescribedBy: subtitleAriaId,
          shouldRestoreFocus: !ignoreExternalFocusing,
          onDismiss,
        },
        menu: {
          items: [
            { key: 'move', text: dragOptions && dragOptions.moveMenuItemText, onClick: this.onEnterKeyboardMoveMode },
            { key: 'close', text: dragOptions && dragOptions.closeMenuItemText, onClick: this.onModalClose },
          ],
          alignTargetEdge: true,
          coverTarget: true,
          directionalHint: DirectionalHint.topLeftEdge,
          directionalHintFixed: true,
          shouldFocusOnMount: true,
          target: this.$refs.scrollableContent,
          onDismiss: this.onModalContextMenuClose,
        },
        keyboardMoveIcon: {
          class: classNames.keyboardMoveIcon,
          iconName: 'move',
        },
      })
    },

    mergedLayerProps(): any {
      const {
        classNames,
        isModeless,
        layerProps,
      } = this
      return {
        ...DefaultLayerProps,
        ...layerProps,
        onLayerDidMount: layerProps && layerProps.onLayerDidMount,
        insertFirst: isModeless,
        className: classNames.layer,
      }
    },
  },

  watch: {
    isOpen: {
      immediate: true,
      handler(value): void {
        if (value)
          this.isVisible = true
      },
    },
  },

  methods: {
    onModalContextMenuClose(): void {
      this.isModalMenuOpen = false
    },

    onModalClose(): void {
      this.isModalMenuOpen = false
      this.isInKeyboardMoveMode = false
      this.internalIsOpen = false
      // TODO
    },

    onEnterKeyboardMoveMode(): void {
      this.lastSetX = this.x
      this.lastSetY = this.y
      this.isInKeyboardMoveMode = true
      this.isModalMenuOpen = true
      // TODO
      // this._events.on(window, 'keydown', this._onKeyDown, true /* useCapture */);
    },

    onDismiss(ev: Event): void {
      this.$emit('dismiss', ev)
    },
  },

  // eslint-disable-next-line vue/require-render-return
  render(): any {
    const {
      dragOptions,
      isInKeyboardMoveMode,
      classNames,
      isOpen,
      responsiveMode,
      isModeless,
      mergedLayerProps,
    } = this

    if (!isOpen)
      return

    const modalContent = h('div', this.slotProps.main, [
      dragOptions && isInKeyboardMoveMode && h('div', {
        class: classNames.keyboardMoveIconContainer,
      }, [
        dragOptions.keyboardMoveIconProps
          ? h(Icon, dragOptions.keyboardMoveIconProps)
          : h(Icon, this.slotProps.keyboardMoveIcon),
      ]),
      h('div', this.slotProps.scrollableContent, [
        dragOptions && this.isModalMenuOpen && h(dragOptions.menu, this.slotProps.menu),
        this.$slots.default({}),
      ]),
    ])

    if (responsiveMode! >= ResponsiveMode.small) {
      return h(Layer, mergedLayerProps, [
        h(Popup, this.slotProps.popup, [
          h('div', this.slotProps.root, [
            !isModeless && h(Overlay, this.slotProps.overlay),
            dragOptions
              // TODO DraggableZone
              ? modalContent
              : modalContent,
          ]),
        ]),
      ])
    }
  },
})
