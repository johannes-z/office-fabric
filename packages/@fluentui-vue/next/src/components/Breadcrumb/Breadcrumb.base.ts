import { computed, defineComponent, h, toRefs } from 'vue'
import { classNamesFunction } from '@fluentui-vue/utilities'
import type { IBreadcrumbItem, IBreadcrumbStyleProps, IBreadcrumbStyles } from '.'
import { asSlotProps, useStylingProps } from '@/utils'
import { type IContextualMenuItem, type IContextualMenuItemProps, Icon, Link } from '@/components'

const getClassNames = classNamesFunction<IBreadcrumbStyleProps, IBreadcrumbStyles>()

const nonActionableItemProps: Partial<IContextualMenuItemProps> = {
  styles: (props) => {
    const { theme } = props
    return {
      root: {
        selectors: {
          '&.is-disabled': {
            color: theme.semanticColors.bodyText,
          },
        },
      },
    }
  },
}

export const BreadcrumbBase = defineComponent({
  name: 'BreadcrumbBase',

  props: {
    ...useStylingProps(),
    maxDisplayedItems: { type: Number, default: 999 },
    overflowIndex: { type: Number, default: 0 },
    items: { type: Array as () => IBreadcrumbItem[], default: () => [] },
  },

  setup(props) {
    const {
      items,
      className,
      theme,
      styles,
    } = toRefs(props)

    const onBreadcrumbClicked = (item: IBreadcrumbItem, ev: MouseEvent) => {
      if (!item.onClick)
        return
      item.onClick(ev, item)
    }

    const contextualItems = computed(() => items.value.map((item): IContextualMenuItem => {
      const isActionable = !!(item.onClick || item.href)
      return {
        text: item.text,
        name: item.text,
        key: item.key,
        onClick: item.onClick ? onBreadcrumbClicked.bind(this, item) : undefined,
        href: item.href,
        disabled: !isActionable,
        itemProps: isActionable ? undefined : nonActionableItemProps,
      }
    }))

    const classNames = computed(() => getClassNames(styles.value, {
      className: className.value,
      theme: theme.value,
    }))

    const slotProps = computed(() => asSlotProps<IBreadcrumbStyles>({
      root: {
        class: classNames.value.root,
        role: 'navigation',
      },
      list: {
        class: classNames.value.list,
      },
      listItem: {
        class: classNames.value.listItem,
      },
      item: {
        class: classNames.value.item,
      },
      itemLink: {
        class: classNames.value.itemLink,
      },
      chevron: {
        class: classNames.value.chevron,
        iconName: 'ChevronRight',
      },
    }))

    return () => {
      return h('div', slotProps.value.root, [
        h('ol', slotProps.value.list,
          items.value.map((item, index) => [
            h('li', slotProps.value.listItem, [
              (item.onClick || item.href)
                ? h(Link, {
                  ...slotProps.value.itemLink,
                  ...item,
                  onClick: onBreadcrumbClicked.bind(this, item),
                }, {
                  default: () => item.text,
                })
                : h('span', slotProps.value.item, item.text),

              index < (items.value.length - 1) && h(Icon, {
                ...slotProps.value.chevron,
                item,
              }),
            ]),
          ]),
        ),
      ])
    }
  },
})
