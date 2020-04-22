import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import Icon from '../Icon/Icon'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction(

)
@Component({
  components: {},
})
export default class ContextualMenuItem extends BaseComponent {
  @Prop({ type: Object, default: () => {} }) item!: any

  get classNames (): any {
    return getClassNames(this.styles, {
      theme: this.theme,
    })
  }

  public render () {
    const { item, classNames } = this
    console.log(classNames)

    return (
      <button class={classNames.root}>
        <div class={item.split ? classNames.linkContentMenu : classNames.linkContent}>
          {this.renderCheckMarkIcon(this)}
          {this.renderItemIcon(this)}
          {this.renderItemName(this)}
          {this.renderSecondaryText(this)}
          {this.renderSubMenuIcon(this)}
        </div>
      </button>
    )
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

    return <Icon {...iconProps} class={classNames.icon} />
  }

  renderCheckMarkIcon ({ onCheckmarkClick, item, classNames }: any) {
    const isItemChecked = false// getIsChecked(item)
    if (onCheckmarkClick) {
    // Ensures that the item is passed as the first argument to the checkmark click callback.
      const onClick = (e: any) => onCheckmarkClick(item, e)

      return (
        <Icon icon-name={item.canCheck !== false && isItemChecked ? 'CheckMark' : ''} class-name={classNames.checkmarkIcon} on-click={onClick} />
      )
    }
    return null
  }

  renderItemName ({ item, classNames }: any) {
  // tslint:disable:deprecation
    if (item.text || item.name) {
      return <span class={classNames.label}>{item.text || item.name}</span>
    }
    // tslint:enable:deprecation
    return null
  }

  renderSecondaryText ({ item, classNames }: any) {
    if (item.secondaryText) {
      return <span class={classNames.secondaryText}>{item.secondaryText}</span>
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
