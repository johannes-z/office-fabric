<template>
  <component :is="href ? 'a' : 'button'"
             :class="classNames.root"
             :type="!href && 'button'"
             :href="href">
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ILinkProps, ILinkStyles } from './Link.types'
import { CreateElement } from 'vue'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Link.styles'

@Component
export default class Link extends BaseComponent<ILinkProps, ILinkStyles> {
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: '' }) href!: string

  get classNames () {
    return getClassNames(getStyles, {
      className: this.$attrs.class,
      isButton: !this.href,
      isDisabled: this.disabled,
      theme: this.theme,
    })
  }
}
</script>
