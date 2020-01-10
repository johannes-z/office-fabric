<template>
  <div :class="classNames.root">
    <PersonaCoin v-bind="$props" />

    <div v-if="!hidePersonaDetails || (size === PersonaSize.size8 || size === PersonaSize.size10 || size === PersonaSize.tiny)"
         :class="classNames.details">
      <div dir="auto" :class="classNames.primaryText">
        <div :class="classNames.tooltipHostRoot">{{ text }}</div>
      </div>
      <div dir="auto" :class="classNames.secondaryText">
        <div :class="classNames.tooltipHostRoot">{{ secondaryText }}</div>
      </div>
      <div dir="auto" :class="classNames.tertiaryText">
        <div :class="classNames.tooltipHostRoot">{{ tertiaryText }}</div>
      </div>
      <div dir="auto" :class="classNames.optionalText">
        <div :class="classNames.tooltipHostRoot">{{ optionalText }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Icon } from '../Icon/'
import BaseComponent from '../BaseComponent'
import { IPersonaProps, IPersonaStyles } from '../Persona'
import { getStyles } from './Persona.styles'
import { classNamesFunction } from '@uifabric-vue/utilities'

import { PersonaCoin } from './PersonaCoin/'
import { PersonaSize, PersonaPresence } from './Persona.types'

const getClassNames = classNamesFunction()

@Component({
  name: 'OPersona',
  components: { Icon, PersonaCoin },
})
export default class Persona extends BaseComponent {
  @Prop({ type: Boolean, default: false }) allowPhoneInitials!: boolean
  @Prop({ type: Number, default: PersonaPresence.none }) presence!: number
  @Prop({ type: Number, default: PersonaSize.size48 }) size!: number

  @Prop({ type: Number, default: 0 }) coinSize!: number
  @Prop({ type: [Number, String], default: undefined }) initialsColor!: number

  @Prop({ type: Boolean, default: false }) hidePersonaDetails?: boolean

  @Prop({ type: String, default: null }) text?: string
  @Prop({ type: String, default: null }) secondaryText?: string
  @Prop({ type: String, default: null }) tertiaryText?: string
  @Prop({ type: String, default: null }) optionalText?: string

  @Prop({ type: String, default: undefined }) imageUrl?: string
  @Prop({ type: String, default: 'online' }) status?: string // online, away, busy
  @Prop({ type: Boolean, default: false }) isOutOfOffice?: boolean
  @Prop({ type: Boolean, default: false }) showSecondaryText?: boolean

  PersonaSize = PersonaSize

  get classNames () {
    const { theme, className, showSecondaryText, presence, size } = this
    return getClassNames(getStyles, {
      theme: theme!,
      className,
      showSecondaryText,
      presence,
      size,
    })
  }
}

</script>
