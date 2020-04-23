import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { IModalProps, IModalStyles, IModalStyleProps, IDragOptions } from './Modal.types'
import BaseComponent from '../BaseComponent'
import { Layer, ILayerProps } from '../Layer'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { getStyles } from './Modal.styles'
import { Popup } from '../Popup'
import { Overlay, IOverlayProps } from '../Overlay'
import { Icon } from '../Icon'
import { DirectionalHint } from '../Callout'
import { ResponsiveMode } from '../../utilities'

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

  @Watch('isOpen')
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

  render () {
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

    const modalContent = (
      <div class={classNames.main}>
        {dragOptions && isInKeyboardMoveMode && (
          <div class={classNames.keyboardMoveIconContainer}>
            {dragOptions.keyboardMoveIconProps ? (
              <Icon {...dragOptions.keyboardMoveIconProps} />
            ) : (
              <Icon iconName="move" class={classNames.keyboardMoveIcon} />
            )}
          </div>
        )}
        <div ref="scrollableContent" class={classNames.scrollableContent} data-is-scrollable={true}>
          {dragOptions && this.isModalMenuOpen && (
            <dragOptions.menu
              items={[
                { key: 'move', text: dragOptions.moveMenuItemText, onClick: this.onEnterKeyboardMoveMode },
                { key: 'close', text: dragOptions.closeMenuItemText, onClick: this.onModalClose },
              ]}
              onDismiss={this.onModalContextMenuClose}
              alignTargetEdge={true}
              coverTarget={true}
              directionalHint={DirectionalHint.topLeftEdge}
              directionalHintFixed={true}
              shouldFocusOnMount={true}
              target={this.$refs.scrollableContent}
            />
          )}
          {this.$slots.default}
        </div>
      </div>
    )

    if (responsiveMode! >= ResponsiveMode.small) {
      return (
        <Layer {...mergedLayerProps}>
          <Popup
            role={isModeless || !isBlocking ? 'dialog' : 'alertdialog'}
            aria-modal={!isModeless}
            ariaLabelledBy={titleAriaId}
            ariaDescribedBy={subtitleAriaId}
            onDismiss={onDismiss}
            shouldRestoreFocus={!ignoreExternalFocusing}
          >
            <div class={classNames.root}>
              {!isModeless && (
                <Overlay
                  dark={isDarkOverlay}
                  onClick={isBlocking ? undefined : (onDismiss as any)}
                  allowTouchBodyScroll={this.allowTouchBodyScroll}
                  {...{ props: overlay }}
                />
              )}
              {dragOptions ? (
                // <DraggableZone
                //   handleSelector={dragOptions.dragHandleSelector || `.${classNames.main.split(' ')[0]}`}
                //   preventDragSelector="button"
                //   onStart={this._onDragStart}
                //   onDragChange={this._onDrag}
                //   onStop={this._onDragStop}
                //   position={{ x: x, y: y }}
                // >
                modalContent
                // </DraggableZone>
              ) : (
                modalContent
              )}
            </div>
          </Popup>
        </Layer>
      )
    }
  }
}
