<template>
  <div :class="classNames.root">
    <div v-if="activityPersonas || $slots.icon" :class="classNames.activityTypeIcon">
      <div v-if="animateBeaconSignal && isCompact" :class="classNames.pulsingBeacon" />

      <div v-if="activityPersonas.length > 0" :class="classNames.personaContainer">
        <PersonaCoin v-for="(person, index) in personasToRender"
                     :key="person.key || index"
                     v-bind="person"
                     :class="classNames.activityPersona"
                     :size="(activityPersonas.length > 1 || isCompact) ? PersonaSize.size16 : PersonaSize.size32"
                     :style="personaStyle" />
      </div>
      <template v-else-if="$slots.icon"><slot name="icon" /></template>
    </div>

    <div :class="classNames.activityContent">
      <span v-if="$slots.activityDescription" :class="classNames.activityText">
        <slot name="activityDescription" />
      </span>
      <div v-if="!isCompact && $slots.comments" :class="classNames.commentText">
        <slot name="comments" />
      </div>
      <div v-if="!isCompact && $slots.timeStamp" :class="classNames.timeStamp">
        <slot name="timeStamp" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { getStyles } from './ActivityItem.styles'
import { IActivityItemStyles } from './ActivityItem.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IActivityItemClassNames, getClassNames } from './ActivityItem.classNames'
import { PersonaCoin } from '../Persona/PersonaCoin'
import { PersonaSize } from '../Persona/Persona.types'

@Component({
  components: { PersonaCoin },
})
export default class ActivityItem extends BaseComponent {
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

  get classNames (): any {
    const { styles, theme, className, activityPersonas, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact } = this

    return getClassNames(
      getStyles(theme, styles, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact),
      className!,
      activityPersonas!,
      isCompact!,
    )
  }
}
</script>
