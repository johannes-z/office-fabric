<template>
  <BaseButton v-bind="[$attrs, $listeners, $props]"
              variant-class-name="ms-Button--action ms-Button--command"
              :styles="internalStyles">
    <slot />
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
  @Prop({ default: '' }) href!: string
  @Prop({ default: false }) disabled!: boolean
  @Prop() iconProps!: any

  get internalStyles () {
    const { theme } = this
    const styles = {}
    return getStyles(theme, styles)
  }
}
</script>
