import { classNamesFunction } from '@fluentui-vue/utilities'
import { computed, h, toRefs, watch } from 'vue'
import type { IOverlayStyleProps, IOverlayStyles } from './Overlay.types'
import { asSlotProps, defineFunctionalComponent, makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IOverlayStyleProps, IOverlayStyles>()

export const OverlayBase = defineFunctionalComponent({
  name: 'OverlayBase',

  props: {
    ...makeStylingProps(),
    dark: { type: Boolean, default: false },
    isDarkThemed: { type: Boolean, default: false },
  },

  render(props, { attrs, slots }) {
    const { theme, styles, className, dark, isDarkThemed } = toRefs(props)

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value!,
      isDark: dark.value || isDarkThemed.value,
    }))

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        class: classNames.value.root,
      },
    }))

    watch([dark, isDarkThemed], () => {
      console.log('dark changed')
    });

    return h('div', slotProps.value.root, slots)
  },
})
