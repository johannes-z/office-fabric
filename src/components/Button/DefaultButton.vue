<template>
  <BaseButtonTemplate v-bind="[$attrs, $props]" :class="$style.root">
    <span :class="[$style.flexContainer]">
      <span :class="[$style.textContainer]">
        <span :class="[$style.label]">
          <slot>{{ text }}</slot>
        </span>
      </span>
    </span>
  </BaseButtonTemplate>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseButtonTemplate from './BaseButton/BaseButtonTemplate.vue'
import BaseButton from './BaseButton/BaseButton'

@Component({
  components: { BaseButtonTemplate },
})
export default class DefaultButton extends BaseButton {
  @Prop({ type: String, default: '' }) text!: string
  @Prop({ type: Boolean, default: false }) primary!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
}
</script>

<style lang="scss" module>

.root {
  position: relative;
  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  vertical-align: top;
  padding: 0 16px;
  min-width: 80px;
  height: 32px;
  background-color: var(--fabric-white);
  color: var(--fabric-neutralPrimary);
  user-select: none;
  outline: transparent;

  border-width: 1px;
  border-style: solid;
  border-color: var(--fabric-neutralPrimaryAlt);
  border-image: initial;
  text-decoration: none;
  border-radius: 2px;

  &:hover {
    background-color: rgb(243, 242, 241);
  }
  &:active {
    background-color: rgb(237, 235, 233);
    color: rgb(32, 31, 30);
  }
}

.flexContainer {
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.textContainer {
  flex-grow: 1;
  display: block;
}

.label {
  margin: 0 4px;
  line-height: 100%;
  display: block;
  font-weight: 600;
}
</style>
