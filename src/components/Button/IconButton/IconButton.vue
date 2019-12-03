<template>
  <BaseButton v-bind="[$attrs, $props]"
              variant-class-name="ms-Button--icon"
              :styles="internalStyles">
    <slot />
  </BaseButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './IconButton.styles'
import BaseButton from '../BaseButton.vue'
import BaseComponent from '../../BaseComponent'

@Component({
  components: { BaseButton },
})
export default class IconButton extends BaseComponent {
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  get internalStyles () {
    const { theme } = this
    const styles = {}
    return getStyles(theme, styles)
  }
}
</script>
