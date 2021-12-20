<template>
  <div>
    <h1>FileTypeIcons</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <Icon v-bind="iconProps" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { getFileTypeIconProps } from '@uifabric-vue/file-type-icons'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getIcon, Icon } from '@uifabric-vue/office-ui-fabric-vue'
import VNodes from '../../VNodes'

@Component({
  components: {
    Icon,
    VNodes,
  },
})
export default class FileTypeIcons extends Vue {
  iconProps = getFileTypeIconProps({ extension: 'docx', size: 16 })
}
</script>
