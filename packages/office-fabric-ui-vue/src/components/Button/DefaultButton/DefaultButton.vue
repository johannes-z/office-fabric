<template>
  <BaseButton v-bind="[$attrs, $props]"
              :variant-class-name="primary ? 'ms-Button--primary' : 'ms-Button--default'"
              :styles="internalStyles">
    <slot />
  </BaseButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseButton from '../BaseButton.vue'
import { getStyles } from './DefaultButton.styles'
import BaseComponent from '../../BaseComponent'

@Component({
  components: { BaseButton },
})
export default class DefaultButton extends BaseComponent {
  @Prop({ type: String, default: '' }) text!: string
  @Prop({ type: Boolean, default: false }) primary!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  get internalStyles () {
    const { primary = false, theme } = this
    const styles = {}
    return getStyles(theme, styles, primary)
  }
}
</script>
