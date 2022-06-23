import { SlotProps, useStylingProps } from '@/utils'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { VNode } from 'vue'
import { Persona, PersonaCoin, PersonaSize } from '../Persona'
import { IFacepilePersona, IFacepileStyleProps, IFacepileStyles } from './Facepile.types'

const getClassNames = classNamesFunction<IFacepileStyleProps, IFacepileStyles>()

export const FacepileBase = Vue.extend({
  name: 'FacepileBase',

  props: {
    ...useStylingProps(),

    personas: { type: Array as () => IFacepilePersona[], default: () => [] },
    personaSize: { type: Number as () => PersonaSize, default: 11 },
    getPersonaProps: { type: Function, default: undefined },
  },

  computed: {
    singlePersona (): boolean {
      return this.personas.length === 1
    },
    classNames (): IProcessedStyleSet<IFacepileStyles> {
      return getClassNames(this.styles, {
        theme: this.theme!,
        className: this.className,
      })
    },
    slotProps (): SlotProps<IFacepileStyles> {
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

  render (h): VNode {
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
        attrs: {
          title: persona.personaName,
        },
      }, [
        h(PersonaCoin, {
          props: {
            imageInitials: persona.imageInitials,
            imageUrl: persona.imageUrl,
            initialsColor: persona.initialsColor,
            allowPhoneInitials: persona.allowPhoneInitials,
            text: persona.personaName,
            size: personaSize,
            ...(getPersonaProps ? getPersonaProps(persona) : null),
            styles: personaStyles,
          },
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
