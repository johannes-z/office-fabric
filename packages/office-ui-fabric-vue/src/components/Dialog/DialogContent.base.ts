import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'

import { classNamesFunction } from '@uifabric-vue/utilities'
import { IDialogContentStyleProps, IDialogContentStyles, IDialogContentProps, DialogType } from './DialogContent.types'
import { IconButton } from '../Button'
import { CreateElement } from 'vue'

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

  render (h: CreateElement) {
    const { classNames, css, title, type, showCloseButton, closeButtonAriaLabel, subText, subTextId } = this

    const titleProps = this.titleProps || {}

    const $subTextContent = subText && h('p', {
      class: classNames.subText,
      attrs: { id: subTextId },
    }, subText)

    const $inner = h('div', { class: classNames.inner }, [
      h('div', { class: classNames.innerContent }, [
        $subTextContent,
        this.$slots.default,
      ]),
      this.$slots.footer,
    ])

    const $title = h('div', {
      class: css(classNames.title, titleProps.className),
      attrs: {
        role: 'heading',
        'aria-level': 1,
        ...titleProps,
      },
    }, title)

    const $topButton = h('div', { class: classNames.topButton }, [
      (type === DialogType.close || (showCloseButton && type !== DialogType.largeHeader)) && h(IconButton, {
        class: classNames.button,
        attrs: {
          iconProps: { iconName: 'Cancel' },
          ariaLabel: closeButtonAriaLabel,
          title: closeButtonAriaLabel,
        },
        on: {
          click: ev => this.$emit('dismiss', ev),
        },
      }),
    ])

    return h('div', { class: classNames.content }, [
      h('div', { class: classNames.header }, [
        $title,
        $topButton,
      ]),
      $inner,
    ])
  }
}
