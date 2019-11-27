<template>
  <OLayer>
    <div v-bind="css.root">
      <OOverlay v-bind="css.overlay" />
      <div v-bind="css.main">
        <div v-bind="css.commands">
          <div v-bind="css.navigation">
            <OIconButton v-bind="css.closeButton"
                         icon-name="Cancel"
                         @click.native="$emit('close')" />
          </div>
        </div>

        <div v-bind="css.contentInner">
          <div v-bind="css.header">
            <p v-bind="css.headerText">
              {{ headerText }}
            </p>
          </div>

          <div v-bind="css.scrollableContent">
            <div v-bind="css.content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </OLayer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IPanelProps, IPanelStyles } from './Panel.types'
import BaseComponent from '../BaseComponent'
import { OLayer, OOverlay } from '@/components/'
import OIconButton from '@/components/Button/IconButton.vue'

@Component({
  name: 'o-panel',
  components: { OLayer, OOverlay, OIconButton },
})
export default class Panel extends BaseComponent<IPanelProps, IPanelStyles> {
  @Prop({ default: null }) headerText!: string

  get baseStyles (): IPanelStyles {
    const { $style } = this
    return {
      root: [
        'ms-Panel',
        $style.root,
      ],
      main: [
        'ms-Panel-main',
        $style.main,
      ],
      commands: [
        'ms-Panel-commands',
      ],
      navigation: [
        'ms-Panel-navigation',
        $style.navigation,
      ],
      closeButton: [
        'ms-Panel-closeButton',
        $style.closeButton,
      ],
      contentInner: [
        'ms-Panel-contentInner',
        $style.contentInner,
      ],
      header: [
        'ms-Panel-header',
        $style.header,
      ],
      headerText: [
        'ms-Panel-headerText',
        $style.headerText,
      ],
      scrollableContent: [
        'ms-Panel-scrollableContent',
        $style.scrollableContent,
      ],
      content: [
        'ms-Panel-content',
        $style.content,
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
  pointer-events: none;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 600;
}
.main {
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px, rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px;
  pointer-events: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  bottom: 0px;
  top: 0px;
  left: auto;
  right: 0px;
  width: 100%;
}
@media (min-width: 480px) {
  .main {
    width: 340px;
  }
}
.navigation {
  padding-top: 0px;
  padding-right: 5px;
  padding-bottom: 0px;
  padding-left: 5px;
  height: 44px;
  display: flex;
  justify-content: flex-end;
}
.closeButton {
  position: relative;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 20px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  vertical-align: top;
  padding-top: 0px;
  padding-right: 4px;
  padding-bottom: 0px;
  padding-left: 4px;
  width: 44px;
  height: auto;
  background-color: transparent;
  color: rgb(96, 94, 92);
  user-select: none;
  outline: transparent;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  text-decoration: none;
  border-radius: 2px;
}
.contentInner {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: hidden;
}
.header {
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 14px;
  margin-right: 0px;
  margin-bottom: 14px;
  margin-left: 0px;
  flex-shrink: 0;
}
@media (min-width: 1024px) {
  .header {
    margin-top: 30px;
  }
}
.headerText {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 20px;
  font-weight: 600;
  color: rgb(50, 49, 48);
  line-height: 27px;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  overflow-wrap: break-word;
  word-break: break-word;
}
.scrollableContent {
  overflow-y: auto;
}
.content {
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 0px;
  padding-bottom: 20px;
}
</style>
