import { classNamesFunction, css } from '@fluentui-vue/utilities'
import { h } from 'vue'
import { IconButton } from '../Button'
import type { IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types'
import { DialogType } from './DialogContent.types'
import { defineFunctionalComponent, makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IDialogContentStyleProps, IDialogContentStyles>()

export const DialogContentBase = defineFunctionalComponent({
  name: 'DialogContentBase',

  props: {
    ...makeStylingProps(),

    type: { type: Number, default: DialogType.normal },
    draggableHeaderClassName: { type: String, default: null },
    titleProps: { type: Object, default: () => ({}) },
    title: { type: [String, Object], default: null },
    showCloseButton: { type: Boolean, default: !1 },
    closeButtonAriaLabel: { type: String, default: 'Close' },
    subText: { type: String, default: null },
    subTextId: { type: String, default: null },
    topButtonsProps: { type: Array },
    onDismiss: { type: Function, default: undefined },
  },

  render(props, { attrs, slots }) {
    const {
      showCloseButton,
      className,
      closeButtonAriaLabel,
      onDismiss,
      subTextId,
      subText,
      titleProps = {},
      titleId,
      title,
      type,
      styles,
      theme,
      draggableHeaderClassName,
      topButtonsProps = [],
    } = props

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isLargeHeader: type === DialogType.largeHeader,
      isClose: type === DialogType.close,
      draggableHeaderClassName,
    })

    // const groupings = groupChildren();
    let subTextContent
    if (subText) {
      subTextContent = h('p', {
        class: classNames.subText,
        id: subTextId,
      }, subText)
    }

    const slotProps = {
      content: {
        class: classNames.content,
      },
      header: {
        class: classNames.header,
      },
      title: {
        id: titleId,
        role: 'heading',
        'aria-level': 1,
        ...titleProps,
        class: css(classNames.title, titleProps.className),
      },
      topButton: {
        class: classNames.topButton,
      },
      inner: {
        class: classNames.inner,
      },
      innerContent: {
        class: classNames.innerContent,
      },
      button: {
        class: classNames.button,
        iconProps: { iconName: 'Cancel' },
        'aria-label': closeButtonAriaLabel,
        onClick: onDismiss,
      },
    }

    return h('div', slotProps.content, [
      h('div', slotProps.header, [
        h('div', slotProps.title, title),
        h('div', slotProps.topButton, [
          topButtonsProps.map((props: any, index) => h(IconButton, { key: props.uniqueId || index, ...props })),
          (type === DialogType.close || (showCloseButton && type !== DialogType.largeHeader)) && h(IconButton, slotProps.button),
        ]),
      ]),
      h('div', slotProps.inner, {
        default: () => [
          h('div', slotProps.innerContent, [
            subTextContent,
          ]),
          slots.default?.({}),
        ],
      }),
    ])

    // return (
    //   <div class={classNames.content}>
    //     <div class={classNames.header}>
    //       <div
    //         id={titleId}
    //         role="heading"
    //         aria-level={1}
    //         {...titleProps}
    //         className={css(classNames.title, titleProps.className)}
    //       >
    //         {title}
    //       </div>
    //       <div class={classNames.topButton}>
    //         {topButtonsProps.map((props, index) => (
    //           <IconButton key={props.uniqueId || index} {...props} />
    //         ))}
    //         {(type === DialogType.close || (showCloseButton && type !== DialogType.largeHeader)) && (
    //           <IconButton
    //             class={classNames.button}
    //             iconProps={{ iconName: 'Cancel' }}
    //             ariaLabel={closeButtonAriaLabel}
    //             onClick={onDismiss as any}
    //           />
    //         )}
    //       </div>
    //     </div>

    //     <div class={classNames.inner}>
    //       <div class={classNames.innerContent}>
    //         {subTextContent}
    //         {/* {groupings.contents} */}
    //       </div>
    //       {/* {groupings.footers} */}
    //     </div>
    //   </div>
    // )
  },
})
