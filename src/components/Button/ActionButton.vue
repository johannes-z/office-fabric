<template>
  <BaseButtonTemplate v-bind="[$attrs, $props]" :class="$style.root">
    <span :class="[$style.flexContainer]">
      <Icon :icon-name="iconName" :class="$style.icon" />
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
import BaseButtonTemplate from './BaseButton/BaseButtonTemplate.vue'
import BaseButton from './BaseButton/BaseButton'

@Component({
  components: { BaseButtonTemplate, Icon },
})
export default class ActionButton extends BaseButton {
  @Prop({ default: '' }) iconName!: string
  @Prop({ default: false }) disabled!: boolean
}
</script>

<style lang="scss" module>
@import "./BaseButton/BaseButton";

.root {
  position: relative;
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
  height: 40px;
  color: rgb(50, 49, 48);
  background-color: transparent;
  user-select: none;
  outline: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  text-decoration: none;
  border-radius: 2px;

  &:not(.checked):hover {
    color: rgb(0, 120, 212);
  }
  &:active {
    color: rgb(0, 0, 0);

    .icon {
      color: rgb(0, 69, 120);
    }
  }
}
.checked {
  color: rgb(0, 0, 0);
  background-color: transparent;

  .icon {
    color: rgb(0, 69, 120);
  }
}
.disabled {
  pointer-events: none;
  user-select: none;

  color: rgb(161, 159, 157);

  .icon, .textContainer {
    color: inherit;
  }
}
.flexContainer {
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  justify-content: flex-start;
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
  color: rgb(16, 110, 190);
}
.textContainer {
  flex-grow: 0;
  display: block;
}
.label {
  margin-top: 0px;
  margin-right: 4px;
  margin-bottom: 0px;
  margin-left: 4px;
  line-height: 100%;
  display: block;
}
</style>
