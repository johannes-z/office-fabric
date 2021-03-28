import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { FacepileButton } from './FacepileButton/FacepileButton'
import { Persona, PersonaSize } from '../Persona'
import { IFacepileStyleProps, IFacepileStyles, IFacepileProps } from './Facepile.types'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<IFacepileStyleProps, IFacepileStyles>()

@Component({
  components: { FacepileButton, Persona },
})
export class FacepileBase extends BaseComponent<IFacepileProps> {
  @Prop({ type: Array, default: () => [] }) readonly personas!: any[]
  @Prop({ type: Number, default: 11 }) personaSize!: PersonaSize

  get singlePersona () {
    return this.personas.length === 1
  }

  get classNames () {
    return getClassNames(this.styles, {
      theme: this.theme!,
      className: this.className,
    })
  }

  render (h: CreateElement) {
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
      h('div', { class: classNames.itemContainer }, [
        h('ul', {
          class: classNames.members,
          attrs: {
            role: 'listbox',
          },
        }, $personas),
      ]),
    ])
  }
}
