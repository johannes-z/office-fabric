import { classNamesFunction, css } from '@fluentui-vue/utilities'
import { h } from 'vue'
import { IconButton } from '../Button'
import type { IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types'
import { DialogType } from './DialogContent.types'
import { useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IDialogContentStyleProps, IDialogContentStyles>()

export const DialogContentBase = (props, { attrs, slots }) => {
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
    subTextContent = (
      <p className={classNames.subText} id={subTextId}>
        {subText}
      </p>
    )
  }

  return (
    <div class={classNames.content}>
      <div class={classNames.header}>
        <div
          id={titleId}
          role="heading"
          aria-level={1}
          {...titleProps}
          className={css(classNames.title, titleProps.className)}
        >
          {title}
        </div>
        <div class={classNames.topButton}>
          {topButtonsProps.map((props, index) => (
            <IconButton key={props.uniqueId || index} {...props} />
          ))}
          {(type === DialogType.close || (showCloseButton && type !== DialogType.largeHeader)) && (
            <IconButton
              class={classNames.button}
              iconProps={{ iconName: 'Cancel' }}
              ariaLabel={closeButtonAriaLabel}
              onClick={onDismiss as any}
            />
          )}
        </div>
      </div>

      <div class={classNames.inner}>
        <div class={classNames.innerContent}>
          {subTextContent}
          {/* {groupings.contents} */}
        </div>
        {/* {groupings.footers} */}
      </div>
    </div>
  )
}

DialogContentBase.props = Object.keys({
  ...useStylingProps(),
  type: { type: Number, default: DialogType.normal },
  draggableHeaderClassName: { type: String, default: null },
  titleProps: { type: Object, default: () => ({}) },
  title: { type: [String, Object], default: null },
  showCloseButton: { type: Boolean, default: !1 },
  closeButtonAriaLabel: { type: String, default: 'Close' },
  subText: { type: String, default: null },
  subTextId: { type: String, default: null },
  topButtonsProps: { type: Array },
})

//  _groupChildren(): { footers: any[]; contents: any[] } {
//   const groupings: { footers: any[]; contents: any[] } = {
//     footers: [],
//     contents: [],
//   };

//   React.Children.map(this.props.children, child => {
//     if (typeof child === 'object' && child !== null && (child as any).type === DialogFooterType) {
//       groupings.footers.push(child);
//     } else {
//       groupings.contents.push(child);
//     }
//   });

//   return groupings;
// }
// }
