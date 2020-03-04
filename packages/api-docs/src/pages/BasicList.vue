<template>
  <div>
    <h1>BasicList</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default BasicList</h2>
      <div data-is-scrollable="true" style="overflow-x: auto; max-height: 80vh">
        <f-list :class="classNames.listGridExample"
                :items="items"
                :get-item-count-for-page="getItemCountForPage"
                :get-page-height="getPageHeight"
                :rendered-windows-ahead="4">
          <template #cell="{ item, index }">
            <div :class="classNames.listGridExampleTile"
                 data-is-focusable="true"
                 :style="{ width: 100 / columnCount + '%' }">
              <div :class="classNames.listGridExampleSizer">
                <div :class="classNames.listGridExamplePadder">
                  <img :src="item.thumbnail" :class="classNames.listGridExampleImage">
                  <span :class="classNames.listGridExampleLabel">{{ `item ${index}` }}</span>
                </div>
              </div>
            </div>
          </template>
        </f-list>
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { createListItems, IExampleItem } from '@uifabric/example-data'
import { ITheme, getTheme, mergeStyleSets } from '@uifabric/styling'
import { IRectangle } from '@uifabric-vue/utilities'

export interface IListGridExampleProps {
  items?: IExampleItem[];
}

interface IListGridExampleClassObject {
  listGridExample: string;
  listGridExampleTile: string;
  listGridExampleSizer: string;
  listGridExamplePadder: string;
  listGridExampleLabel: string;
  listGridExampleImage: string;
}

const theme: ITheme = getTheme()
const { palette, fonts } = theme

const classNames: IListGridExampleClassObject = mergeStyleSets({
  listGridExample: {
    overflow: 'hidden',
    fontSize: 0,
    position: 'relative',
  },
  listGridExampleTile: {
    textAlign: 'center',
    outline: 'none',
    position: 'relative',
    float: 'left',
    background: palette.neutralLighter,
    selectors: {
      'focus:after': {
        content: '',
        position: 'absolute',
        left: 2,
        right: 2,
        top: 2,
        bottom: 2,
        boxSizing: 'border-box',
        border: `1px solid ${palette.white}`,
      },
    },
  },
  listGridExampleSizer: {
    paddingBottom: '100%',
  },
  listGridExamplePadder: {
    position: 'absolute',
    left: 2,
    top: 2,
    right: 2,
    bottom: 2,
  },
  listGridExampleLabel: {
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#FFFFFF',
    position: 'absolute',
    padding: 10,
    bottom: 0,
    left: 0,
    width: '100%',
    fontSize: fonts.small.fontSize,
    boxSizing: 'border-box',
  },
  listGridExampleImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
})

const ROWS_PER_PAGE = 3
const MAX_ROW_HEIGHT = 250

@Component
export default class BasicListPage extends Vue {
  private columnCount: number = -1
  private columnWidth: number = -1
  private rowHeight: number = -1

  items = createListItems(5000)
  classNames = classNames

  private getItemCountForPage (itemIndex: number, surfaceRect: IRectangle): number {
    if (itemIndex === 0) {
      this.columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT)
      this.columnWidth = Math.floor(surfaceRect.width / this.columnCount)
      this.rowHeight = this.columnWidth
    }

    return this.columnCount * ROWS_PER_PAGE
  };

  private getPageHeight (): number {
    return this.rowHeight * ROWS_PER_PAGE
  };
}
</script>
