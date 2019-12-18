<template>
  <BaseButton v-bind="[$attrs, $props]"
              variant-class-name="ms-Button--commandBar"
              :styles="internalStyles">
    <slot />
  </BaseButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon } from '../../Icon/'
import BaseComponent from '../../BaseComponent'
import BaseButton from '../BaseButton.vue'
import { getStyles } from './CommandBarButton.styles'

@Component({
  components: { BaseButton },
})
export default class CommandBarButton extends BaseComponent {
  get internalStyles () {
    const { theme } = this
    const styles = {}
    return getStyles(theme, styles)
  }
}
</script>
