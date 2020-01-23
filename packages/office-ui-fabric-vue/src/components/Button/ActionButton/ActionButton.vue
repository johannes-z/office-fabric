<template>
  <BaseButton v-bind="[$attrs, $listeners, $props]"
              variant-class-name="ms-Button--action ms-Button--command"
              :styles="internalStyles">
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)"
          :slot="slot"
          :name="slot" />

    <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </BaseButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseButton from '../BaseButton.vue'
import BaseComponent from '../../BaseComponent'
import { getStyles } from './ActionButton.styles'

@Component({
  components: { BaseButton },
})
export default class ActionButton extends BaseComponent {
  @Prop({ type: String, default: '' }) href!: string
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Object, default: null }) iconProps!: any

  get internalStyles () {
    const { theme } = this
    const styles = {}
    return getStyles(theme, styles)
  }
}
</script>
