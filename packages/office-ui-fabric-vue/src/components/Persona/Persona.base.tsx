import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Icon } from '../Icon/'
import BaseComponent from '../BaseComponent'
import { IPersonaProps, IPersonaStyles } from '../Persona'
import { classNamesFunction } from '@uifabric-vue/utilities'

import { PersonaCoin } from './PersonaCoin/'
import { PersonaSize, PersonaPresence, IPersonaStyleProps } from './Persona.types'

const getClassNames = classNamesFunction<IPersonaStyleProps, IPersonaStyles>()

@Component
export class PersonaBase extends BaseComponent<IPersonaProps> {
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
    return getClassNames(this.styles, {
      theme: theme!,
      className,
      showSecondaryText,
      presence,
      size,
    })
  }

  render () {
    const { classNames, coinSize, text, secondaryText, tertiaryText, optionalText, hidePersonaDetails, size } = this

    return (
      <div class={classNames.root}
        style={coinSize ? { height: `${coinSize}px`, minWidth: `${coinSize}px` } : {}}>
        <PersonaCoin {...{ props: this.$props }} />

        {(!hidePersonaDetails || (size === PersonaSize.size8 || size === PersonaSize.size10 || size === PersonaSize.tiny)) && (
          <div class={classNames.details}>
            <div dir="auto" class={classNames.primaryText}>
              <div>{text}</div>
            </div>
            <div dir="auto" class={classNames.secondaryText}>
              <div>{secondaryText}</div>
            </div>
            <div dir="auto" class={classNames.tertiaryText}>
              <div>{tertiaryText}</div>
            </div>
            <div dir="auto" class={classNames.optionalText}>
              <div>{optionalText}</div>
            </div>

            {this.$slots.default}
          </div>
        )
        }
      </div>
    )
  }
}
