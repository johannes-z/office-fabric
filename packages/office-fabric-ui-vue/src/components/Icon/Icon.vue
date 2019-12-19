<template>
  <i :class="classNames.root"
     aria-hidden="true" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IIconProps, IIconStyles } from './Icon.types'
import { getClassNames } from '../../util/getClassNames'

@Component({
})
export default class Icon extends BaseComponent {
  @Prop({ type: String, default: '' }) iconName!: string
  @Prop({ type: Object, default: null }) imageProps!: any

  get classNames () {
    const { className, iconName, theme } = this
    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0
    const isImage = !!this.imageProps

    return getClassNames(this.styles, {
      theme: theme!,
      className,
      iconClassName: ['ms-Icon', `ms-Icon--${iconName}`],
      isImage,
      isPlaceholder,
    })
  }
}
</script>
