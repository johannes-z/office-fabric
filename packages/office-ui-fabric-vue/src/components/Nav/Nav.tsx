import { Vue, Component, Prop } from 'vue-property-decorator'
import { ActionButton } from '../Button/'
import { CreateElement, VNode } from 'vue'
import BaseComponent from '../BaseComponent'
import { Icon } from '../Icon/'
import { INavLinkGroup, INavLink, INavProps, INavStyles } from './Nav.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { h } from '@vue/composition-api'

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

    return (
      <nav role="navigation" class={classNames.root}>
        {groupElements}
      </nav>
    )
  }

  private renderGroup (group: INavLinkGroup, groupIndex: number): VNode {
    const { groups, theme } = this
    const classNames: any = getClassNames(this.styles, {
      theme: theme!,
      isGroup: true,
      isExpanded: this.isGroupExpanded(group),
      groups,
    })

    return (
      <div key={groupIndex}>
        <div class={classNames.groupContent}>{this.renderLinks(group.links, 0)}</div>
      </div>
    )
  }

  private renderLinks (links: INavLink[] | undefined, nestingLevel: number): VNode | null {
    if (!links || !links.length) return null

    const linkElements: VNode[] = links.map((link: INavLink, linkIndex: number) =>
      this.renderLink(link, linkIndex, nestingLevel),
    )

    const { groups, theme } = this
    const classNames: any = getClassNames(this.styles, { theme: theme!, groups })

    return (
      <ul role="list" class={classNames.navItems}>
        {linkElements}
      </ul>
    )
  }

  private renderLink (link: INavLink, linkIndex: number, nestingLevel: number): VNode {
    const { groups, theme } = this
    const classNames: any = getClassNames(this.styles, { theme: theme!, groups })

    return (
      <li key={linkIndex} role="listitem" class={classNames.navItem}>
        {this.renderCompositeLink(link, linkIndex, nestingLevel)}
        {link.isExpanded ? this.renderLinks(link.links, ++nestingLevel) : null}
      </li>
    )
  }

  private renderCompositeLink (link: INavLink, linkIndex: number, nestingLevel: number): VNode {
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

    return (
      <div key={linkIndex} class={classNames.compositeLink}>
        {link.links && link.links.length > 0 ? (
          <button onClick={this.onLinkExpandClicked.bind(this, link)} class={classNames.chevronButton}>
            <Icon
              class-name={classNames.chevronIcon}
              // @ts-ignore
              style={link.isExpanded && { transform: 'rotate(-180deg)' }}
              icon-name="ChevronDown" />
          </button>
        ) : null}
        {this.renderNavLink(link, linkIndex, nestingLevel)}
      </div>
    )
  }

  private onLinkExpandClicked (link: INavLink) {
    link.isExpanded = !link.isExpanded
  }

  private renderNavLink (link: INavLink, linkIndex: number, nestingLevel: number): VNode {
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

    return (
      <ActionButton
        // @ts-ignore
        href={link.href || (link.forceAnchor ? '#' : undefined)}
        title={link.title || link.name}
        target={link.target}
        disabled={link.disabled}
        nativeOnClick={this.onNavLinkClicked.bind(this, link, linkIndex)}
        class={[classNames.link, isSelected && classNames.selected]}
        style={{ paddingLeft: `${INDENTATION_SIZE * nestingLevel + BASE_INDENT + (isLinkWithIcon ? 0 : 24)}px` }}>
        {link.name}
      </ActionButton>
    )
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
