import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { IModalProps, IModalStyles, IModalStyleProps, IDragOptions } from './Modal.types'
import BaseComponent from '../BaseComponent'
import { Layer, ILayerProps } from '../Layer'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { getStyles } from './Modal.styles'
import { Popup } from '../Popup'
import { Overlay, IOverlayProps } from '../Overlay'
import { Icon } from '../Icon'
import { ResponsiveMode } from '../../utilities'
import { CreateElement } from 'vue'
import { DirectionalHint } from '../../common/DirectionalHint'

const getClassNames = classNamesFunction<IModalStyleProps, IModalStyles>()

const DefaultLayerProps: ILayerProps = {
  eventBubblingEnabled: false,
}

@Component
export class ModalBase extends BaseComponent<IModalProps, IModalStyles> {
  $refs!: {
    scrollableContent: HTMLDivElement
  }

  @Prop({ type: Boolean, default: false }) isOpen!: boolean;
  @Prop({ type: Boolean, default: true }) isDarkOverlay!: boolean;
  @Prop({ type: Function, default: null }) onDismissed!: () => any;
  @Prop({ type: Object, default: null }) layerProps!: ILayerProps;
  @Prop({ type: Object, default: null }) overlay!: IOverlayProps;
  @Prop({ type: Boolean, default: false }) isBlocking!: boolean;
  @Prop({ type: Boolean, default: false }) isModeless!: boolean;
  @Prop({ type: String, default: '' }) className!: string;
  @Prop({ type: String, default: '' }) containerClassName!: string;
  @Prop({ type: String, default: '' }) scrollableContentClassName!: string;
  @Prop({ type: String, default: '' }) titleAriaId!: string;
  @Prop({ type: String, default: '' }) subtitleAriaId!: string;
  @Prop({ type: Boolean, default: false }) topOffsetFixed!: boolean;
  @Prop({ type: Object, default: null }) dragOptions!: IDragOptions;
  @Prop({ type: Boolean, default: false }) allowTouchBodyScroll!: boolean;

  @Prop({ type: Boolean, default: false }) ignoreExternalFocusing!: boolean;

  internalIsOpen: boolean = false
  isVisible: boolean = false
  isVisibleClose: boolean = false
  hasBeenOpened: boolean = false
  modalRectangleTop: number = 0
  isModalMenuOpen: boolean = false
  isInKeyboardMoveMode: boolean = false

  x: number = 0
  y: number = 0
  lastSetX: number = 0
  lastSetY: number = 0

  responsiveMode: ResponsiveMode = ResponsiveMode.large

  @Watch('isOpen', { immediate: true })
  private onIsOpenChanged (newVal) {
    if (newVal) this.isVisible = true
  }

  get classNames () {
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
  }

  private onModalContextMenuClose () {
    this.isModalMenuOpen = false
  }

  private onModalClose () {
    this.isModalMenuOpen = false
    this.isInKeyboardMoveMode = false
    this.isOpen = false
    // TODO
  }

  private onEnterKeyboardMoveMode () {
    this.lastSetX = this.x
    this.lastSetY = this.y
    this.isInKeyboardMoveMode = true
    this.isModalMenuOpen = true
    // TODO
    // this._events.on(window, 'keydown', this._onKeyDown, true /* useCapture */);
  };

  private _onDragStart () {
    this.isModalMenuOpen = false
    this.isInKeyboardMoveMode = false
  };

  private _onDrag (_: Event, ui: any): void {
    this.x += ui.delta.x
    this.y += ui.delta.y
  };

  private _onDragStop () {
    // this.focus()
  };

  private onDismiss (ev: Event) {
    this.$emit('dismiss', ev)
  }

  render (h: CreateElement) {
    const {
      dragOptions,
      isInKeyboardMoveMode,
      classNames,
      isOpen,
      responsiveMode,
      isModeless,
      layerProps,
      isBlocking,
      titleAriaId,
      subtitleAriaId,
      isDarkOverlay,
      onDismiss,
      overlay,
      ignoreExternalFocusing,
      x,
      y,
    } = this

    if (!isOpen) return null

    const mergedLayerProps = {
      ...DefaultLayerProps,
      ...this.layerProps,
      onLayerDidMount: layerProps && layerProps.onLayerDidMount,
      insertFirst: isModeless,
      className: classNames.layer,
    }

    const modalContent = h('div', { class: classNames.main }, [
      dragOptions && isInKeyboardMoveMode && h('div', {
        class: classNames.keyboardMoveIconContainer,
      }, [
        dragOptions.keyboardMoveIconProps
          ? h(Icon, { attrs: dragOptions.keyboardMoveIconProps })
          : h(Icon, { class: classNames.keyboardMoveIcon, attrs: { iconName: 'move' } }),
      ]),
      h('div', {
        ref: 'scrollableContent',
        class: classNames.scrollableContent,
        attrs: {
          dataIsScrollable: true,
        },
      }, [
        dragOptions && this.isModalMenuOpen && h(dragOptions.menu, {
          attrs: {
            items: [
              { key: 'move', text: dragOptions.moveMenuItemText, onClick: this.onEnterKeyboardMoveMode },
              { key: 'close', text: dragOptions.closeMenuItemText, onClick: this.onModalClose },
            ],
            alignTargetEdge: true,
            coverTarget: true,
            directionalHint: DirectionalHint.topLeftEdge,
            directionalHintFixed: true,
            shouldFocusOnMount: true,
            target: this.$refs.scrollableContent,
          },
          on: {
            dismiss: this.onModalContextMenuClose,
          },
        }),
        this.$slots.default,
      ]),
    ])

    if (responsiveMode! >= ResponsiveMode.small) {
      return h(Layer, { attrs: mergedLayerProps }, [
        h(Popup, {
          attrs: {
            role: isModeless || !isBlocking ? 'dialog' : 'alertdialog',
            ariaModal: !isModeless,
            ariaLabelledBy: titleAriaId,
            ariaDescribedBy: subtitleAriaId,
            shouldRestoreFocus: !ignoreExternalFocusing,
          },
          on: {
            dismiss: onDismiss,
          },
        }, [
          h('div', { class: classNames.root }, [
            !isModeless && h(Overlay, {
              attrs: {
                dark: isDarkOverlay,
                allowTouchBodyScroll: this.allowTouchBodyScroll,
                ...overlay,
              },
              on: {
                ...!isBlocking ? { click: onDismiss } : {},
              },
            }),
            dragOptions
              ? modalContent
              : modalContent,
          ]),
        ]),
      ])
    }
  }
}
