<template>
  <div role="presentation"
       :class="classNames.coin">
    <div v-if="size !== PersonaSize.size8 && size !== PersonaSize.size10 && size !== PersonaSize.tiny"
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
           <!-- {onRenderInitials(this.props, this._onRenderInitials)} -->
      </div>
      <OImage v-if="imageUrl"
              :class="classNames.image"
              :src="imageUrl"
              :image-fit="ImageFit.cover"
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
import { classNamesFunction } from '@uifabric-vue/utilities'
import { mergeStyles } from '@uifabric/merge-styles'
import { getPersonaInitialsColor } from '../PersonaInitialsColor'
import { PersonaSize } from '../Persona.types'
import { PersonaPresence } from '../PersonaPresence/'
import { sizeBoolean, sizeToPixels } from '../PersonaConsts'
import { Icon, Image } from '@/components'
import { ImageFit } from '../../Image'

const getClassNames = classNamesFunction()

@Component({
  components: { Icon, OImage: Image, PersonaPresence },
})
export default class PersonaCoin extends BaseComponent {
  @Prop() coinProps!: any
  @Prop() size!: any
  @Prop() coinSize!: any
  @Prop() showUnknownPersonaCoin!: any
  @Prop() isOutOfOffice!: any
  @Prop() presence!: any
  @Prop() presenceTitle!: any
  @Prop() imageUrl!: any

  mergeStyles = mergeStyles
  getPersonaInitialsColor = getPersonaInitialsColor
  PersonaSize = PersonaSize
  ImageFit = ImageFit

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
    return true
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
