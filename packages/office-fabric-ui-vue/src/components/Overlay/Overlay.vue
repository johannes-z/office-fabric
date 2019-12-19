<template>
  <div :class="classNames.root">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IOverlayProps, IOverlayStyles } from './Overlay.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

@Component
export default class Overlay extends BaseComponent<IOverlayProps, IOverlayStyles> {
  @Prop({ type: Boolean, default: false }) dark!: boolean

  get classNames () {
    const { theme, className, dark } = this
    return getClassNames(this.styles, {
      theme,
      className,
      isDark: dark,
    })
  }
}
</script>
