<template>
  <Layer>
    <div v-bind="css.root">
      <Overlay v-bind="css.overlay" />
      <div v-bind="css.main">
        <div v-bind="css.commands">
          <div v-bind="css.navigation">
            <IconButton v-bind="css.closeButton"
                        icon-name="Cancel"
                        @click.native="$emit('close')" />
          </div>
        </div>

        <div v-bind="css.contentInner">
          <div v-bind="css.header">
            <p v-bind="css.headerText">
              {{ headerText }}
            </p>
          </div>

          <div v-bind="css.scrollableContent">
            <div v-bind="css.content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IPanelProps, IPanelStyles } from './Panel.types'
import BaseComponent from '../BaseComponent'
import { Layer, Overlay, IconButton } from '../'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

@Component({
  components: { Layer, Overlay, IconButton },
})
export default class Panel extends BaseComponent {
  @Prop({ type: String, default: null }) headerText!: string
}
</script>
