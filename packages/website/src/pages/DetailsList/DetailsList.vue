<template>
  <div>
    <h1>DetailsList</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <h2>DetailsList with 500 documents, sorting, filtering, <strike>marquee selection</strike>, justified columns</h2>
      <div :class="classNames.controlWrapper">
        <f-toggle v-model="compact"
                  label="Enable compact mode"
                  on-text="Compact"
                  off-text="Normal"
                  :styles="controlStyles" />

        <f-text-field v-model="text"
                      label="Filter by name:"
                      :styles="controlStyles"
                      @change="onChangeText" />
      </div>
      <div style="overflow-x: auto; max-height: 80vh">
        <f-details-list :columns="columns"
                        :items="items"
                        :selection-mode="2"
                        :compact="compact">
                        <!-- <template #cell.column1="{ item }">
            <img :src="item.iconName"
                 :class="classNames.fileIconImg"
                 :alt="item.fileType + ' file icon'">
          </template>

          <template #cell.column3="{ item }">
            <span>{{ item.dateModified }}</span>
          </template>

          <template #cell.column4="{ item }">
            <span>{{ item.modifiedBy }}</span>
          </template>

          <template #cell.column5="{ item }">
            <span>{{ item.fileSize }}</span>
          </template> -->
        </f-details-list>
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mergeStyleSets } from '@uifabric/styling'

import { IColumn } from '@uifabric-vue/office-ui-fabric-vue'

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
  controlWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  exampleToggle: {
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '30px',
  },
  selectionDetails: {
    marginBottom: '20px',
  },
})

@Component({
  components: {
  },
})
export default class DetailsListPage extends Vue {
  compact: boolean = false
  text: string = ''
  classNames = classNames

  controlStyles = {
    root: {
      margin: '0 30px 20px 0',
      maxWidth: '300px',
    },
  };

  allItems: any[] = _generateDocuments();
  items: any[] = []

  columns: IColumn[] = [
    {
      key: 'index',
      name: 'Index',
      fieldName: 'index',
      minWidth: 64,
      maxWidth: 64,
      onColumnClick: this.onColumnClick,
    },
    {
      key: 'column1',
      name: 'File Type',
      className: classNames.fileIconCell,
      iconClassName: classNames.fileIconHeaderIcon,
      ariaLabel: 'Column operations for File type, Press to sort on File type',
      iconName: 'Page',
      isIconOnly: true,
      fieldName: 'name',
      minWidth: 16,
      maxWidth: 16,
      onColumnClick: this.onColumnClick,
    },
    {
      key: 'column2',
      name: 'Name',
      fieldName: 'name',
      minWidth: 210,
      maxWidth: 350,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick: this.onColumnClick,
      data: 'string',
      isPadded: true,
    },
    {
      key: 'column3',
      name: 'Date Modified',
      fieldName: 'dateModifiedValue',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      onColumnClick: this.onColumnClick,
      data: 'number',
      isPadded: true,
    },
    {
      key: 'column4',
      name: 'Modified By',
      fieldName: 'modifiedBy',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      isCollapsible: true,
      data: 'string',
      onColumnClick: this.onColumnClick,
      isPadded: true,
    },
    {
      key: 'column5',
      name: 'File Size',
      fieldName: 'fileSizeRaw',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      isCollapsible: true,
      data: 'number',
      onColumnClick: this.onColumnClick,
    },
  ];

  created () {
    this.items = this.allItems
  }

  onColumnClick (ev: MouseEvent, column: IColumn) {
    this.columns.forEach(col => {
      if (col.key === column.key) {
        col.isSortedDescending = column.isSortedDescending = !col.isSortedDescending
        col.isSorted = column.isSorted = true
      } else {
        col.isSorted = false
        col.isSortedDescending = true
      }
    })
    this.items = _copyAndSort(this.items, column.fieldName!, column.isSortedDescending)
  }

  private onChangeText (ev: InputEvent, text: string) {
    console.log(this.allItems)
    this.items = text
      ? this.allItems.filter(i => i.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
      : this.allItems
  }
}

function _copyAndSort<T> (items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1))
}

function _generateDocuments () {
  const items: any[] = []
  for (let i = 0; i < 500; i++) {
    const randomDate = _randomDate(new Date(2012, 0, 1), new Date())
    const randomFileSize = _randomFileSize()
    const randomFileType = _randomFileIcon()
    let fileName = _lorem(2)
    fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).concat(`.${randomFileType.docType}`)
    let userName = _lorem(2)
    userName = userName
      .split(' ')
      .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(' ')
    items.push({
      key: i.toString(),
      name: fileName,
      value: fileName,
      index: i,
      iconName: randomFileType.url,
      fileType: randomFileType.docType,
      modifiedBy: userName,
      dateModified: randomDate.dateFormatted,
      dateModifiedValue: randomDate.value,
      fileSize: randomFileSize.value,
      fileSizeRaw: randomFileSize.rawSize,
    })
  }
  return items
}

function _randomDate (start: Date, end: Date): { value: number; dateFormatted: string } {
  const date: Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return {
    value: date.valueOf(),
    dateFormatted: date.toLocaleDateString(),
  }
}

const FILE_ICONS: { name: string }[] = [
  { name: 'accdb' },
  { name: 'csv' },
  { name: 'docx' },
  { name: 'dotx' },
  { name: 'mpt' },
  { name: 'odt' },
  { name: 'one' },
  { name: 'onepkg' },
  { name: 'onetoc' },
  { name: 'pptx' },
  { name: 'pub' },
  { name: 'vsdx' },
  { name: 'xls' },
  { name: 'xlsx' },
  { name: 'xsn' },
]

function _randomFileIcon (): { docType: string; url: string } {
  const docType: string = FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name
  return {
    docType,
    url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`,
  }
}

function _randomFileSize (): { value: string; rawSize: number } {
  const fileSize: number = Math.floor(Math.random() * 100) + 30
  return {
    value: `${fileSize} KB`,
    rawSize: fileSize,
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
