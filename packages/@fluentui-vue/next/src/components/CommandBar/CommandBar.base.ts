import { asSlotProps, useStylingProps } from '@/utils/'
import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, VNode, VueConstructor } from 'vue'
import { CommandBarButton } from '../Button'
import { OverflowSet } from '../OverflowSet'
import { ResizeGroup } from '../ResizeGroup'
import { getCommandButtonStyles } from './CommandBar.styles'
import type { ICommandBarItemProps, ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types'

const getClassNames = classNamesFunction<ICommandBarStyleProps, ICommandBarStyles>()

export interface ICommandBarData {
  /**
   * Items being rendered in the primary region
   */
  primaryItems: ICommandBarItemProps[];
  /**
   * Items being rendered in the overflow
   */
  overflowItems: ICommandBarItemProps[];
  /**
   * Items being rendered on the far side
   */
  farItems: ICommandBarItemProps[] | undefined;
  /**
   * Length of original overflowItems to ensure that they are not moved into primary region on resize
   */
  minimumOverflowItems: number;
  /**
   * Unique string used to cache the width of the command bar
   */
  cacheKey: string;
}

export const CommandBarBase = (Vue as VueConstructor<
Vue & {
  $refs: {
    input: HTMLInputElement
  };
}
>).extend({
  name: 'CommandBarBase',

  props: {
    ...useStylingProps(),

    items: { type: Array, default: () => [] },
    overflowItems: { type: Array, default: () => [] },
    farItems: { type: Array, default: () => [] },

    shiftOnReduce: { type: Boolean, default: false },
    overflowButtonProps: { type: Object, default: () => ({}) },
  },

  computed: {
    classNames (): any {
      const { styles, theme } = this
      return getClassNames(styles, {
        theme,
      })
    },

    commandBarData (): any {
      const {
        items,
        overflowItems,
        farItems,
      } = this
      return {
        primaryItems: [...items],
        overflowItems: [...overflowItems!],
        minimumOverflowItems: [...overflowItems!].length, // for tracking
        farItems,
      }
    },

    slotProps (): any {
      const {
        classNames,
        onRenderItem,
        commandBarData: data,
      } = this

      return ({
        root: {
          class: classNames.root,
        },
        primarySet: (h, data) => ({
          ref: 'overflow',
          class: classNames.primarySet,
          props: {
            items: data.primaryItems.map(i => ({
              ...i,
              text: !i.iconOnly ? i.text : undefined,
            })),
            overflowItems: data.overflowItems.length ? data.overflowItems : undefined,
          },
          scopedSlots: {
            item: ({ item }) => onRenderItem(item),
            overflow: (overflowItems) => {
              const { overflowButtonProps = {} } = this

              const combinedOverflowItems: any[] = [
                ...(overflowButtonProps.menuProps ? overflowButtonProps.menuProps.items : []),
                ...overflowItems,
              ]

              return h(CommandBarButton, {
                attrs: {
                  role: 'menuitem',
                },
                props: {
                  ...overflowButtonProps,
                  styles: { menuIcon: { fontSize: '17px' }, ...overflowButtonProps.styles },
                  className: ['ms-CommandBar-overflowButton', overflowButtonProps.className].join(' '),
                  menuProps: { ...overflowButtonProps.menuProps, items: combinedOverflowItems },
                  menuIconProps: { iconName: 'More', ...overflowButtonProps.menuIconProps },
                },
              })
            },
          },
        }),
        secondarySet: (data) => ({
          class: classNames.secondarySet,
          props: {
            items: data.farItems.map(i => ({
              ...i,
              text: !i.iconOnly ? i.text : undefined,
            })),
          },
          scopedSlots: {
            item: ({ item }) => onRenderItem(item),
          },
        }),
      })
    },
  },

  methods: {
    onReduceData (data: any): any | undefined {
      const { shiftOnReduce } = this
      let { primaryItems, overflowItems } = data

      // Use first item if shiftOnReduce, otherwise use last item
      const movedItem = primaryItems[shiftOnReduce ? 0 : primaryItems.length - 1]

      if (movedItem !== undefined) {
        movedItem.renderedInOverflow = true

        overflowItems = [movedItem, ...overflowItems]
        primaryItems = shiftOnReduce ? primaryItems.slice(1) : primaryItems.slice(0, -1)

        const newData = { ...data, primaryItems, overflowItems }

        return newData
      }

      return undefined
    },
    onGrowData (data: any): any | undefined {
      const { shiftOnReduce } = this
      const { minimumOverflowItems } = data
      let { primaryItems, overflowItems } = data
      const movedItem = overflowItems[0]

      // Make sure that moved item exists and is not one of the original overflow items
      if (movedItem !== undefined && overflowItems.length > minimumOverflowItems) {
        movedItem.renderedInOverflow = false

        overflowItems = overflowItems.slice(1)
        // if shiftOnReduce, movedItem goes first, otherwise, last.
        primaryItems = shiftOnReduce ? [movedItem, ...primaryItems] : [...primaryItems, movedItem]

        const newData = { ...data, primaryItems, overflowItems }

        return newData
      }

      return undefined
    },

    onRenderItem (item: any): VNode {
      const h = this.$createElement

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
        props: commandButtonProps,
      }, item.text)
    },
  },

  render (h: CreateElement): VNode {
    const data = this.commandBarData

    return h(ResizeGroup, {
      props: {
        data: data,
        onReduceData: this.onReduceData,
        onGrowData: this.onGrowData,
        getItemRefs: () => this.$refs.overflowItems,
      },
      scopedSlots: {
        default: data => [
          h('div', this.slotProps.root, [
            h(OverflowSet, this.slotProps.primarySet(h, data)),
            h(OverflowSet, this.slotProps.secondarySet(data)),
          ]),
        ],
      },
    })
  },
})