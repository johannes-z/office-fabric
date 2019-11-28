<template>
  <div v-bind="css.root">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IDialogProps, IDialogStyles } from './Dialog.types'
import BaseComponent from '../BaseComponent'
import { Layer } from '@/components/Layer'

@Component({
  components: { Layer },
})
export default class Dialog extends BaseComponent<IDialogProps, IDialogStyles> {
  @Prop({ default: false }) dark!: boolean

  get baseStyles (): IDialogStyles {
    const { $style } = this
    return {
      root: [
        'ms-Dialog',
        $style.root,
      ],
      main: [
        'ms-Dialog-main',
        $style.main,
      ],
    }
  }
}
</script>

<style lang="scss" module>
.root {
}
.main {
}
</style>
