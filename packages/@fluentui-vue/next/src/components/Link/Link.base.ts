import { classNamesFunction } from '@fluentui-vue/utilities'
import { computed, defineComponent, h, toRefs } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils/'
import { makeRouterProps, useLink } from '@/composables'

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>()

export const LinkBase = defineComponent({
  props: {
    ...useStylingProps(),
    ...makeRouterProps(),

    as: { type: String, default: undefined },
    underline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: '' },
    target: { type: String, default: undefined },
  },

  setup(props, { attrs, slots }) {
    const { styles, theme, as, to, target, className, href, disabled, underline } = toRefs(props)

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      isButton: !href.value,
      isDisabled: disabled.value,
      isUnderlined: underline.value,
    }))

    const rootType = computed(() => to.value
      ? RouterLink
      : (as.value || (href.value ? 'a' : 'button')))

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        class: classNames.value.root,
        ...rootType.value !== 'button' && {
          target: target.value,
          href: disabled.value ? undefined : href.value,
        },
        ...rootType.value === 'button' && {
          type: 'button',
          disabled: disabled.value,
        },
        ...to.value && {
          href: disabled.value ? undefined : props.href,
          to: disabled.value ? undefined : props.to,
          exact: props.exact,
          replace: props.replace,
        },
      },
    }))

    return () => h(rootType.value, slotProps.value.root, slots)
  },
})
