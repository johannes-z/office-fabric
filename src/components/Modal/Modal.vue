<template>
  <OLayer>
    <div v-bind="css.root">
      <div v-bind="css.container">
        Modal
      </div>
    </div>
  </OLayer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IModalProps, IModalStyles } from './Modal.types'
import BaseComponent from '../BaseComponent'
import { OLayer } from '@/components/Layer'

@Component({
  name: 'o-modal',
  components: { OLayer },
})
export default class Modal extends BaseComponent<IModalProps, IModalStyles> {
  @Prop({ default: false }) isOpen!: boolean

  get baseStyles (): IModalStyles {
    const { $style } = this
    return {
      root: [
        'ms-Modal',
        $style.root,
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
background-color: transparent;
position: fixed;
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
opacity: 1;
pointer-events: auto;
transition: opacity 0.267s ease 0s;
}
.container {
  box-shadow: rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px, rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  position: relative;
  text-align: left;
  max-height: calc(100% - 32px);
  max-width: calc(100% - 32px);
  min-height: 176px;
  min-width: 288px;
  overflow-y: auto;
  display: flex;
  align-items: stretch;
  border-radius: 2px;
  outline: transparent solid 3px;
  flex-flow: column nowrap;
}
</style>
