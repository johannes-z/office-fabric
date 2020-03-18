<template>
  <div role="presentation"
       :class="classNames.coin">
    <div v-if="size !== PersonaSize.size8"
         role="presentation"
         :class="classNames.imageArea"
         :style="coinSizeStyle">
      <div v-if="shouldRenderInitials"
           :class="mergeStyles(
             classNames.initials,
             !showUnknownPersonaCoin && { backgroundColor: getPersonaInitialsColor($props) }
           )"
           :style="coinSizeStyle"
           aria-hidden="true">
        <span v-if="initials">{{ initials }}</span>
        <Icon v-else icon-name="Contact" />
      </div>
      <OImage v-if="imageUrl"
              :class="classNames.image"
              :image-fit="ImageFit.cover"
              :src="imageUrl"
              :width="dimension"
              :height="dimension" />
      <PersonaPresence v-bind="personaPresenceProps" />
    </div>

    <template v-else>
      <PersonaPresence v-if="presence" v-bind="personaPresenceProps" />
      <Icon v-else
            icon-name="Contact"
            :class="classNames.size10WithoutPresenceIcon" />
    </template>

    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { classNamesFunction, getInitials, getRTL } from '@uifabric-vue/utilities'
import { mergeStyles } from '@uifabric/merge-styles'
import { getPersonaInitialsColor } from '../PersonaInitialsColor'
import {
  PersonaSize,
  PersonaPresence as PersonaPresenceEnum,
} from '../Persona.types'
import { PersonaPresence } from '../PersonaPresence/'
import { sizeBoolean, sizeToPixels } from '../PersonaConsts'
import { ImageFit, Image } from '../../Image'
import { Icon } from '../../Icon'

const getClassNames = classNamesFunction()

@Component({
  inheritAttrs: false,
  components: { Icon, OImage: Image, PersonaPresence },
})
export default class PersonaCoin extends BaseComponent {
  @Prop({ type: Boolean, default: false }) allowPhoneInitials!: boolean
  @Prop({ type: Number, default: PersonaPresenceEnum.none }) presence!: number
  @Prop({ type: Number, default: null }) size!: number
  @Prop({ type: Number, default: null }) coinSize!: number

  @Prop() coinProps!: any
  @Prop() showUnknownPersonaCoin!: any
  @Prop() isOutOfOffice!: any
  @Prop() presenceTitle!: any
  @Prop() imageUrl!: any
  @Prop() imageInitials!: any
  @Prop() text!: any
  @Prop() initialsColor!: any

  mergeStyles = mergeStyles
  getPersonaInitialsColor = getPersonaInitialsColor
  PersonaSize = PersonaSize
  ImageFit = ImageFit

  get initials () {
    const { imageInitials, allowPhoneInitials, showUnknownPersonaCoin } = this
    const isRTL = getRTL(this.theme)

    return imageInitials || getInitials(this.text, isRTL, allowPhoneInitials)
  }

  get dimension () {
    const { coinSize, size } = this
    return coinSize || sizeToPixels[size]
  }

  get personaPresenceProps () {
    const { coinSize, theme, isOutOfOffice, presence, presenceTitle, size } = this
    return {
      coinSize,
      isOutOfOffice,
      presence,
      presenceTitle,
      size,
      theme,
    }
  }

  get shouldRenderInitials () {
    return !this.imageUrl
  }

  get coinSizeStyle () {
    const { coinSize } = this
    return coinSize ? { width: coinSize, height: coinSize } : undefined
  }

  get classNames () {
    const { styles, theme, className, coinProps, size, coinSize, showUnknownPersonaCoin } = this
    return getClassNames(styles, {
      theme: theme!,
      className: coinProps && coinProps.className ? coinProps.className : className,
      size,
      coinSize,
      showUnknownPersonaCoin,
    })
  }
}
</script>
