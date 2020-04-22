import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import FacepileButton from './FacepileButton/FacepileButton.vue'
import { Persona, PersonaSize } from '../Persona'
import { IFacepileStyleProps, IFacepileStyles, IFacepileProps } from './Facepile.types'

const getClassNames = classNamesFunction<IFacepileStyleProps, IFacepileStyles>()

@Component({
  components: { FacepileButton, Persona },
})
export class FacepileBase extends BaseComponent<IFacepileProps> {
  @Prop({ type: Array, default: () => [] }) readonly personas!: any[]
  @Prop({ type: Number, default: PersonaSize.size32 }) personaSize!: PersonaSize

  get singlePersona () {
    return this.personas.length === 1
  }

  get classNames () {
    return getClassNames(this.styles, {
      theme: this.theme!,
      className: this.className,
    })
  }

  render () {
    const { classNames, personas, singlePersona, personaSize } = this

    return (
      <div class={classNames.root}>
        <div class={classNames.itemContainer}>
          <ul class={classNames.members} role="listbox">
            {personas.map((persona, index) => (
              <li key={singlePersona ? 'persona' : `personaCoin-${index}`}
                class={classNames.member}
                role="option">
                <div class={classNames.itemButton}
                  title={persona.personaName}>
                  <Persona
                    {...{ props: persona }}
                    image-initials={persona.imageInitials}
                    image-url={persona.imageUrl}
                    initials-color={persona.initialsColor}
                    allow-phone-initials={persona.allowPhoneInitials}
                    text={persona.personaName}
                    presence={2}
                    size={personaSize}
                    styles={{
                      details: {
                        flex: '1 0 auto',
                      },
                    }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
