import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'

import { classNamesFunction } from '@uifabric-vue/utilities'
import { IDialogContentStyleProps, IDialogContentStyles, IDialogContentProps, DialogType } from './DialogContent.types'
import { IconButton } from '../Button'

const getClassNames = classNamesFunction<IDialogContentStyleProps, IDialogContentStyles>()

@Component
export class DialogContentBase extends BaseComponent<IDialogContentProps> {
  @Prop({ type: Number, default: DialogType.normal }) type!: DialogType
  @Prop({ type: String, default: null }) draggableHeaderClassName!: string
  @Prop({ type: Object, default: () => {} }) titleProps !: any
  @Prop({ type: [String, Object], default: null }) title!: string | any
  @Prop({ type: Boolean, default: false }) showCloseButton!: boolean
  @Prop({ type: String, default: 'Close' }) closeButtonAriaLabel!: string

  @Prop({ type: String, default: null }) subText!: string
  @Prop({ type: String, default: null }) subTextId!: string

  get classNames () {
    const { styles, theme, className, type, draggableHeaderClassName } = this
    return getClassNames(styles!, {
      theme: theme!,
      className,
      isLargeHeader: type === DialogType.largeHeader,
      isClose: type === DialogType.close,
      draggableHeaderClassName,
    })
  }

  render () {
    const { classNames, css, title, type, showCloseButton, closeButtonAriaLabel, subText, subTextId } = this

    const titleProps = this.titleProps || {}

    let subTextContent
    if (subText) {
      subTextContent = (
        <p class={classNames.subText} id={subTextId}>
          {subText}
        </p>
      )
    }

    return (
      <div class={classNames.content}>
        <div class={classNames.header}>
          <div
            id={titleProps.id}
            role="heading"
            aria-level={1}
            {...titleProps}
            class={css(classNames.title, titleProps.className)}
          >
            {title}
          </div>
          <div class={classNames.topButton}>
            {/* {this.topButtonsProps!.map((props, index) => (
              <IconButton key={props.uniqueId || index} {...props} />
            ))} */}
            {(type === DialogType.close || (showCloseButton && type !== DialogType.largeHeader)) && (
              <IconButton
                class={classNames.button}
                iconProps={{ iconName: 'Cancel' }}
                ariaLabel={closeButtonAriaLabel}
                onClick={ev => this.$emit('dismiss', ev)}
                title={closeButtonAriaLabel}
              />
            )}
          </div>
        </div>
        <div class={classNames.inner}>
          <div class={classNames.innerContent}>
            {subTextContent}
            {this.$slots.default}
          </div>
          {this.$slots.footer}
        </div>
      </div>
    )
  }
}
