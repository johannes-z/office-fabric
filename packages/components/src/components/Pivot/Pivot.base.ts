import { classNamesFunction, css } from '@fluentui-vue/utilities'
import { type PropType, computed, defineComponent, h, ref, toRefs } from 'vue'
import { useId } from '@fluentui-vue/hooks'
import { CommandButton, type IPivotItemProps, Icon } from '..'
import type { IPivotProps, IPivotStyleProps, IPivotStyles, PivotLinkFormatType, PivotLinkSizeType } from './Pivot.types'
import { makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IPivotStyleProps, IPivotStyles>()

const COMPONENT_NAME = 'Pivot'

export const PivotBase = defineComponent({
  name: 'PivotBase',

  props: {
    ...makeStylingProps(),
    linkSize: { type: String as PropType<PivotLinkSizeType>, default: undefined },
    linkFormat: { type: String as PropType<PivotLinkFormatType>, default: undefined },

    headerOnly: { type: Boolean, default: false },
    selectedKey: { type: String, default: '' },

    onLinkClick: { type: Function, default: undefined },
  },

  setup(props, { attrs, slots }) {
    const {
      theme,
      styles,
      linkSize,
      linkFormat,
    } = toRefs(props)

    const pivotId: string = useId('Pivot')
    const children = slots.default?.()

    const getLinkItems = (props: IPivotProps, pivotId: string) => {
      const result = {
        links: [] as any[],
        keyToIndexMapping: {},
        keytoTabIdMapping: {},
      }

      children?.forEach((child, index: number) => {
        const headerText = child.props?.['header-text']
        const itemKey = child.props?.['item-key'] || index.toString()
        result.links.push({
          headerText,
          itemKey,
          itemCount: child.props?.['item-count'],
          itemIcon: child.props?.['item-icon'],
        })
        result.keyToIndexMapping[itemKey] = index
      })

      return result
    }

    const linkCollection = computed(() => getLinkItems(props, pivotId))
    const selectedKey = ref(props.selectedKey || linkCollection.value.links[0].itemKey || '')

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      linkSize: linkSize.value,
      linkFormat: linkFormat.value,
    }))

    const slotProps = computed(() => ({
      root: {
        role: 'tablist',
        class: classNames.value.root,
      },
      linkContent: {
        class: classNames.value.linkContent,
      },
      icon: {
        class: classNames.value.icon,
      },
      text: {
        class: classNames.value.text,
      },
      count: {
        class: classNames.value.count,
      },
      itemContainer: {
        role: 'tabpanel',
        class: classNames.value.itemContainer,
      },
      link: {
        role: 'tabpanel',
      },
    }))

    const renderLinkContent = (link?: IPivotItemProps) => {
      if (!link)
        return null

      const { itemCount, itemIcon, headerText } = link
      return h('span', slotProps.value.linkContent, [
        itemIcon !== undefined && h('span', slotProps.value.icon, [
          h(Icon, { iconName: itemIcon }),
        ]),
        headerText !== undefined && h('span', slotProps.value.text, ` ${headerText}`),
        itemCount !== undefined && h('span', slotProps.value.count, ` (${itemCount})`),
      ])
    }

    const renderPivotItem = (itemKey: string | undefined, isActive: boolean) => {
      if (props.headerOnly || itemKey == null)
        return null

      const index = linkCollection.value.keyToIndexMapping[itemKey]
      // const selectedTabId = linkCollection.value.keyToTabIdMapping[itemKey]

      return h('div', {
        ...slotProps.value.itemContainer,
        key: itemKey,
        hidden: !isActive,
      }, children?.[index])
    }

    return () => h('div', [
      h('div', slotProps.value.root, [
        // Pivot Buttons
        linkCollection.value.links.map((link, index) => {
          const isSelected = link.itemKey === selectedKey.value
          return h(CommandButton, {
            ...slotProps.value.link,
            key: link.itemKey,
            class: css(classNames.value.link, isSelected && classNames.value.linkIsSelected),
            onClick: () => {
              selectedKey.value = link.itemKey
              props.onLinkClick?.(link)
            },
            name: link.headerText,
          }, {
            default: () => renderLinkContent(link),
          })
        }),
      ]),

      // Pivot Item Content
      linkCollection.value.links.map((link, index) => {
        if (link.itemKey !== selectedKey.value)
          return null

        return renderPivotItem(link.itemKey, selectedKey.value === link.itemKey)
      }),
    ])
  },
})
