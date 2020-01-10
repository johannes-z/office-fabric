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
  inheritAttrs: false,
})
export default class IconButton extends BaseComponent {
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  get internalStyles () {
    const { theme } = this
    return getStyles(theme, this.styles)
  }
}
</script>
