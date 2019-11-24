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
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) required!: boolean
}
</script>

<style lang="scss" module>
.root {
  font-size: 14px;
  font-weight: 600;
  color: var(--fabric-neutralPrimary);
  box-sizing: border-box;
  box-shadow: none;
  margin: 0;
  display: block;
  padding: 5px 0;
  overflow-wrap: break-word;
}

.root.disabled {
  color: var(--fabric-neutralSecondary);
}

.required:after {
  content: " *";
  color: var(--fabric-error);
  padding-right: 12px;
}
</style>
