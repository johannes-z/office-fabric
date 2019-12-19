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
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<any, ILinkStyles>()

@Component
export default class Link extends BaseComponent<ILinkProps, ILinkStyles> {
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: String, default: '' }) href!: string

  get classNames () {
    const { className, theme, href, disabled } = this

    return getClassNames(this.styles, {
      theme,
      className,
      isButton: !href,
      isDisabled: disabled,
    })
  }
}
</script>
