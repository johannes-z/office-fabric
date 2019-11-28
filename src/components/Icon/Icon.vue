<template>
  <i v-bind="css.root"
     aria-hidden="true" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IIconProps, IIconStyles } from './Icon.types'

@Component({
})
export default class Icon extends BaseComponent<IIconProps, IIconStyles> {
  @Prop() iconName!: string

  get baseStyles (): IIconStyles {
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
