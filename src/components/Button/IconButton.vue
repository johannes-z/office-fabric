<template>
  <BaseButtonTemplate v-bind="[$attrs, $props]" :class="$style.root">
    <span :class="[$style.flexContainer]">
      <Icon :icon-name="iconName" />
    </span>
  </BaseButtonTemplate>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Icon from '../Icon/Icon.vue'
import BaseButtonTemplate from './BaseButton/BaseButtonTemplate.vue'
import BaseButton from './BaseButton/BaseButton'

@Component({
  components: { BaseButtonTemplate, Icon },
})
export default class IconButton extends BaseButton {
  @Prop({ default: '' }) text!: string
  @Prop({ default: '' }) iconName!: string
  @Prop({ default: false }) primary!: boolean
  @Prop({ default: false }) disabled!: boolean
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
  padding: 0 4px;
  width: 32px;
  height: 32px;
  background-color: transparent;
  color: rgb(0, 120, 212);
  user-select: none;
  outline: transparent;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  text-decoration: none;
  border-radius: 2px;

  &:hover {
    color: rgb(16, 110, 190);
    background-color: var(--fabric-neutralLighter);
  }

  &:active {
    background-color: var(--fabric-neutralLight);
  }

  &.checked {
    background-color: var(--fabric-neutralLight);
  }

  &.disabled {
    background-color: var(--fabric-neutralLighter);
    color: rgb(161, 159, 157);
    pointer-events: none;
    user-select: none;
    outline: transparent;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    text-decoration: none;
    border-radius: 2px;
    border-color: var(--fabric-neutralLighter);
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

}
</style>
