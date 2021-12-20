import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { getStyles } from './ActivityItem.styles'
import { IActivityItemProps } from './ActivityItem.types'
import { getClassNames } from './ActivityItem.classNames'
import { PersonaCoin } from '../Persona/PersonaCoin'
import { PersonaSize } from '../Persona/Persona.types'
import { CreateElement } from 'vue'

@Component
export class ActivityItem extends BaseComponent<IActivityItemProps> {
  @Prop({ type: Array, default: () => [] }) activityPersonas!: any[]
  @Prop({ type: Boolean, default: false }) animateBeaconSignal!: boolean
  @Prop({ type: String, default: null }) beaconColorOne!: string
  @Prop({ type: String, default: null }) beaconColorTwo!: string
  @Prop({ type: Boolean, default: false }) isCompact!: boolean

  PersonaSize = PersonaSize

  get personaStyle () {
    if (!this.isCompact) return {}
    return {
      display: 'inline-block',
      width: '10px',
      minWidth: '10px',
      overflow: 'visible',
    }
  }

  get personasToRender () {
    const personaLimit = this.isCompact ? 3 : 4

    return this.activityPersonas
      .filter((person, index) => index < personaLimit)
  }

  get classNames () {
    const { styles, theme, className, activityPersonas, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact } = this

    return getClassNames(
      getStyles(theme, styles, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact),
      className!,
      activityPersonas!,
      isCompact!,
    )
  }

  render (h: CreateElement) {
    const { classNames, activityPersonas, animateBeaconSignal, isCompact, personasToRender, personaStyle } = this

    const $activityDescription = this.$slots.activityDescription && h('span', {
      class: classNames.activityText,
    }, this.$slots.activityDescription)

    const $commentText = (!isCompact && this.$slots.comments) && h('div', {
      class: classNames.commentText,
    }, this.$slots.comments)

    const $timeStamp = (!isCompact && this.$slots.timeStamp) && h('div', {
      class: classNames.timeStamp,
    }, this.$slots.timeStamp)

    const $activityContent = h('div', { class: classNames.activityContent }, [
      $activityDescription,
      $commentText,
      $timeStamp,
    ])

    const $activityTypeIcon = (activityPersonas || this.$slots.icon) && h('div', { class: classNames.activityTypeIcon }, [
      (animateBeaconSignal && isCompact) && h('div', {
        class: classNames.pulsingBeacon,
      }),
      (activityPersonas.length > 0) && h('div', {
        class: classNames.personaContainer,
      }, personasToRender.map((person, index) => h(PersonaCoin, {
        props: {
          ...person,
          size: (activityPersonas.length > 1 || isCompact) ? PersonaSize.size16 : PersonaSize.size32,
        },
        key: person.key || index,
        class: classNames.activityPersona,
        style: personaStyle,
      }))),
      this.$slots.icon,
    ])

    return h('div', {
      class: classNames.root,
    }, [
      $activityTypeIcon,
      $activityContent,
    ])
  }
}
