<template>
  <i :class="classNames.root"
     aria-hidden="true" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IIconProps, IIconStyles } from './Icon.types'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Icon.styles'

@Component({
})
export default class Icon extends BaseComponent<IIconProps, IIconStyles> {
  @Prop() iconName!: string
  @Prop() imageProps!: any

  get classNames () {
    const { className, styles, iconName, theme } = this
    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0
    const isImage = !!this.imageProps

    return getClassNames(getStyles, {
      theme: theme!,
      className,
      iconClassName: ['ms-Icon', `ms-Icon--${iconName}`],
      isImage,
      isPlaceholder,
    })
  }
}
</script>
