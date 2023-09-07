import { classNamesFunction } from '@fluentui-vue/utilities'
import { type VNode, computed, ref, toRefs, watch } from 'vue'
import { defineComponent, h } from 'vue'
import { CommandBarButton } from '../Button'
import { OverflowSet } from '../OverflowSet'
import { ResizeGroup } from '../ResizeGroup'
import { getCommandButtonStyles } from './CommandBar.styles'
import type { ICommandBarItemProps, ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types'
import { asSlotProps, makeStylingProps } from '@/utils/'

const getClassNames = classNamesFunction<ICommandBarStyleProps, ICommandBarStyles>()

export interface ICommandBarData {
  /**
   * Items being rendered in the primary region
   */
  primaryItems: ICommandBarItemProps[]
  /**
   * Items being rendered in the overflow
   */
  overflowItems: ICommandBarItemProps[]
  /**
   * Items being rendered on the far side
   */
  farItems: ICommandBarItemProps[] | undefined
  /**
   * Length of original overflowItems to ensure that they are not moved into primary region on resize
   */
  minimumOverflowItems: number
  /**
   * Unique string used to cache the width of the command bar
   */
  cacheKey: string
}

export const CommandBarBase = defineComponent({
  name: 'CommandBarBase',

  props: {
    ...makeStylingProps(),

    items: { type: Array as () => any[], default: () => [] },
    overflowItems: { type: Array as () => any[], default: () => [] },
    farItems: { type: Array as () => any[], default: () => [] },

    shiftOnReduce: { type: Boolean, default: false },
    overflowButtonProps: { type: Object, default: () => ({}) },
  },

  setup(props, { attrs, slots }) {
    const {
      theme,
      styles,
      items,
      farItems,
      overflowItems,
      shiftOnReduce,
      overflowButtonProps,
    } = toRefs(props)

    const computeCacheKey = (data: {
      primaryItems?: ICommandBarItemProps[]
      overflow?: boolean
      farItems?: ICommandBarItemProps[]
    }) => {
      const { primaryItems, overflow, farItems } = data
      const returnKey = (acc: string, current: ICommandBarItemProps): string => {
        const { cacheKey = current.key } = current
        return acc + cacheKey
      }

      const primaryKey = primaryItems && primaryItems.reduce(returnKey, '')
      const overflowKey = overflow ? 'overflow' : ''
      const farKey = farItems && farItems.reduce(returnKey, '')

      return [primaryKey, overflowKey, farKey].join('')
    }

    const onReduceData = (data: any) => {
      let { primaryItems, overflowItems, cacheKey } = data
      const { farItems } = data

      // Use first item if shiftOnReduce, otherwise use last item
      const movedItem = primaryItems[shiftOnReduce.value ? 0 : primaryItems.length - 1]

      if (movedItem !== undefined) {
        movedItem.renderedInOverflow = true

        overflowItems = [movedItem, ...overflowItems]
        primaryItems = shiftOnReduce.value ? primaryItems.slice(1) : primaryItems.slice(0, -1)

        const newData = { ...data, primaryItems, overflowItems }
        cacheKey = computeCacheKey({ primaryItems, overflow: overflowItems.length > 0, farItems })

        newData.cacheKey = cacheKey
        return newData
      }

      return undefined
    }

    const onGrowData = (data: any) => {
      const { minimumOverflowItems } = data
      let { primaryItems, overflowItems, cacheKey } = data
      const { farItems } = data
      const movedItem = overflowItems[0]

      // Make sure that moved item exists and is not one of the original overflow items
      if (movedItem !== undefined && overflowItems.length > minimumOverflowItems) {
        movedItem.renderedInOverflow = false

        overflowItems = overflowItems.slice(1)
        // if shiftOnReduce, movedItem goes first, otherwise, last.
        primaryItems = shiftOnReduce.value ? [movedItem, ...primaryItems] : [...primaryItems, movedItem]

        const newData = { ...data, primaryItems, overflowItems }
        cacheKey = computeCacheKey({ primaryItems, overflow: overflowItems.length > 0, farItems })

        newData.cacheKey = cacheKey
        return newData
      }

      return undefined
    }

    const onRenderItem = (item: any) => {
      const commandButtonProps: ICommandBarItemProps = {
        allowDisabledFocus: true,
        role: 'menuitem',
        ...item,
        styles: getCommandButtonStyles(item.buttonStyles),
        text: !item.iconOnly ? item.text : undefined,
        menuProps: item.subMenuProps,
      }

      return h(CommandBarButton, {
        class: ['ms-CommandBarItem-link', item.className],
        ...commandButtonProps,
      }, () => item.text)
    }

    const dataToRender = ref(null)

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
    }))

    const commandBarData = computed(() => ({
      primaryItems: [...items.value],
      overflowItems: [...overflowItems.value!],
      minimumOverflowItems: [...overflowItems.value!].length, // for tracking
      farItems: farItems.value,
      cacheKey: computeCacheKey({
        primaryItems: [...items.value],
        overflow: overflowItems.value && overflowItems.value.length > 0,
        farItems: farItems.value,
      }),
    }))

    watch(commandBarData, value => (dataToRender.value = value), { deep: true, immediate: true })

    const overflowRef = ref(null)

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        class: classNames.value.root,
      },
      primarySet: {
        ref: overflowRef,
        class: classNames.value.primarySet,
      },
      secondarySet: {
        class: classNames.value.secondarySet,
      },
      overflowButton: {
        role: 'menuitem',
        ...overflowButtonProps.value,
        styles: { menuIcon: { fontSize: '17px' }, ...overflowButtonProps.value.styles },
        className: ['ms-CommandBar-overflowButton', overflowButtonProps.value.className].join(' '),
        menuIconProps: { iconName: 'More', ...overflowButtonProps.value.menuIconProps },
      },
    }))

    return () => h(ResizeGroup, {
      data: dataToRender.value,
      onReduceData,
      onGrowData,
    }, {
      default: data => [
        h('div', slotProps.value.root, {
          default: () => [
            h(OverflowSet, {
              ...slotProps.value.primarySet,
              items: data.primaryItems.map(i => ({
                ...i,
                text: !i.iconOnly ? i.text : undefined,
              })),
              overflowItems: data.overflowItems.length ? data.overflowItems : undefined,
            }, {
              item: ({ item }) => {
                if (item.key in slots) {
                  return slots[item.key]!({
                    item,
                    render: onRenderItem,
                  })
                }
                return onRenderItem(item)
              },
              overflow: (overflowItems) => {
                const combinedOverflowItems: any[] = [
                  ...(overflowButtonProps.value.menuProps ? overflowButtonProps.value.menuProps.items : []),
                  ...overflowItems,
                ]

                return h(CommandBarButton, {
                  ...slotProps.value.overflowButton,
                  menuProps: {
                    ...overflowButtonProps.value.menuProps,
                    items: combinedOverflowItems,
                  },
                })
              },
            }),
            h(OverflowSet, {
              ...slotProps.value.secondarySet,
              items: data.farItems.map(i => ({
                ...i,
                text: !i.iconOnly ? i.text : undefined,
              })),
            }, {
              item: ({ item }) => onRenderItem(item),
            }),
          ],
        }),
      ],
    })
  },
})
