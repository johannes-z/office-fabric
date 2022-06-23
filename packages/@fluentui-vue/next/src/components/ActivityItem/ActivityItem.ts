import { SlotProps, useStylingProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { IPersonaCoinProps, IPersonaProps, IPersonaSharedProps, PersonaCoin, PersonaSize } from '../Persona'
import { IActivityItemClassNames, getClassNames } from './ActivityItem.classNames'
import { getStyles } from './ActivityItem.styles'
import { IActivityItemProps, IActivityItemStyles } from './ActivityItem.types'

export const ActivityItem = Vue.extend({
  name: 'ActivityItem',

  props: {
    ...useStylingProps(),

    animateBeaconSignal: { type: Boolean, default: false },
    beaconColorOne: { type: String, default: '' },
    beaconColorTwo: { type: String, default: '' },
    isCompact: { type: Boolean, default: false },
    activityPersonas: { type: Array as () => IPersonaProps[], default: () => [] },
    activityIcon: { type: Function, default: () => undefined },
  },

  computed: {
    classNames (): IActivityItemClassNames {
      return getClassNames(
        getStyles(
          undefined,
          this.styles,
          this.animateBeaconSignal,
          this.beaconColorOne,
          this.beaconColorTwo,
          this.isCompact,
        ),
        this.className!,
        this.activityPersonas!,
        this.isCompact!,
      )
    },
    slotProps (): SlotProps<IActivityItemStyles> {
      const { classNames } = this
      return {
        root: {
          class: classNames.root,
        },
        personaContainer: {
          class: classNames.personaContainer,
        },
        pulsingBeacon: {
          class: classNames.pulsingBeacon,
        },
        activityTypeIcon: {
          class: classNames.activityTypeIcon,
        },
        activityContent: {
          class: classNames.activityContent,
        },
        activityText: {
          class: classNames.activityText,
        },
        commentText: {
          class: classNames.commentText,
        },
        timeStamp: {
          class: classNames.timeStamp,
        },
      }
    },
    personaStyle (): any {
      if (!this.isCompact) return {}
      return {
        display: 'inline-block',
        width: '10px',
        minWidth: '10px',
        overflow: 'visible',
      }
    },
    personasToRender (): IPersonaProps[] {
      const personaLimit = this.isCompact ? 3 : 4

      return this.activityPersonas.slice(0, personaLimit)
    },
  },

  methods: {},

  render (h: CreateElement): VNode {
    const { classNames, slotProps, activityPersonas, animateBeaconSignal, isCompact, personasToRender, personaStyle } = this

    return h('div', {
      class: classNames.root,
    }, [
      (activityPersonas || this.$slots.icon) && h('div', slotProps.activityTypeIcon, [
        (animateBeaconSignal && isCompact) && h('div', slotProps.pulsingBeacon),
        (activityPersonas.length > 0) && h('div', slotProps.personaContainer, personasToRender.map((person, index) => h(PersonaCoin, {
          props: {
            ...person,
            size: (activityPersonas.length > 1 || isCompact) ? PersonaSize.size16 : PersonaSize.size32,
          },
          key: person.key || index,
          class: classNames.activityPersona,
          style: personaStyle,
        }))),
        this.$slots.icon,
      ]),

      h('div', slotProps.activityContent, [
        this.$slots.description && h('span', slotProps.activityText, this.$slots.description),
        (!isCompact && this.$slots.comments) && h('div', slotProps.commentText, this.$slots.comments),
        (!isCompact && this.$slots.timestamp) && h('div', slotProps.timeStamp, this.$slots.timestamp),
      ]),
    ])
  },
})
