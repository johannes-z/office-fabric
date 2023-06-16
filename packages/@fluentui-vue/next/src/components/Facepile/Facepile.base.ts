import { classNamesFunction } from '@fluentui-vue/utilities'
import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { defineComponent, h } from 'vue'
import type { PersonaSize } from '../Persona'
import { Persona, PersonaCoin } from '../Persona'
import type { IFacepilePersona, IFacepileStyleProps, IFacepileStyles } from './Facepile.types'
import { makeStylingProps } from '@/utils'
import type { SlotProps } from '@/utils'

const getClassNames = classNamesFunction<IFacepileStyleProps, IFacepileStyles>()

export const FacepileBase = defineComponent({
  name: 'FacepileBase',

  props: {
    ...makeStylingProps(),

    personas: { type: Array as () => IFacepilePersona[], default: () => [] },
    personaSize: { type: Number as () => PersonaSize, default: 11 },
    getPersonaProps: { type: Function, default: undefined },
  },

  computed: {
    singlePersona(): boolean {
      return this.personas.length === 1
    },
    classNames(): IProcessedStyleSet<IFacepileStyles> {
      return getClassNames(this.styles, {
        theme: this.theme!,
        className: this.className,
      })
    },
    slotProps(): SlotProps<IFacepileStyles> {
      const { classNames, personas, singlePersona, personaSize } = this

      return {
        root: {
          class: classNames.root,
        },
        itemContainer: {
          class: classNames.itemContainer,
        },
        members: {
          class: classNames.members,
          attrs: {
            role: 'listbox',
          },
        },
      }
    },
  },

  render() {
    const { classNames, slotProps, personas, singlePersona, personaSize, getPersonaProps } = this

    const personaStyles = {
      details: {
        flex: '1 0 auto',
      },
    }
    const $personas = personas.map((persona, index) => h('li', {
      class: classNames.member,
      key: singlePersona ? 'persona' : `personaCoin-${index}`,
      attrs: { role: 'option' },
    }, [
      h('div', {
        class: classNames.itemButton,
        title: persona.personaName,
      }, [
        h(PersonaCoin, {
          imageInitials: persona.imageInitials,
          imageUrl: persona.imageUrl,
          initialsColor: persona.initialsColor,
          allowPhoneInitials: persona.allowPhoneInitials,
          text: persona.personaName,
          size: personaSize,
          ...(getPersonaProps ? getPersonaProps(persona) : null),
          styles: personaStyles,
        }),
      ]),
    ]))

    return h('div', slotProps.root, [
      // TODO AriaDescription
      h('div', slotProps.itemContainer, [
        // TODO ShowAddButton
        h('ul', slotProps.members, $personas),
      ]),
    ])
  },
})
