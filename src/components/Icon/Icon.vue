<template>
  <i :class="classNames.root"
     aria-hidden="true" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IIconProps, IIconStyles } from './Icon.types'

@Component({
  name: 'o-icon',
})
export default class Icon extends BaseComponent<IIconProps, IIconStyles> {
  @Prop() iconName!: string

  protected get classes (): IIconStyles {
    return {
      root: [
        'ms-Icon',
        this.iconName && `ms-Icon--${this.iconName}`,
        this.$style.root,
      ],
    }
  }
}
</script>

<style lang="scss" module>
.root {
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-family: FabricMDL2Icons;
}
</style>
