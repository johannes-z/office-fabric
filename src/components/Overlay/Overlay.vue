<template>
  <div v-bind="css.root">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IOverlayProps, IOverlayStyles } from './Overlay.types'
import BaseComponent from '../BaseComponent'
import { Layer } from '@/components/Layer'

@Component({
  name: 'o-overlay',
  components: { Layer },
})
export default class Overlay extends BaseComponent<IOverlayProps, IOverlayStyles> {
  @Prop({ default: false }) dark!: boolean

  get baseStyles (): IOverlayStyles {
    const { $style, dark } = this
    return {
      root: [
        'ms-Overlay',
        $style.root,
        dark && ['ms-Overlay--dark', $style.dark],
      ],
    }
  }
}
</script>

<style lang="scss" module>
.root {
font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
-webkit-font-smoothing: antialiased;
font-size: 14px;
font-weight: 400;
background-color: rgba(255, 255, 255, 0.4);
top: 0px;
right: 0px;
bottom: 0px;
left: 0px;
position: absolute;
}
.dark {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  position: absolute;
}
</style>
