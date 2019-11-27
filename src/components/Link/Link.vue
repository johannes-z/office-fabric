<template>
  <component :is="href ? 'a' : 'button'"
             v-bind="css.root"
             :type="!href && 'button'"
             :href="href">
    <slot />
  </component>
</template>

<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ILinkProps, ILinkStyles } from './Link.types'
import { CreateElement } from 'vue'

@Component({
  name: 'o-link',
})
export default class Link extends BaseComponent<ILinkProps, ILinkStyles> {
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: '' }) href!: string

  get baseStyles (): ILinkStyles {
    const { $style, disabled } = this
    return {
      root: [
        'ms-Link',
        $style.root,
        disabled && ['is-disabled', $style.disabled],
      ],
    }
  }
}
</script>

<style lang="scss" module>
.root {
  font-size: inherit;
  font-weight: inherit;
  color: var(--fabric-themePrimary);
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
  color: var(--fabric-themeDarker);
    text-decoration: underline;
  }
}

.disabled {
  color: var(--fabric-neutralSecondary);
  pointer-events: none;
  cursor: default;
}
</style>
