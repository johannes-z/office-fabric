<template>
  <div>
    <Icon icon-name="xlsx16_svg" />
    <Icon icon-name="docx16_svg" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon, css } from '@uifabric-vue/office-ui-fabric-vue'
import { mergeStyles, mergeStyleSets } from '@uifabric/styling'

import { initializeFileTypeIcons, getFileTypeIconProps } from '@uifabric-vue/file-type-icons'
initializeFileTypeIcons(/* optional base url */)

@Component({
  components: { Icon },
})
export default class IconFileTypeExample extends Vue {
  iconProps = getFileTypeIconProps({ extension: 'xlsx', size: 16 })
}
</script>

<style lang="scss" scoped>
</style>
