<template>
  <div v-bind="css.root">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IDialogProps, IDialogStyles } from './Dialog.types'
import BaseComponent from '../BaseComponent'
import { Layer } from '../Layer'

@Component({
  components: { Layer },
})
export default class Dialog extends BaseComponent<IDialogProps, IDialogStyles> {
  @Prop({ type: Boolean, default: false }) dark!: boolean
}
</script>
