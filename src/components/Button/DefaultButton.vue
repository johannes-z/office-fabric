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
      <span :class="[$style.textContainer]">
        <span :class="[$style.label]">
          <slot>{{ text }}</slot>
        </span>
      </span>
    </span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseButton from './BaseButton/BaseButton'

@Component
export default class DefaultButton extends BaseButton {
  @Prop({ type: String, default: '' }) text!: string
  @Prop({ type: Boolean, default: false }) primary!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
}
</script>

<style lang="scss" module>
@import "./BaseButton/BaseButton";

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
