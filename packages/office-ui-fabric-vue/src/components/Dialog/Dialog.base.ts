import { Vue, Component, Prop } from 'vue-property-decorator'
import { IDialogProps, IDialogStyles, IDialogStyleProps } from './Dialog.types'
import BaseComponent from '../BaseComponent'
import { Layer, ILayerProps } from '../Layer'
import { Modal, IModalProps, IDragOptions } from '../Modal'
import { DialogContent } from './DialogContent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IDialogContentProps, DialogType } from './DialogContent.types'
import { ICSSPixelUnitRule, ICSSRule } from '@uifabric/merge-styles/lib/IRawStyleBase'
import { ResponsiveMode } from '../../utilities'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<IDialogStyleProps, IDialogStyles>()

const DefaultModalProps: IModalProps = {
  isDarkOverlay: false,
  isBlocking: false,
  className: '',
  containerClassName: '',
  topOffsetFixed: false,
}

const DefaultDialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  className: '',
  topButtonsProps: [],
}

@Component({
  components: { Layer },
})
export class DialogBase extends BaseComponent<IDialogProps, IDialogStyles> {
  @Prop({ type: Object, default: () => {} }) dialogContentProps!: IDialogContentProps
  @Prop({ type: Boolean, default: true }) hidden!: boolean
  @Prop({ type: Object, default: null }) modalProps!: IModalProps
  @Prop({ type: String, default: null }) minWidth!: ICSSRule | ICSSPixelUnitRule
  @Prop({ type: String, default: null }) maxWidth!: ICSSRule | ICSSPixelUnitRule
  @Prop({ type: Function, default: null }) onLayerDidMount!: any
  @Prop({ type: Number, default: null }) responsiveMode!: ResponsiveMode

  get mergedLayerProps () {
    const { modalProps, onLayerDidMount } = this
    const mergedLayerProps: ILayerProps = {
      ...(modalProps ? modalProps.layerProps : { onLayerDidMount }),
    }
    if (onLayerDidMount && !mergedLayerProps.onLayerDidMount) {
      mergedLayerProps.onLayerDidMount = onLayerDidMount
    }
    return mergedLayerProps
  }

  get dragOptions () {
    const { modalProps } = this
    let dialogDraggableClassName: string | undefined
    let dragOptions: IDragOptions | undefined

    // if we are draggable, make sure we are using the correct
    // draggable classname and selectors
    if (modalProps && modalProps.dragOptions && !modalProps.dragOptions.dragHandleSelector) {
      dialogDraggableClassName = 'ms-Dialog-draggable-header'
      dragOptions = {
        ...modalProps.dragOptions,
        dragHandleSelector: `.${dialogDraggableClassName}`,
      }
    } else {
      dragOptions = modalProps && modalProps.dragOptions
    }
    return dragOptions
  }

  get mergedModalProps () {
    const { className, modalProps, dragOptions } = this
    return {
      className,
      ...DefaultModalProps,
      ...modalProps,
      layerProps: this.mergedLayerProps,
      dragOptions,
    }
  }

  get classNames () {
    const { styles, theme, mergedModalProps, hidden, minWidth, maxWidth } = this

    return getClassNames(styles!, {
      theme: theme!,
      className: mergedModalProps.className,
      hidden,
      dialogDefaultMinWidth: minWidth,
      dialogDefaultMaxWidth: maxWidth,
    })
  }

  render (h: CreateElement) {
    const { classNames, mergedModalProps, hidden, responsiveMode } = this
    const onDismiss = ev => this.$emit('dismiss', ev)

    const dialogContentProps: IDialogContentProps = {
      ...DefaultDialogContentProps,
      ...this.dialogContentProps,
      // draggableHeaderClassName: dialogDraggableClassName,
      titleProps: {
        // tslint:disable-next-line:deprecation
        id: this._getTitleTextId(),
        ...this.dialogContentProps?.titleProps,
      },
    }

    const $dialogContent = h(DialogContent, {
      attrs: {
        subTextId: this._getSubTextId(),
        title: dialogContentProps.title,
        subText: dialogContentProps.subText,
        showCloseButton: mergedModalProps.isBlocking,
        topButtonsProps: dialogContentProps.topButtonsProps,
        type: dialogContentProps.type,
        class: dialogContentProps.className,
        ...dialogContentProps,
      },
      on: {
        dismiss: onDismiss || dialogContentProps.onDismiss,
      },
    }, this.$slots.default)

    const $modal = h(Modal, {
      attrs: {
        responsiveMode: responsiveMode,
        ...mergedModalProps,
        isDarkOverlay: mergedModalProps.isDarkOverlay,
        isBlocking: mergedModalProps.isBlocking,
        isOpen: !hidden,
        class: classNames.root,
        containerClassName: classNames.main,
        subtitleAriaId: this._getSubTextId(),
        titleAriaId: this._getTitleTextId(),
      },
      on: {
        dismiss: onDismiss || dialogContentProps.onDismiss,
      },
    }, [
      $dialogContent,
    ])

    return $modal
  }

  private _getSubTextId (): string | undefined {
    return `${this.uid}-subText`
    // // tslint:disable-next-line:deprecation
    // const { ariaDescribedById, modalProps, dialogContentProps, subText } = this.props
    // let id = (modalProps && modalProps.subtitleAriaId) || ariaDescribedById

    // if (!id) {
    //   id = ((dialogContentProps && dialogContentProps.subText) || subText) && this._defaultSubTextId
    // }

    // return id
  };

  private _getTitleTextId (): string | undefined {
    return `${this.uid}-title`
    // // tslint:disable-next-line:deprecation
    // const { ariaLabelledById, modalProps, dialogContentProps, title } = this.props
    // let id = (modalProps && modalProps.titleAriaId) || ariaLabelledById

    // if (!id) {
    //   id = ((dialogContentProps && dialogContentProps.title) || title) && this._defaultTitleTextId
    // }

    // return id
  };
}
