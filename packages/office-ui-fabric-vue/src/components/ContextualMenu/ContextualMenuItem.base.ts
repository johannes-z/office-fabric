import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import Icon from '../Icon/Icon'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { h } from '@vue/composition-api'

const getClassNames = classNamesFunction(

)
@Component({
  components: {},
})
export class ContextualMenuItemBase extends BaseComponent {
  @Prop({ type: Object, default: () => {} }) item!: any

  get classNames (): any {
    return getClassNames(this.styles, {
      theme: this.theme,
    })
  }

  public render () {
    const { item, classNames } = this

    return h('button', { class: classNames.root }, [
      h('div', { class: item.split ? classNames.linkContentMenu : classNames.linkContent }, [
        this.renderCheckMarkIcon(this),
        this.renderItemIcon(this),
        this.renderItemName(this),
        this.renderSecondaryText(this),
        this.renderSubMenuIcon(this),
      ]),
    ])
  }

  public openSubMenu = (): void => {
    const { item, openSubMenu } = this
    // if (getSubmenuTarget) {
    //   const submenuTarget = getSubmenuTarget()
    //   // if (hasSubmenu(item) && openSubMenu && submenuTarget) {
    //   //   openSubMenu(item, submenuTarget)
    //   // }
    // }
  };

  public dismissSubMenu (): void {
    // const { item, dismissSubMenu } = this
    // if (hasSubmenu(item) && dismissSubMenu) {
    //   dismissSubMenu()
    // }
  };

  public dismissMenu (dismissAll?: boolean): void {
    // const { dismissMenu } = this.props
    // if (dismissMenu) {
    //   dismissMenu(undefined /* ev */, dismissAll)
    // }
  };

  renderItemIcon (props: any) {
    const { item, hasIcons, classNames } = props

    const { iconProps } = item

    if (!hasIcons) {
      return null
    }

    if (item.onRenderIcon) {
      return item.onRenderIcon(props)
    }

    return h(Icon, {
      class: classNames.icon,
      props: iconProps,
    })
  }

  renderCheckMarkIcon ({ onCheckmarkClick, item, classNames }: any) {
    const isItemChecked = false// getIsChecked(item)
    if (onCheckmarkClick) {
    // Ensures that the item is passed as the first argument to the checkmark click callback.
      const onClick = (e: any) => onCheckmarkClick(item, e)

      return h(Icon, {
        class: classNames.checkmarkIcon,
        attrs: {
          iconName: item.canCheck !== false && isItemChecked ? 'CheckMark' : '',
        },
        on: {
          click: onClick,
        },
      })
    }
    return null
  }

  renderItemName ({ item, classNames }: any) {
    if (item.text || item.name) {
      return h('span', { class: classNames.label }, item.text || item.name)
    }
    return null
  }

  renderSecondaryText ({ item, classNames }: any) {
    if (item.secondaryText) {
      return h('span', { class: classNames.secondaryText }, item.secondaryText)
    }
    return null
  }

  renderSubMenuIcon ({ item, classNames, theme }: any) {
    // if (hasSubmenu(item)) {
    //   return <Icon iconName={getRTL(theme) ? 'ChevronLeft' : 'ChevronRight'} {...item.submenuIconProps} class={classNames.subMenuIcon} />
    // }
    return null
  }
}
