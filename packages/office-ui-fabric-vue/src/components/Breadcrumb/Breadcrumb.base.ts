import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { PropType, VNode } from 'vue'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { getStyles } from './Breadcrumb.styles'
import { IBreadcrumbItem, IBreadcrumbProps, IBreadcrumbStyles } from './Breadcrumb.types'

const getClassNames = classNamesFunction<any, IBreadcrumbStyles>()

export const BreadcrumbBase = Vue.extend({
  name: 'BreadcrumbBase',

  props: {
    ...withThemeableProps(),

    items: { type: Array as PropType<IBreadcrumbItem[]>, default: () => [] },
  } as MappedType<IBreadcrumbProps>,

  computed: {
    classNames (): IProcessedStyleSet<IBreadcrumbStyles> {
      const { className, theme } = this
      return getClassNames(getStyles, {
        theme,
        className,
      })
    },
  },

  methods: {
    onBreadcrumbClicked (event: MouseEvent, item: IBreadcrumbItem) {
      if (item.onClick) {
        item.onClick(event, item)
      }
    },
  },

  render (h): VNode {
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
  },
})
