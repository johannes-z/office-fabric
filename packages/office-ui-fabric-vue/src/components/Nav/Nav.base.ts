import { Vue, Component, Prop } from 'vue-property-decorator'
import { ActionButton } from '../Button'
import { CreateElement, VNode } from 'vue'
import BaseComponent from '../BaseComponent'
import { Icon } from '../Icon'
import { INavLinkGroup, INavLink, INavProps, INavStyles } from './Nav.types'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames: any = classNamesFunction()

// The number pixels per indentation level for Nav links.
const INDENTATION_SIZE = 14

// The number of pixels of left margin
const BASE_INDENT = 3

export function isRelativeUrl (url: string): boolean {
  // A URL is relative if it has no protocol.
  return !!url && !/^[a-z0-9+-.]:\/\//i.test(url)
}

@Component({
  components: { ActionButton, Icon },
})
export default class Nav extends BaseComponent<INavProps, INavStyles> {
  @Prop({ type: Array, default: () => [] }) groups!: INavLinkGroup[]
  @Prop({ type: String, default: '' }) selectedKey!: string
  @Prop({ type: Boolean, default: false }) isOnTop!: boolean

  isGroupCollapsed: { [key: string]: boolean } = {}
  internalSelectedKey: string = ''

  render (h: CreateElement): VNode | null {
    const { theme, className, isOnTop, groups } = this
    if (!groups) {
      return null
    }
    const groupElements = this.groups.map(this.renderGroup)

    const classNames: any = getClassNames(this.styles, { theme: theme!, className, isOnTop, groups })

    return h('nav', {
      class: classNames.root,
      attrs: { role: 'navigation' },
    }, groupElements)
  }

  private renderGroup (group: INavLinkGroup, groupIndex: number): VNode {
    const h = this.$createElement
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
  }

  private renderLinks (links: INavLink[] | undefined, nestingLevel: number): VNode | null {
    if (!links || !links.length) return null
    const h = this.$createElement

    const linkElements: VNode[] = links.map((link: INavLink, linkIndex: number) =>
      this.renderLink(link, linkIndex, nestingLevel),
    )

    const { groups, theme } = this
    const classNames: any = getClassNames(this.styles, { theme: theme!, groups })

    return h('ul', {
      class: classNames.navItems,
      attrs: { role: 'list' },
    }, linkElements)
  }

  private renderLink (link: INavLink, linkIndex: number, nestingLevel: number): VNode {
    const h = this.$createElement
    const { groups, theme } = this
    const classNames: any = getClassNames(this.styles, { theme: theme!, groups })

    return h('li', {
      key: linkIndex,
      class: classNames.navItem,
      attrs: { role: 'listItem' },
    }, [
      this.renderCompositeLink(link, linkIndex, nestingLevel),
      link.isExpanded && this.renderLinks(link.links, ++nestingLevel),
    ])
  }

  private renderCompositeLink (link: INavLink, linkIndex: number, nestingLevel: number): VNode {
    const h = this.$createElement
    const { styles, groups, theme } = this
    const classNames: any = getClassNames(this.styles, {
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
      (link.links && link.links.length > 0) &&
      h('button', {
        class: classNames.chevronButton,
        on: {
          click: this.onLinkExpandClicked.bind(this, link),
        },
      }, [
        h(Icon, {
          style: link.isExpanded ? { transform: 'rotate(-180deg)' } : {},
          class: classNames.chevronIcon,
          props: {
            iconName: 'ChevronDown',
          },
        }),
      ]),
      this.renderNavLink(link, linkIndex, nestingLevel),
    ])
  }

  private onLinkExpandClicked (link: INavLink) {
    link.isExpanded = !link.isExpanded
  }

  private renderNavLink (link: INavLink, linkIndex: number, nestingLevel: number): VNode {
    const h = this.$createElement
    const isSelected = link.key === this.internalSelectedKey
    const isLinkWithIcon = link.icon || link.iconProps

    const { groups, theme } = this

    const classNames: any = getClassNames(this.styles, {
      theme: theme!,
      isSelected: isSelected,
      isDisabled: link.disabled,
      isButtonEntry: link.onClick && !link.forceAnchor,
      leftPadding: INDENTATION_SIZE * nestingLevel + BASE_INDENT + (isLinkWithIcon ? 0 : 24),
      groups,
    })

    return h(ActionButton, {
      attrs: {
        href: link.href || (link.forceAnchor ? '#' : undefined),
        title: link.title || link.name,
        target: link.target,
        disabled: link.disabled,
        className: classNames.link,
      },
      style: { paddingLeft: `${INDENTATION_SIZE * nestingLevel + BASE_INDENT + (isLinkWithIcon ? 0 : 24)}px` },
      nativeOn: {
        click: this.onNavLinkClicked.bind(this, link, linkIndex),
      },
    }, link.name)
  }

  private onNavLinkClicked (link: INavLink, linkIndex: number) {
    if (link.onClick) link.onClick(link)

    if (!link.url && link.links && link.links.length > 0) {
      link.isExpanded = !link.isExpanded
    }
    this.internalSelectedKey = link.key!
  }

  private preventBounce (link: INavLink, ev: Event): void {
    if (!link.href && link.forceAnchor) ev.preventDefault()
  }

  private isGroupExpanded (group: INavLinkGroup): boolean {
    if (group.name && this.isGroupCollapsed.hasOwnProperty(group.name)) {
      return !this.isGroupCollapsed[group.name]
    }
    if (group.collapseByDefault !== undefined) {
      return !group.collapseByDefault
    }
    return true
  }

  private toggleCollapsed (group: INavLinkGroup): void {
    if (group.name) {
      const newGroupCollapsed = {
        ...this.isGroupCollapsed,
        [group.name]: this.isGroupExpanded(group),
      }
      this.$set(this, 'isGroupCollapsed', newGroupCollapsed)
    }
  }
}
