<template>
  <div :class="classNames.wrapper">
    <ScrollablePane :styles="{ root: classNames.pane }">
      <div v-for="(item, index) in items"
           :key="index"
           :style="{
             backgroundColor: item.color
           }">
        <Sticky :sticky-position="StickyPositionType.Both">
          <div :class="classNames.sticky">Sticky Component {{ item.index + 1 }}</div>
        </Sticky>
        <div :class="classNames.textContent">{{ item.text }}</div>
      </div>
    </ScrollablePane>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { lorem } from '@uifabric/example-data'
import { getTheme, mergeStyleSets } from '@uifabric/styling'
import { ScrollablePane, Sticky, StickyPositionType } from '@uifabric-vue/office-ui-fabric-vue'

const theme = getTheme()
const classNames = mergeStyleSets({
  wrapper: {
    height: '40vh',
    position: 'relative',
    maxHeight: 'inherit',
  },
  pane: {
    maxWidth: 400,
    border: '1px solid ' + theme.palette.neutralLight,
  },
  sticky: {
    color: theme.palette.neutralDark,
    padding: '5px 20px 5px 10px',
    fontSize: '13px',
    borderTop: '1px solid ' + theme.palette.black,
    borderBottom: '1px solid ' + theme.palette.black,
  },
  textContent: {
    padding: '15px 10px',
  },
})

@Component({
  components: {
    ScrollablePane,
    Sticky,
  },
})
export default class ScrollablePaneBasicExample extends Vue {
  theme = theme
  classNames = classNames

  items: any[] = []
  StickyPositionType = StickyPositionType

  created () {
    const colors = ['#eaeaea', '#dadada', '#d0d0d0', '#c8c8c8', '#a6a6a6', '#c7e0f4', '#71afe5', '#eff6fc', '#deecf9']

    for (let i = 0; i < 5; i++) {
      this.items.push({
        color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
        text: lorem(200),
        index: i,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
