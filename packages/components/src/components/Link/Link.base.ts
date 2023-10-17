import { classNamesFunction } from '@fluentui-vue/utilities'
import { computed, defineComponent, h, toRefs } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { ILinkStyleProps, ILinkStyles } from './Link.types'
import { asSlotProps, makeStylingProps } from '@/utils/'
import { makeRouterProps } from '@/composables'

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>()

export const LinkBase = defineComponent({
  name: 'Link',

  props: {
    ...makeStylingProps(),
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

    const rootType = computed(() => as.value || (to.value ? RouterLink : (href.value ? 'a' : 'button')))

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
          href: disabled.value ? undefined : useRouter().resolve(to.value).href,
          to: disabled.value ? undefined : props.to,
          exact: props.exact,
          replace: props.replace,
        },
      },
    }))

    return () => h(rootType.value, slotProps.value.root, slots)
  },
})
