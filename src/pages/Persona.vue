<template>
  <div>
    <h1>Rating</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Base Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Persona in various sizes</h2>
      <o-toggle v-model="showDetails" label="Show details" />
      <o-toggle v-model="showImages" label="Show images" />
      <o-toggle v-model="showPresence" label="Show presence" />
      <div v-for="(size, index) in [8,24,32,40,48,56,72,100,120]" :key="size">
        <o-label>Size {{ size }} Persona</o-label>
        <o-persona
          :size="size"
          :status="showPresence ? ['away','online','online','away','busy','online','dnd','blocked','away'][index] : undefined"
          :hide-persona-details="!showDetails"
          image-initials="AL"
          primary-text="Annie Lindqvist"
          secondary-text="Software Engineer"
          tertiary-text="In a meeting"
          optional-text="Available at 4:00pm"
          :image-url="showImages ? 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png' : undefined" />
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import OPersona from '@/components/Persona/Persona.vue'
import OLabel from '@/components/Label/Label.vue'
import OToggle from '@/components/Toggle/Toggle.vue'

@Component({
  components: {
    OPersona,
    OLabel,
    OToggle,
  },
})
export default class PersonaPage extends Vue {
  private showDetails:boolean = true;
  private showImages:boolean = true;
  private showPresence:boolean = true;
}
</script>

<style lang="scss" module>
</style>
