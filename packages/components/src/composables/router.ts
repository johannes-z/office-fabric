import {
  type ComputedRef,
  type PropType,
  type Ref,
  type SetupContext,
  computed,
  resolveDynamicComponent,
  toRef,
} from 'vue'
import type {
  RouteLocationRaw,
  UseLinkOptions,
  RouterLink as _RouterLink,
  useLink as _useLink,
} from 'vue-router'
import { type EventProp, hasEvent } from '@/utils'

export interface LinkProps {
  href: string | undefined
  replace: boolean | undefined
  to: RouteLocationRaw | undefined
  exact: boolean | undefined
}

export interface LinkListeners {
  onClick?: EventProp | undefined
  onClickOnce?: EventProp | undefined
}

export function makeRouterProps() {
  return {
    href: { type: String, default: undefined },
    to: { type: [String, Object] as PropType<RouteLocationRaw>, default: undefined },
    replace: { type: Boolean, default: false },
    exact: { type: Boolean, default: false },
  }
}

export interface UseLink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'> {
  isLink: ComputedRef<boolean>
  isClickable: ComputedRef<boolean>
  href: Ref<string | undefined>
}

export function useLink(props: LinkProps & LinkListeners, attrs: SetupContext['attrs']): UseLink {
  const RouterLink = resolveDynamicComponent('RouterLink') as typeof _RouterLink | string

  const isLink = computed(() => !!(props.href || props.to))
  const isClickable = computed(() => {
    return isLink?.value || hasEvent(attrs, 'click') || hasEvent(props, 'click')
  })

  if (typeof RouterLink === 'string') {
    return {
      isLink,
      isClickable,
      href: toRef(props, 'href'),
    }
  }

  const link = props.to ? RouterLink.useLink(props as UseLinkOptions) : undefined

  return {
    isLink,
    isClickable,
    route: link?.route,
    navigate: link?.navigate,
    isActive: link && computed(() => props.exact ? link.isExactActive?.value : link.isActive?.value),
    href: computed(() => props.to ? link?.route.value.href : props.href),
  }
}
