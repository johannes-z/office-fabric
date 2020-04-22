import { Vue, Component, Prop } from 'vue-property-decorator'
import { IBreadcrumbProps, IBreadcrumbStyles, IBreadcrumbItem } from './Breadcrumb.types'
import BaseComponent from '../BaseComponent'
import { getStyles } from './Breadcrumb.styles'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { Link } from '../Link'
import { Icon } from '../Icon'

const getClassNames = classNamesFunction<any, IBreadcrumbStyles>()

@Component
export class BreadcrumbBase extends BaseComponent<IBreadcrumbProps, IBreadcrumbStyles> {
  @Prop({ type: Array, required: true }) items!: IBreadcrumbItem[]

  get classNames () {
    const { className, theme } = this
    return getClassNames(getStyles, {
      theme,
      className,
    })
  }

  private onBreadcrumbClicked (event: MouseEvent, item: IBreadcrumbItem) {
    if (item.onClick) {
      item.onClick(event, item)
    }
  }

  render () {
    const { classNames, items } = this
    return (
      <div class={classNames.root} role="navigation">
        <ol class={classNames.list}>
          {items.map((item, index) => (
            <li
              key={index}
              class={classNames.listItem}>
              {(item.onClick || item.href)
                ? (
                  <Link
                    class={classNames.itemLink}
                    href={item.href}
                    onClick={ev => this.onBreadcrumbClicked(ev, item)}>
                    { item.text}
                  </Link>)
                : (
                  <span
                    class={classNames.item}
                    onClick={ev => this.onBreadcrumbClicked(ev, item)}>
                    {item.text}
                  </span>
                )
              }

              {(index !== (items.length - 1)) && (
                <Icon
                  key={`icon-${index}`}
                  class={classNames.chevron}
                  icon-name="ChevronRight" />
              )}
            </li>
          ))}
        </ol>
      </div>
    )
  }
}
