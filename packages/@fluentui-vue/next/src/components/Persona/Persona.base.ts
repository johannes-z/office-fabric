import { computed, defineComponent, h, toRefs } from 'vue'

import { classNamesFunction } from '@fluentui-vue/utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import type { IPersonaStyleProps, IPersonaStyles } from './Persona.types'
import { PersonaPresence, PersonaSize } from './Persona.types'
import { PersonaCoin } from './PersonaCoin'
import { makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IPersonaStyleProps, IPersonaStyles>()

export const PersonaBase = defineComponent({
  name: 'PersonaBase',

  props: {
    ...makeStylingProps(),

    allowPhoneInitials: { type: Boolean, default: false },
    presence: { type: Number as () => PersonaPresence, default: PersonaPresence.none },
    size: { type: Number as () => PersonaSize, default: PersonaSize.size48 },
    coinSize: { type: Number, default: 0 },
    initialsColor: { type: [Number, String], default: undefined },
    hidePersonaDetails: { type: Boolean, default: false },
    text: { type: String, default: null },
    secondaryText: { type: String, default: null },
    tertiaryText: { type: String, default: null },
    optionalText: { type: String, default: null },
    imageUrl: { type: String, default: undefined },
    isOutOfOffice: { type: Boolean, default: false },
    showSecondaryText: { type: Boolean, default: false },
  },

  setup(props, { slots }) {
    const {
      theme,
      styles,
      className,
      showSecondaryText,
      presence,
      size,
      hidePersonaDetails,
      text,
      secondaryText,
      tertiaryText,
      optionalText,
      coinSize,
    } = toRefs(props)

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      showSecondaryText: showSecondaryText.value,
      presence: presence.value,
      size: size.value,
    }))

    return () => h('div', {
      class: classNames.value.root,
      style: coinSize.value ? { height: `${coinSize.value}px`, minWidth: `${coinSize.value}px` } : {},
    }, [
      h(PersonaCoin, props),
      (!hidePersonaDetails.value || (size.value === PersonaSize.size8 || size.value === PersonaSize.size10 || size.value === PersonaSize.tiny)) && h('div', { class: classNames.value.details }, [
        h('div', { class: classNames.value.primaryText }, text.value),
        h('div', { class: classNames.value.secondaryText }, secondaryText.value),
        h('div', { class: classNames.value.tertiaryText }, tertiaryText.value),
        h('div', { class: classNames.value.optionalText }, optionalText.value),
        slots.default?.(),
      ]),
    ])
  },

  data() {
    return {
      PersonaSize,
    }
  },

})
