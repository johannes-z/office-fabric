<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ActionButton from '@/components/Button/ActionButton.vue'
import { CreateElement, VNode } from 'vue'
import BaseComponent from '../BaseComponent'
import { Icon } from '@/components/Icon/'
import { INavLinkGroup, INavLink, INavProps, INavStyles } from './Nav.types'

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
  @Prop() groups!: INavLinkGroup[]
  @Prop() selectedKey!: string

  isGroupCollapsed: { [key: string]: boolean } = {}
  internalSelectedKey: string = ''

  get baseStyles (): INavStyles {
    return {
      root: [
        'ms-Nav',
        this.$style.root,
      ],
      compositeLink: [
        'ms-Nav-compositeLink',
        this.$style.compositeLink,
      ],
      link: [
        'ms-Nav-link',
        this.$style.link,
      ],
      chevronIcon: [
        'ms-Nav-chevronIcon',
        this.$style.chevronIcon,
      ],
    }
  }

  render (): VNode | null {
    const { groups } = this
    if (!groups) {
      return null
    }
    const groupElements = this.groups.map(this.renderGroup)
    return (
      <nav role="navigation" {...this.css.root}>
        {groupElements}
      </nav>
    )
  }

  private renderGroup (group: INavLinkGroup, groupIndex: number): VNode {
    return (
      <div key={groupIndex}>
        <div class={this.$style.groupContent}>{this.renderLinks(group.links, 0)}</div>
      </div>
    )
  }

  private renderLinks (links: INavLink[] | undefined, nestingLevel: number): VNode | null {
    if (!links || !links.length) return null

    const linkElements: VNode[] = links.map((link: INavLink, linkIndex: number) =>
      this.renderLink(link, linkIndex, nestingLevel)
    )

    return (
      <ul role="list" class={this.$style.navItems}>
        {linkElements}
      </ul>
    )
  }

  private renderLink (link: INavLink, linkIndex: number, nestingLevel: number): VNode {
    return (
      <li key={link.key || linkIndex} role="listitem" class={this.$style.navItem}>
        {this.renderCompositeLink(link, linkIndex, nestingLevel)}
        {link.isExpanded ? this.renderLinks(link.links, ++nestingLevel) : null}
      </li>
    )
  }

  private renderCompositeLink (link: INavLink, linkIndex: number, nestingLevel: number): VNode {
    return (
      <div key={link.key || linkIndex} {...this.css.compositeLink}>
        {link.links && link.links.length > 0 ? (
          <button onClick={this.onLinkExpandClicked.bind(this, link)} class={this.$style.chevronButton}>
            <o-icon
              class={this.$style.chevronIcon}
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
    const isSelected = (link.key || linkIndex) === this.selectedKey
    const isLinkWithIcon = link.icon || link.iconProps
    return (
      <action-button
        href={link.url || (link.forceAnchor ? '#' : undefined)}
        title={link.title || link.name}
        target={link.target}
        disabled={link.disabled}
        nativeOnClick={this.onNavLinkClicked.bind(this, link)}
        class={[this.$style.link, isSelected && this.$style.selected]}
        style={{ paddingLeft: `${INDENTATION_SIZE * nestingLevel + BASE_INDENT + (isLinkWithIcon ? 0 : 24)}px` }}>
        {link.name}
      </action-button>
    )
  }

  private onNavLinkClicked (link: INavLink) {
    if (link.onClick) link.onClick(link)
  }

  private preventBounce (link: INavLink, ev: Event): void {
    if (!link.url && link.forceAnchor) ev.preventDefault()
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
</script>

<style lang="scss" module>
.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  user-select: none;
}
.groupContent {
  display: block;
  margin-bottom: 40px;
  animation-name: css-0, css-13;
  animation-duration: 0.367s;
  animation-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
  animation-fill-mode: both;
}

.navItems {
  list-style-type: none;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
}
.navItem {
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}
.compositeLink {
  display: block;
  position: relative;
  color: rgb(50, 49, 48);

  &:hover {
    .link {
      background-color: rgb(243, 242, 241);
    }
  }
}
.link {
  position: relative;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
  display: block;
  cursor: pointer;
  vertical-align: top;
  padding-top: 0px;
  padding-right: 20px;
  padding-bottom: 0px;
  padding-left: 27px;
  height: 44px;
  color: rgb(50, 49, 48);
  background-color: transparent;
  width: 100%;
  line-height: 44px;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  outline: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  text-decoration: none;
  border-radius: 2px;
  overflow: hidden;

  &:hover {
    color: rgb(0, 120, 212);
  }

  &.selected {
    &:after {
      content: "";
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      pointer-events: none;
      border-left: 2px solid rgb(0, 120, 212);
    }
  }
}
.chevronButton {
  position: absolute;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 12px;
  font-weight: 400;
  display: block;
  text-align: left;
  line-height: 44px;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  color: rgb(50, 49, 48);
  background-color: transparent;
  width: 26px;
  height: 42px;
  top: 1px;
  left: 1px;
  z-index: 1;
  outline: transparent;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  overflow: hidden;
}
.chevronIcon {
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  font-style: normal;
  font-weight: normal;
  speak: none;
  font-family: FabricMDL2Icons;
  position: absolute;
  left: 8px;
  height: 44px;
  line-height: 44px;
  font-size: 12px;
  top: 0px;
  transition: transform 0.1s linear 0s;
}
</style>
