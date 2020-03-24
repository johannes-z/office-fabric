<template>
  <div :class="classNames.wrapper">
    <ScrollablePane :scrollbar-visibility="ScrollbarVisibility.auto">
      <Sticky :sticky-position="StickyPositionType.Header">
        <TextField :class="classNames.filter" label="Filter by name:" />
      </Sticky>

      <Sticky :sticky-position="StickyPositionType.Header">
        <h1 :class="classNames.header">Item list</h1>
      </Sticky>

      <DetailsList :items="items"
                   :columns="columns">
        <template #DetailsHeader="{ defaultRender }">
          <Sticky :sticky-position="StickyPositionType.Header">
            <VNodes :vnodes="defaultRender()" />
          </Sticky>
        </template>
      </DetailsList>
    </ScrollablePane>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mergeStyleSets } from '@uifabric/styling'
import {
  ScrollablePane,
  Sticky,
  TextField,
  DetailsList,
  StickyPositionType,
  ScrollbarVisibility,
  IColumn,
  VNodes,
} from '@uifabric-vue/office-ui-fabric-vue'

const classNames = mergeStyleSets({
  wrapper: {
    height: '80vh',
    position: 'relative',
  },
  filter: {
    paddingBottom: 20,
    maxWidth: 300,
  },
  header: {
    margin: 0,
  },
  row: {
    display: 'inline-block',
  },
})

const _footerItem: IScrollablePaneDetailsListExampleItem = {
  key: 'footer',
  test1: 'Footer 1',
  test2: 'Footer 2',
  test3: 'Footer 3',
  test4: 'Footer 4',
  test5: 'Footer 5',
  test6: 'Footer 6',
}

export interface IScrollablePaneDetailsListExampleItem {
  key: number | string;
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  test5: string;
  test6: string;
}

export interface IScrollablePaneDetailsListExampleState {
  items: IScrollablePaneDetailsListExampleItem[];
}

@Component({
  components: {
    ScrollablePane,
    Sticky,
    TextField,
    DetailsList,
    VNodes,
  },
})
export default class ScrollablePaneDetailsHeaderExample extends Vue {
  ScrollbarVisibility = ScrollbarVisibility
  StickyPositionType = StickyPositionType
  classNames = classNames

  columns: IColumn[] = []
  items: IScrollablePaneDetailsListExampleItem[] = []

  created () {
    for (let i = 0; i < 200; i++) {
      this.items.push({
        key: i,
        test1: _lorem(4),
        test2: _lorem(4),
        test3: _lorem(4),
        test4: _lorem(4),
        test5: _lorem(4),
        test6: _lorem(4),
      })
    }

    for (let i = 1; i < 7; i++) {
      this.columns.push({
        key: 'column' + i,
        name: 'Test ' + i,
        fieldName: 'test' + i,
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      })
    }
  }
}

const LOREM_IPSUM = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
  'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
).split(' ')
let loremIndex = 0
function _lorem (wordCount: number): string {
  const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex
  loremIndex = startIndex + wordCount
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ')
}
</script>

<style lang="scss" scoped>
</style>
