import { Vue, Component, Prop } from 'vue-property-decorator'
import { IBreadcrumbProps, IBreadcrumbStyles, IBreadcrumbItem } from './Breadcrumb.types'
import BaseComponent from '../BaseComponent'
import { getStyles } from './Breadcrumb.styles'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { Link } from '../Link'
import { Icon } from '../Icon'
import { CreateElement } from 'vue'

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

  render (h: CreateElement) {
    const { classNames, items } = this
    return h('div', { class: classNames.root, attrs: { role: 'navigation' } }, [
      h('ol', { class: classNames.list },
        items.map((item, index) => h('li', {
          key: index,
          class: classNames.listItem,
        }, [
          (item.onClick || item.href)
            ? h(Link, {
              class: classNames.itemLink,
              attrs: { href: item.href },
              on: {
                click: ev => this.onBreadcrumbClicked(ev, item),
              },
            }, item.text)
            : h('span', {
              class: classNames.item,
              on: {
                click: ev => this.onBreadcrumbClicked(ev, item),
              },
            }, item.text),
          (index !== (items.length - 1)) && h(
            Icon, {
              key: `icon-${index}`,
              class: classNames.chevron,
              attrs: {
                iconName: 'ChevronRight',
              },
            },
          ),
        ],
        ))),
    ])
  }
}
