<template>
  <button :class="[
            $style.root,
            primary && $style.primary,
            disabled && $style.disabled,
            primary ? 'ms-Button--primary' : 'ms-Button--default',
            'ms-Button'
          ]"
          @click="$emit('click', $event)">
    <span :class="[$style.flexContainer]">
      <Icon :icon-name="iconName" />
    </span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseButton from './BaseButton/BaseButton'
import Icon from '../Icon/Icon.vue'

@Component({
  components: { Icon },
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
    background-color: rgb(243, 242, 241);
  }

  &.disabled {
    background-color: rgb(243, 242, 241);
    color: rgb(161, 159, 157);
    pointer-events: none;
    user-select: none;
    outline: transparent;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    text-decoration: none;
    border-radius: 2px;
    border-color: rgb(243, 242, 241);
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
