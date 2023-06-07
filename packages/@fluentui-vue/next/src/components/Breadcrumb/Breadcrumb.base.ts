import { computed, defineComponent, h, ref, toRefs, watch } from 'vue'
import { DirectionalHint, classNamesFunction } from '@fluentui-vue/utilities'
import { ResizeGroup } from '../ResizeGroup'
import { OverflowButton } from '../OverflowSet/OverflowButton'
import type { IBreadcrumbItem, IBreadcrumbStyleProps, IBreadcrumbStyles } from '.'
import { asSlotProps, useStylingProps } from '@/utils'
import { type IContextualMenuItem, type IContextualMenuItemProps, Icon, IconButton, Link } from '@/components'

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
      maxDisplayedItems,
      overflowIndex,
      className,
      theme,
      styles,
    } = toRefs(props)

    const DividerType = Icon

    const onBreadcrumbClicked = (item: IBreadcrumbItem, ev: MouseEvent) => {
      if (!item.onClick)
        return
      item.onClick(ev, item)
    }

    const renderedItems = ref([...items.value])
    const renderedOverflowItems = ref<any[]>(renderedItems.value.splice(overflowIndex.value, renderedItems.value.length - maxDisplayedItems.value))

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
      overflow: {
        class: classNames.value.overflow,
      },
      overflowButton: {
        class: classNames.value.overflowButton,
        role: 'button',
        iconProps: { iconName: 'More' },
      },
    }))

    const onReduceData = (data) => {
      let { renderedItems, renderedOverflowItems } = data
      const { overflowIndex } = data.props

      const movedItem = renderedItems[overflowIndex!]

      if (!movedItem)
        return undefined

      renderedItems = [...renderedItems]
      renderedItems.splice(overflowIndex!, 1)

      renderedOverflowItems = [...renderedOverflowItems, movedItem]

      return { ...data, renderedItems, renderedOverflowItems }
    }

    const onGrowData = (data) => {
      let { renderedItems, renderedOverflowItems } = data
      const { overflowIndex, maxDisplayedItems } = data.props

      renderedOverflowItems = [...renderedOverflowItems]
      const movedItem = renderedOverflowItems.pop()

      if (!movedItem || renderedItems.length >= maxDisplayedItems!)
        return undefined

      renderedItems = [...renderedItems]
      renderedItems.splice(overflowIndex!, 0, movedItem)

      return { ...data, renderedItems, renderedOverflowItems }
    }

    const $item = (item?: IBreadcrumbItem) => {
      if (!item)
        return null

      if (item.onClick || item.href) {
        return h(Link, {
          ...slotProps.value.itemLink,
          ...item,
          onClick: onBreadcrumbClicked.bind(this, item),
        }, {
          default: () => item.text,
        })
      }
      else {
        return h('span', slotProps.value.item, item.text)
      }
    }

    return () => {
      return h(ResizeGroup, {
        data: {
          props,
          renderedItems: renderedItems.value,
          renderedOverflowItems: renderedOverflowItems.value,
        },
        onReduceData,
        onGrowData,
      }, {
        default: (data) => {
          const { renderedItems, renderedOverflowItems } = data

          const contextualItems = renderedOverflowItems.map((item) => {
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
          })

          const lastItemIndex = renderedItems.length - 1
          const hasOverflowItems = renderedOverflowItems && renderedOverflowItems.length !== 0

          const $items = renderedItems.map((item, index) => [
            h('li', slotProps.value.listItem, [
              $item(item),
              (index !== lastItemIndex || (hasOverflowItems && index === overflowIndex.value - 1)) && h(DividerType, {
                ...slotProps.value.chevron,
                item,
              }),
            ]),
          ])

          if (hasOverflowItems) {
            $items.splice(overflowIndex.value, 0, h('li', slotProps.value.overflow, [
              h(IconButton, {
                ...slotProps.value.overflowButton,
                menuProps: {
                  items: contextualItems,
                  directionalHint: DirectionalHint.bottomLeftEdge,
                },
              }, {
                renderMenuIcon: () => null,
              }),
              (overflowIndex.value !== lastItemIndex + 1) && h(DividerType, {
                ...slotProps.value.chevron,
                item: renderedOverflowItems[renderedOverflowItems.length - 1],
              }),
            ]))
          }

          return h('div', slotProps.value.root, [
            h('ol', slotProps.value.list, $items),
          ])
        },
      })
    }
  },
})
