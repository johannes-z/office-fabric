<template>
  <BaseButton v-bind="[$attrs, $props]"
              variant-class-name="ms-Button--action ms-Button--command"
              :styles="styles">
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
  @Prop({ default: '' }) iconName!: string
  @Prop({ default: '' }) href!: string
  @Prop({ default: false }) disabled!: boolean

  get styles () {
    const { theme } = this
    const styles = {}
    return getStyles(theme, styles)
  }
}
</script>
