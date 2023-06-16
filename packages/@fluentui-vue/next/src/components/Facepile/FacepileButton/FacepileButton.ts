import { computed, defineComponent, h, toRefs } from 'vue'
import { getStyles } from './FacepileButton.styles'
import { BaseButton } from '@/components/Button/BaseButton'
import { makeStylingProps } from '@/utils'

export const FacepileButton = defineComponent({
  name: 'FacepileButton',

  props: {
    ...makeStylingProps(),
  },

  setup(props, { attrs }) {
    const {
      theme,
      styles,
      className,
    } = toRefs(props)
    const internalStyles = computed(() => getStyles(theme.value, className.value, styles.value))

    return () => h(BaseButton, {
      ...attrs,
      props: {
        ...props,
        variantClassName: 'ms-Button--facepile',
        styles: internalStyles.value,
      },
    })
  },
})
