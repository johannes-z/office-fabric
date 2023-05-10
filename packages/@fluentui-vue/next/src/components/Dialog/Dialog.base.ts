import { classNamesFunction } from '@fluentui-vue/utilities'
import { computed, defineComponent, h, toRefs } from 'vue'
import { Modal } from '../Modal'
import type { IDialogStyleProps, IDialogStyles } from './Dialog.types'
import { DialogContent } from './DialogContent'
import { useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IDialogStyleProps, IDialogStyles>()

export const DialogBase = defineComponent({
  name: 'DialogBase',

  props: {
    ...useStylingProps(),
    dialogContentProps: { type: Object, default: () => ({}) },
    hidden: { type: Boolean, default: !0 },
    modalProps: { type: Object, default: null },
    minWidth: { type: String, default: null },
    maxWidth: { type: String, default: null },
    onLayerDidMount: { type: Function, default: null },
    responsiveMode: { type: Number, default: null },
  },

  emits: [
    'dismiss',
  ],

  setup(props, { attrs, slots, emit }) {
    const {
      styles, theme, className, hidden, minWidth,
      maxWidth,
    } = toRefs(props)

    const isOpen = computed(() => !hidden.value)

    const mergedModalProps = computed(() => ({
      isOpen: isOpen.value,
    }))

    const dialogContentProps = computed(() => ({
      ...props.dialogContentProps,
      onDismiss: () => {
        emit('dismiss')
      },
    }))

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value!,
      hidden: hidden.value,
      dialogDefaultMinWidth: minWidth.value,
      dialogDefaultMaxWidth: maxWidth.value,
    }))

    const slotProps = computed(() => ({
      root: {
        ...mergedModalProps.value,
        class: classNames.value.root,
        containerClassName: classNames.value.main,
      },
      content: {
        ...dialogContentProps.value,
      },
    }))

    return () => h(Modal, slotProps.value.root, () => [
      h(DialogContent, slotProps.value.content, slots),
    ])
  },
})
