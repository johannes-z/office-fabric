<template>
  <BaseButton v-bind="[$attrs, $props]"
              :variant-class-name="primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound'"
              :styles="internalStyles">
    <slot />
  </BaseButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { getStyles } from './CompoundButton.styles'
import BaseButton from '../BaseButton.vue'

@Component({
  components: { BaseButton },
})
export default class CompoundButton extends BaseComponent {
  @Prop({ type: Boolean, default: false }) primary!: boolean

  get internalStyles () {
    const { primary = false, theme } = this
    const styles = {}
    return getStyles(theme, styles, primary)
  }
}
</script>

<style lang="scss" scoped>
</style>
