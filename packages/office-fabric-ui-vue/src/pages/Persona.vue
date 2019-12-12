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
      <o-label>Size 8 Persona, no presence</o-label>
      <o-persona
        :size="8"
        image-initials="AL"
        primary-text="Annie Lindqvist"
        secondary-text="Software Engineer"
        tertiary-text="In a meeting"
        optional-text="Available at 4:00pm"
        image-url="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png" />
      <div v-for="(size, index) in [8,24,32,40,48,56,72,100,120]" :key="size">
        <o-label>Size {{ size }} Persona</o-label>
        <o-persona
          :size="size"
          :status="['none','offline','online','away','dnd','blocked','busy','online','busy'][index]"
          image-initials="AL"
          primary-text="Annie Lindqvist"
          secondary-text="Software Engineer"
          tertiary-text="In a meeting"
          optional-text="Available at 4:00pm"
          image-url="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png" />
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
@Component({
  components: {
    OPersona,
    OLabel,
  },
})
export default class PersonaPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
