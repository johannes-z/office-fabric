<template>
  <div :class="classNames.root">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IOverlayProps, IOverlayStyles } from './Overlay.types'
import BaseComponent from '../BaseComponent'
import { Layer } from '@/components/Layer'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Overlay.styles'

@Component({
  components: { Layer },
})
export default class Overlay extends BaseComponent<IOverlayProps, IOverlayStyles> {
  @Prop({ default: false }) dark!: boolean

  get classNames () {
    const { theme, className, dark } = this
    return getClassNames(getStyles, {
      theme,
      className,
      isDark: dark,
    })
  }
}
</script>
