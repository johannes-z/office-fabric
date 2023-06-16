import { classNamesFunction } from '@fluentui-vue/utilities'
import type { VNode } from 'vue'
import { computed, defineComponent, h, ref, toRefs, watch } from 'vue'
import { ActionButton } from '../Button'
import { Icon } from '../Icon'
import type { INavLink, INavLinkGroup, INavStyleProps, INavStyles } from './Nav.types'
import { makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>()

// The number pixels per indentation level for Nav links.
const INDENTATION_SIZE = 14

// The number of pixels of left margin
const BASE_INDENT = 3

export function isRelativeUrl(url: string): boolean {
  // A URL is relative if it has no protocol.
  return !!url && !/^[a-z0-9+-.]:\/\//i.test(url)
}

export const NavBase = defineComponent({
  name: 'NavBase',

  props: {
    ...makeStylingProps(),

    groups: { type: Array as () => INavLinkGroup[], default: () => [] },
    isOnTop: { type: Boolean, default: false },
    selectedKey: { type: String, default: '' },
    initialSelectedKey: { type: String, default: '' },
  },

  setup(props, { attrs, emit }) {
    const {
      theme,
      styles,
      className,
      groups,
      selectedKey,
      isOnTop,
    } = toRefs(props)

    const isGroupCollapsed = ref({})
    const internalSelectedKey = ref('')
    const internalGroups = ref<INavLinkGroup[]>([])

    watch(groups, (value) => {
      internalGroups.value = value
    }, {
      immediate: true,
    })

    watch(selectedKey, (value) => {
      internalSelectedKey.value = value
    }, {
      immediate: true,
    })

    const onRenderGroup = (group: INavLinkGroup, groupIndex: number): VNode => {
      const classNames: any = computed(() => getClassNames(styles.value, {
        theme: theme.value,
        isGroup: true,
        isExpanded: isGroupExpanded(group),
        groups: groups.value,
      }))

      return h('div', { key: groupIndex }, [
        h('div', { class: classNames.value.groupContent }, [
          onRenderLinks(group.links, 0),
        ]),
      ])
    }

    const onRenderLinks = (links: INavLink[] | undefined, nestingLevel: number): VNode | null => {
      if (!links || !links.length)
        return null

      const classNames: any = computed(() => getClassNames(styles.value, {
        theme: theme.value,
        groups: groups.value,
      }))

      return h('ul', {
        class: classNames.value.navItems,
        role: 'list',
      }, links.map((link: INavLink, linkIndex: number) =>
        onRenderLink(link, linkIndex, nestingLevel),
      ))
    }

    const onRenderLink = (link: INavLink, linkIndex: number, nestingLevel: number): VNode => {
      const classNames: any = computed(() => getClassNames(styles.value, {
        theme: theme.value,
        groups: groups.value,
      }))

      return h('li', {
        key: link.key || linkIndex,
        class: classNames.value.navItem,
        role: 'listItem',
      }, [
        onRenderCompositeLink(link, linkIndex, nestingLevel),
        link.isExpanded && onRenderLinks(link.links, ++nestingLevel),
      ])
    }

    const onRenderCompositeLink = (link: INavLink, linkIndex: number, nestingLevel: number): VNode => {
      const classNames: any = computed(() => getClassNames(styles.value, {
        theme: theme.value,
        isExpanded: !!link.isExpanded,
        isSelected: false,
        isLink: true,
        isDisabled: link.disabled,
        position: INDENTATION_SIZE * nestingLevel + 1,
        groups: groups.value,
      }))

      return h('div', {
        key: linkIndex,
        class: classNames.value.compositeLink,
      }, [
        (link.links && link.links.length > 0)
        && h('button', {
          class: classNames.value.chevronButton,
          onClick: () => onLinkExpandClicked(link),
        }, [
          h(Icon, {
            class: classNames.value.chevronIcon,
            iconName: 'ChevronDown',
          }),
        ]),
        onRenderNavLink(link, linkIndex, nestingLevel),
      ])
    }

    const onRenderNavLink = (link: INavLink, linkIndex: number, nestingLevel: number): VNode => {
      const isSelected = computed(() => link.key === internalSelectedKey.value)
      const isLinkWithIcon = link.icon || link.iconProps

      const classNames = computed(() => getClassNames(styles.value, {
        theme: theme.value,
        isSelected: isSelected.value,
        isDisabled: link.disabled,
        isButtonEntry: link.onClick && !link.forceAnchor,
        leftPadding: INDENTATION_SIZE * nestingLevel + BASE_INDENT + (isLinkWithIcon ? 0 : 24),
        groups: groups.value,
      }))

      return h(ActionButton, {
        ...link,
        href: link.url || (link.forceAnchor ? '#' : undefined),
        title: link.title || link.name,
        target: link.target,
        disabled: link.disabled,
        className: classNames.value.link,
        onClick: (ev: PointerEvent) => onNavLinkClicked(link, ev),
      }, () => link.name)
    }

    const onLinkExpandClicked = (link: INavLink): void => {
      link.isExpanded = !link.isExpanded
    }

    const onNavLinkClicked = (link: INavLink, ev: PointerEvent): void => {
      if (link.onClick)
        link.onClick(ev, link)

      if (!link.url && link.links && link.links.length > 0)
        link.isExpanded = !link.isExpanded

      internalSelectedKey.value = link.key!
    }

    const preventBounce = (link: INavLink, ev: Event): void => {
      if (!link.href && link.forceAnchor)
        ev.preventDefault()
    }

    const isGroupExpanded = (group: INavLinkGroup): boolean => {
      if (group.name && Object.prototype.hasOwnProperty.call(isGroupCollapsed, group.name))
        return !isGroupCollapsed[group.name]

      if (group.collapseByDefault !== undefined)
        return !group.collapseByDefault

      return true
    }

    const toggleCollapsed = (group: INavLinkGroup): void => {
      if (group.name) {
        const newGroupCollapsed = {
          ...isGroupCollapsed,
          [group.name]: isGroupExpanded(group),
        }
        isGroupCollapsed.value = newGroupCollapsed
      }
    }

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      isOnTop: isOnTop.value,
      groups: internalGroups.value,
    }))

    return () => {
      return !internalGroups.value
        ? ''
        : h('nav', {
          class: classNames.value.root,
          role: 'navigation',
        }, internalGroups.value.map(onRenderGroup))
    }
  },

})
