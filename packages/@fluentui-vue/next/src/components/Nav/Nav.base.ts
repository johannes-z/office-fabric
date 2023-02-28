import type { CreateElement, VNode } from 'vue'
import Vue, { defineComponent, h } from 'vue'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { ActionButton } from '../Button'
import { Icon } from '../Icon'
import type { INavLink, INavLinkGroup, INavStyleProps, INavStyles } from './Nav.types'
import { INavProps } from './Nav.types'
import { useStylingProps } from '@/utils'

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

  components: {
    ActionButton,
    Icon,
  },

  props: {
    ...useStylingProps(),

    groups: { type: Array as () => INavLinkGroup[], default: () => [] },
    selectedKey: { type: String, default: '' },
    isOnTop: { type: Boolean, default: false },
  },

  data() {
    return {
      isGroupCollapsed: {},
      internalSelectedKey: '',
    }
  },

  watch: {
    selectedKey(value) {
      this.internalSelectedKey = this.selectedKey
    },
  },

  created() {
    this.internalSelectedKey = this.selectedKey ?? ''
  },

  methods: {
    renderGroup(group: INavLinkGroup, groupIndex: number): VNode {
      const { groups, theme } = this
      const classNames: any = getClassNames(this.styles, {
        theme: theme!,
        isGroup: true,
        isExpanded: this.isGroupExpanded(group),
        groups,
      })

      return h('div', { key: groupIndex }, [
        h('div', { class: classNames.groupContent }, [
          this.renderLinks(group.links, 0),
        ]),
      ])
    },

    renderLinks(links: INavLink[] | undefined, nestingLevel: number): VNode | null {
      if (!links || !links.length)
        return null

      const linkElements: VNode[] = links.map((link: INavLink, linkIndex: number) =>
        this.renderLink(link, linkIndex, nestingLevel),
      )

      const { groups, theme } = this
      const classNames: any = getClassNames(this.styles, { theme: theme!, groups })

      return h('ul', {
        class: classNames.navItems,
        role: 'list',
      }, linkElements)
    },

    renderLink(link: INavLink, linkIndex: number, nestingLevel: number): VNode {
      const { groups, theme } = this
      const classNames: any = getClassNames(this.styles, { theme: theme!, groups })

      return h('li', {
        key: linkIndex,
        class: classNames.navItem,
        role: 'listItem',
      }, [
        this.renderCompositeLink(link, linkIndex, nestingLevel),
        link.isExpanded && this.renderLinks(link.links, ++nestingLevel),
      ])
    },

    renderCompositeLink(link: INavLink, linkIndex: number, nestingLevel: number): VNode {
      const { styles, groups, theme } = this
      const classNames: any = getClassNames(styles, {
        theme: theme!,
        isExpanded: !!link.isExpanded,
        isSelected: false,
        isLink: true,
        isDisabled: link.disabled,
        position: INDENTATION_SIZE * nestingLevel + 1,
        groups,
      })

      return h('div', {
        key: linkIndex,
        class: classNames.compositeLink,
      }, [
        (link.links && link.links.length > 0)
        && h('button', {
          class: classNames.chevronButton,
          onClick: this.onLinkExpandClicked.bind(this, link),
        }, [
          h(Icon, {
            style: link.isExpanded ? { transform: 'rotate(-180deg)' } : {},
            class: classNames.chevronIcon,
            iconName: 'ChevronDown',
          }),
        ]),
        this.renderNavLink(link, linkIndex, nestingLevel),
      ])
    },

    onLinkExpandClicked(link: INavLink): void {
      link.isExpanded = !link.isExpanded
    },

    renderNavLink(link: INavLink, linkIndex: number, nestingLevel: number): VNode {
      const isSelected = link.key === this.internalSelectedKey
      const isLinkWithIcon = link.icon || link.iconProps

      const { groups, theme } = this

      const classNames: any = getClassNames(this.styles, {
        theme: theme!,
        isSelected,
        isDisabled: link.disabled,
        isButtonEntry: link.onClick && !link.forceAnchor,
        leftPadding: INDENTATION_SIZE * nestingLevel + BASE_INDENT + (isLinkWithIcon ? 0 : 24),
        groups,
      })

      return h(ActionButton, {
        href: link.url || (link.forceAnchor ? '#' : undefined),
        title: link.title || link.name,
        target: link.target,
        disabled: link.disabled,
        className: classNames.link,
        style: { paddingLeft: `${INDENTATION_SIZE * nestingLevel + BASE_INDENT + (isLinkWithIcon ? 0 : 24)}px` },
        onClick: this.onNavLinkClicked.bind(this, link),
      }, () => link.name)
    },

    onNavLinkClicked(link: INavLink, ev: MouseEvent): void {
      if (link.onClick)
        link.onClick(ev, link)

      if (!link.url && link.links && link.links.length > 0)
        link.isExpanded = !link.isExpanded

      this.internalSelectedKey = link.key!
    },

    preventBounce(link: INavLink, ev: Event): void {
      if (!link.href && link.forceAnchor)
        ev.preventDefault()
    },

    isGroupExpanded(group: INavLinkGroup): boolean {
      if (group.name && Object.prototype.hasOwnProperty.call(this.isGroupCollapsed, group.name))
        return !this.isGroupCollapsed[group.name]

      if (group.collapseByDefault !== undefined)
        return !group.collapseByDefault

      return true
    },

    toggleCollapsed(group: INavLinkGroup): void {
      if (group.name) {
        const newGroupCollapsed = {
          ...this.isGroupCollapsed,
          [group.name]: this.isGroupExpanded(group),
        }
        this.isGroupCollapsed = newGroupCollapsed
        // this.$set(this, 'isGroupCollapsed', newGroupCollapsed)
      }
    },
  },

  render(): any {
    const { theme, className, isOnTop, groups } = this
    if (!groups)
      return ''

    const groupElements = this.groups.map(this.renderGroup)

    const classNames: any = getClassNames(this.styles, { theme: theme!, className, isOnTop, groups })

    return h('nav', {
      class: classNames.root,
      role: 'navigation',
    }, groupElements)
  },

})
