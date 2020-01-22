<template>
  <div v-if="presence !== PersonaPresenceEnum.none"
       :class="classNames.presence"
       :title="presenceTitle"
       :style="coinSizeWithPresenceStyle">
    <Icon v-if="renderIcon"
          :class="classNames.presenceIcon"
          :icon-name="icon"
          :style="coinSizeWithPresenceIconStyle" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import {
  PersonaPresence as PersonaPresenceEnum, PersonaSize,
} from '../Persona.types'
import { Icon } from '../../index'
import { sizeBoolean } from '../PersonaConsts'

const coinSizeFontScaleFactor = 6
const coinSizePresenceScaleFactor = 3
const presenceMaxSize = 40
const presenceFontMaxSize = 20

const getClassNames = classNamesFunction()

@Component({
  components: { Icon },
  name: 'PersonaPresence',
})
export default class PersonaPresence extends BaseComponent {
  @Prop() presence!: any
  @Prop() size!: any
  @Prop() isOutOfOffice!: any
  @Prop() coinSize!: any
  @Prop() presenceTitle!: any

  PersonaPresenceEnum = PersonaPresenceEnum

  get renderIcon () {
    const { coinSize } = this
    const size = sizeBoolean(this.size as PersonaSize)
    return !(size.isSize8 || size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) &&
      (coinSize ? coinSize > 32 : true)
  }

  get presenceHeightWidth () {
    const { coinSize } = this
    const presenceHeightWidth: string = coinSize
      ? coinSize / coinSizePresenceScaleFactor < presenceMaxSize
        ? coinSize / coinSizePresenceScaleFactor + 'px'
        : presenceMaxSize + 'px'
      : ''
    return presenceHeightWidth
  }

  get coinSizeWithPresenceStyle () {
    const { coinSize, presenceHeightWidth } = this
    return coinSize ? { width: presenceHeightWidth, height: presenceHeightWidth } : undefined
  }

  get coinSizeWithPresenceIconStyle () {
    const {
      coinSize,
      isOutOfOffice,
      styles, // Use getStyles from props.
      presence,
      presenceTitle,
      presenceHeightWidth,
    } = this
    const size = sizeBoolean(this.size as PersonaSize)

    const presenceFontSize: string = coinSize
      ? coinSize / coinSizeFontScaleFactor < presenceFontMaxSize
        ? coinSize / coinSizeFontScaleFactor + 'px'
        : presenceFontMaxSize + 'px'
      : ''

    return coinSize ? { fontSize: presenceFontSize, lineHeight: presenceHeightWidth } : undefined
  }

  get classNames () {
    const { styles, theme, presence, size, isOutOfOffice } = this
    return getClassNames(styles, {
      theme,
      presence,
      size,
      isOutOfOffice,
    })
  }

  get icon () {
    const { presence, isOutOfOffice } = this
    if (!presence) {
      return undefined
    }

    const oofIcon = 'SkypeArrow'

    switch (PersonaPresenceEnum[presence]) {
      case 'online':
        return 'SkypeCheck'
      case 'away':
        return isOutOfOffice ? oofIcon : 'SkypeClock'
      case 'dnd':
        return 'SkypeMinus'
      case 'offline':
        return isOutOfOffice ? oofIcon : ''
    }

    return ''
  }
}
</script>
