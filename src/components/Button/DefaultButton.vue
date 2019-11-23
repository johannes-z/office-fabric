<template>
  <button :class="[
    $style.root,
    primary && $style.primary,
    disabled && $style.disabled,
    primary ? 'ms-Button--primary' : 'ms-Button--default',
    'ms-Button'
  ]" @click="$emit('click', $event)">
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

@Component
export default class DefaultButton extends Vue {
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
  background-color: var(--foreground-white);
  color: var(--foreground-neutralPrimary);
  user-select: none;
  outline: transparent;

  border-width: 1px;
  border-style: solid;
  border-color: var(--foreground-neutralPrimaryAlt);
  border-image: initial;
  text-decoration: none;
  border-radius: 2px;

  &:hover {
    background-color: rgb(243, 242, 241);
  }

  &.primary {
    background-color: var(--primary-themePrimary);
    color: var(--foreground-white);
    border-width: initial;
    border-style: none;
    border-color: initial;

    &:hover {
      background-color: var(--primary-themeDarkAlt);
    }
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
