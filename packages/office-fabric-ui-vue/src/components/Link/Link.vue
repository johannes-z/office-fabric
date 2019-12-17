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
import { getStyles } from './Link.styles'
import { classNamesFunction } from '@fabric-vue/utilities'

const getClassNames = classNamesFunction<any, ILinkStyles>()

@Component
export default class Link extends BaseComponent<ILinkProps, ILinkStyles> {
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: '' }) href!: string

  get classNames () {
    const { className, theme, href, disabled } = this

    return getClassNames(getStyles, {
      className: className,
      isButton: !href,
      isDisabled: disabled,
      theme: theme,
    })
  }
}
</script>
