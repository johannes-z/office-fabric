<template>
  <div :class="classNames.root">
    <div :class="classNames.itemContainer">
      <ul :class="classNames.members" role="listbox">
        <li v-for="(persona, index) in personas"
            :key="singlePersona ? 'persona' : `personaCoin-${index}`"
            role="option">
          <FacepileButton :class="classNames.itemButton"
                          :title="persona.personaName">
            <Persona
              v-bind="persona"
              :image-initials="persona.imageInitials"
              :image-url="persona.imageUrl"
              :initials-color="persona.initialsColor"
              :allow-phone-initials="persona.allowPhoneInitials"
              :text="persona.personaName"
              :presence="2"
              :size="personaSize"
              :styles="{
                details: {
                  flex: '1 0 auto'
                }
              }" />
          </FacepileButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import FacepileButton from './FacepileButton/FacepileButton.vue'
import { Persona, PersonaSize } from '../Persona'

const getClassNames = classNamesFunction()

@Component({
  components: { FacepileButton, Persona },
})
export default class Facepile extends BaseComponent {
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
}
</script>
