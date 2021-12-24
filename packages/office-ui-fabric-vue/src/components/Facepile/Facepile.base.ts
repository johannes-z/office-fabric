import { classNamesFunction } from '@uifabric-vue/utilities'
import { FacepileButton } from './FacepileButton/FacepileButton'
import { Persona, PersonaSize } from '../Persona'
import { IFacepileStyleProps, IFacepileStyles, IFacepileProps } from './Facepile.types'
import Vue, { VNode } from 'vue'
import { withThemeableProps } from '@/useThemeable'
import { MappedType } from '@/types'
import { IFacepilePersona } from '..'
import { IProcessedStyleSet } from '@fluentui/style-utilities'

const getClassNames = classNamesFunction<IFacepileStyleProps, IFacepileStyles>()

export const FacepileBase = Vue.extend({
  name: 'FacepileBase',

  props: {
    ...withThemeableProps(),
    personas: { type: Array as () => IFacepilePersona[], default: () => [] },
    personaSize: { type: Number as () => PersonaSize, default: 11 },
  } as MappedType<IFacepileProps>,

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
  },

  render (h): VNode {
    const { classNames, personas, singlePersona, personaSize } = this

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
        h(Persona, {
          props: {
            ...persona,
            text: persona.personaName,
            presence: 2,
            size: personaSize,
            styles: {
              details: {
                flex: '1 0 auto',
              },
            },
          },
        }),
      ]),
    ]))

    return h('div', { class: classNames.root }, [
      // TODO AriaDescription
      h('div', { class: classNames.itemContainer }, [
        // TODO ShowAddButton
        h('ul', {
          class: classNames.members,
          attrs: {
            role: 'listbox',
          },
        }, $personas),
      ]),
    ])
  },
})
