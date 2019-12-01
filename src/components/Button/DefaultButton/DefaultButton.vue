<template>
  <BaseButtonTemplate v-bind="[$attrs, $props]" :class="$style.root" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseButtonTemplate from '../BaseButton/BaseButtonTemplate.vue'

@Component({
  components: { BaseButtonTemplate },
})
export default class DefaultButton extends Vue {
  @Prop({ type: String, default: '' }) text!: string
  @Prop({ type: Boolean, default: false }) primary!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
}
</script>
