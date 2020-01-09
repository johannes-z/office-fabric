<template>
  <div :class="classNames.root">
    <div :class="classNames.itemContainer">
      <ul :class="classNames.members" role="listbox">
        <li v-for="(persona, index) in personas"
            :key="singlePersona ? 'persona' : `personaCoin-${index}`"
            role="option">
          <FacepileButton />
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

const getClassNames = classNamesFunction()

@Component({
  components: { FacepileButton },
})
export default class Facepile extends BaseComponent {
  @Prop({ type: Array, default: () => [] }) readonly personas!: any[]

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
