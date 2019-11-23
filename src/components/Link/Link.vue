<template>
  <component :is="href ? 'a' : 'button'"
  :class="[
    $style.root,
    disabled && $style.disabled,
    disabled && 'is-disabled',
    'ms-Link'
  ]"
   :href="href">
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Link extends Vue {
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: '' }) href!: string
}
</script>

<style lang="scss" module>
.root {
  font-size: inherit;
  font-weight: inherit;
  color: var(--primary-themePrimary);
  outline: none;
  text-decoration: none;
  margin: 0;
  padding: 0;
  text-overflow: inherit;
  overflow: inherit;
  border-width: initial;
  border-color: initial;
  cursor: pointer;
  display: inline;
  text-align: left;
  user-select: text;
  background: none transparent;
  border-style: none none solid;
  border-image: initial;
  border-bottom: 1px solid transparent;

  &:hover {
  color: var(--primary-themeDarker);
    text-decoration: underline;
  }
}

.disabled {
  color: var(--main-text-disabled);
  pointer-events: none;
  cursor: default;
}
</style>
