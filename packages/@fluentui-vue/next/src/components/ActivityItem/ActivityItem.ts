import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import type { IPersonaProps } from '../Persona'
import { PersonaCoin, PersonaSize } from '../Persona'
import { getClassNames } from './ActivityItem.classNames'
import { getStyles } from './ActivityItem.styles'
import type { IActivityItemStyles } from './ActivityItem.types'
import { asSlotProps, useStylingProps } from '@/utils'

export const ActivityItem = defineComponent({
  name: 'ActivityItem',

  props: {
    ...useStylingProps(),

    styles: { type: [Object, Function] as PropType<IActivityItemStyles>, default: () => ({}) },

    animateBeaconSignal: { type: Boolean, default: false },
    beaconColorOne: { type: String, default: '' },
    beaconColorTwo: { type: String, default: '' },
    isCompact: { type: Boolean, default: false },
    activityPersonas: { type: Array as PropType<(IPersonaProps & { key: any })[]>, default: () => [] },
    activityIcon: { type: Function, default: () => undefined },
  },

  setup(props, { attrs, slots }) {
    const {
      theme,
      styles,
      animateBeaconSignal,
      beaconColorOne,
      beaconColorTwo,
      isCompact,
      className,
      activityPersonas,
    } = toRefs(props)

    const classNames = computed(() => getClassNames(
      getStyles(
        undefined,
        styles.value,
        animateBeaconSignal.value,
        beaconColorOne.value,
        beaconColorTwo.value,
        isCompact.value,
      ),
      className.value!,
      activityPersonas.value,
      isCompact.value,
    ))

    const slotProps = computed(() => asSlotProps({
      root: {
        class: classNames.value.root,
      },
      personaContainer: {
        class: classNames.value.personaContainer,
      },
      pulsingBeacon: {
        class: classNames.value.pulsingBeacon,
      },
      activityTypeIcon: {
        class: classNames.value.activityTypeIcon,
      },
      activityContent: {
        class: classNames.value.activityContent,
      },
      activityText: {
        class: classNames.value.activityText,
      },
      commentText: {
        class: classNames.value.commentText,
      },
      timeStamp: {
        class: classNames.value.timeStamp,
      },
    }))

    const personaStyle = computed(() => {
      if (!isCompact.value)
        return {}
      return {
        display: 'inline-block',
        width: '10px',
        minWidth: '10px',
        overflow: 'visible',
      }
    })

    const personasToRender = computed(() => {
      const personaLimit = isCompact.value ? 3 : 4
      return activityPersonas.value.slice(0, personaLimit)
    })

    return () => h('div', {
      class: classNames.value.root,
    }, [
      (activityPersonas.value || slots.icon?.()) && h('div', slotProps.value.activityTypeIcon, [
        (animateBeaconSignal.value && isCompact) && h('div', slotProps.value.pulsingBeacon),
        (activityPersonas.value.length > 0) && h('div', slotProps.value.personaContainer, personasToRender.value.map((person: IPersonaProps & { key: any }, index: number) =>
          h(PersonaCoin, {
            ...person,
            size: (activityPersonas.value.length > 1 || isCompact.value) ? PersonaSize.size16 : PersonaSize.size32,
            key: person.key || index,
            class: classNames.value.activityPersona,
            style: personaStyle.value,
          }))),
        slots.icon?.(),
      ]),

      h('div', slotProps.value.activityContent, [
        slots.description?.() && h('span', slotProps.value.activityText, slots.description?.()),
        (!isCompact.value && slots.comments?.()) && h('div', slotProps.value.commentText, slots.comments?.()),
        (!isCompact.value && slots.timestamp?.()) && h('div', slotProps.value.timeStamp, slots.timestamp?.()),
      ]),
    ])
  },
})
