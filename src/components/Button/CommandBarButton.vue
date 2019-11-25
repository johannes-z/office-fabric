<template>
  <BaseButtonTemplate v-bind="[$attrs, $props]" :class="$style.root">
    <span :class="$style.flexContainer">
      <Icon v-if="iconName"
            :class="$style.icon"
            :icon-name="iconName" />
      <span :class="$style.textContainer">
        <span :class="$style.label">
          <slot />
        </span>
      </span>
    </span>
  </BaseButtonTemplate>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Icon from '../Icon/Icon.vue'
import BaseButtonTemplate from './BaseButton/BaseButton.vue'
import BaseButton from './BaseButton/BaseButton'

@Component({
  components: { BaseButtonTemplate, Icon },
})
export default class CommandBarButton extends BaseButton {
  @Prop({ default: null }) iconName!: string
}
</script>

<style lang="scss" module>
.root {
  position: relative;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
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
  min-width: 40px;
  background-color: rgb(255, 255, 255);
  color: rgb(50, 49, 48);
  user-select: none;
  outline: transparent;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  text-decoration: none;
  border-radius: 0px;

  &:hover {
    background-color: rgb(243, 242, 241);
    color: rgb(32, 31, 30);
  }

  &:active {
    background-color: rgb(237, 235, 233);
    color: rgb(32, 31, 30);
  }
}
.disabled {
  background-color: rgb(255, 255, 255);
  color: rgb(161, 159, 157);
  pointer-events: none;
  border-color: rgb(243, 242, 241);
}
.checked:not(.disabled) {
  background-color: rgb(237, 235, 233);
  color: rgb(32, 31, 30);
  &:hover {
    background-color: rgb(225, 223, 221);
  }
}
.flexContainer {
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.icon {
  font-size: 16px;
  margin-top: 0px;
  margin-right: 4px;
  margin-bottom: 0px;
  margin-left: 4px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  vertical-align: middle;
  flex-shrink: 0;
  color: rgb(0, 120, 212);
}
.textContainer {
  flex-grow: 1;
  display: block;
}
.label {
  margin-top: 0px;
  margin-right: 4px;
  margin-bottom: 0px;
  margin-left: 4px;
  line-height: 100%;
  display: block;
  font-weight: normal;
}
</style>
