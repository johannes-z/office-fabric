<template>
  <label :class="[
    $style.root,
    disabled && $style.disabled,
    required && $style.required,
    'ms-Label'
  ]">
    <slot />
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Label extends Vue {
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean
}
</script>

<style lang="scss" module>
.root {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground-neutralPrimary);
  box-sizing: border-box;
  box-shadow: none;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  display: block;
  padding-top: 5px;
  padding-right: 0px;
  padding-bottom: 5px;
  padding-left: 0px;
  overflow-wrap: break-word;
}

.root.disabled {
  color: var(--main-text-disabled);
}

.required:after {
  content: " *";
  color: var(--main-text-error);
  padding-right: 12px;
}
</style>
